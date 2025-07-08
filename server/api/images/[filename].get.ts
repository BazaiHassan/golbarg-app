// server/api/images/[filename].get.ts
export default defineEventHandler(async (event) => {
    try {
        const filename = getRouterParam(event, 'filename')
        
        if (!filename) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Filename is required'
            })
        }

        console.log(`[IMAGE_SERVE] Requested filename: ${filename}`)

        // Try different storage locations in order of preference
        const storageOptions = [
            {
                name: 'assets:public:images',
                storage: 'assets:public:images',
                key: filename
            },
            {
                name: 'assets:public',
                storage: 'assets:public',
                key: `images/${filename}`
            },
            {
                name: 'data',
                storage: 'data',
                key: `images/${filename}`
            }
        ]

        for (const option of storageOptions) {
            try {
                console.log(`[IMAGE_SERVE] Trying storage: ${option.name} with key: ${option.key}`)
                
                if (option.storage === 'data') {
                    // For data storage, we stored it as an object
                    const fileData = await useStorage(option.storage).getItem(option.key)
                    
                    if (
                        fileData &&
                        typeof fileData === 'object' &&
                        'data' in fileData &&
                        Array.isArray((fileData as any).data)
                    ) {
                        const typedFileData = fileData as { data: number[]; type?: string; size: number }
                        console.log(`[IMAGE_SERVE] ✅ Found in ${option.name}`)
                        console.log(`[IMAGE_SERVE] File type: ${typedFileData.type}`)
                        console.log(`[IMAGE_SERVE] File size: ${typedFileData.size}`)
                        
                        // Convert array back to Uint8Array
                        const imageBuffer = new Uint8Array(typedFileData.data)
                        
                        // Set appropriate headers
                        setHeader(event, 'Content-Type', typedFileData.type || 'image/jpeg')
                        setHeader(event, 'Content-Length', typedFileData.size)
                        setHeader(event, 'Cache-Control', 'public, max-age=31536000') // 1 year
                        
                        return imageBuffer
                    }
                } else {
                    // For other storage types, try to get raw data
                    const imageData = await useStorage(option.storage).getItemRaw(option.key)
                    
                    if (imageData) {
                        console.log(`[IMAGE_SERVE] ✅ Found in ${option.name}`)
                        console.log(`[IMAGE_SERVE] Data type: ${typeof imageData}`)
                        console.log(`[IMAGE_SERVE] Data size: ${imageData.length || 'unknown'}`)
                        
                        // Determine content type from filename
                        const ext = filename.split('.').pop()?.toLowerCase()
                        const contentType = getContentType(ext)
                        
                        setHeader(event, 'Content-Type', contentType)
                        setHeader(event, 'Cache-Control', 'public, max-age=31536000') // 1 year
                        
                        if (imageData.length) {
                            setHeader(event, 'Content-Length', imageData.length)
                        }
                        
                        return imageData
                    }
                }
                
                console.log(`[IMAGE_SERVE] ❌ Not found in ${option.name}`)
                
            } catch (storageError) {
                if (storageError && typeof storageError === 'object' && 'message' in storageError) {
                    console.log(`[IMAGE_SERVE] ❌ Error accessing ${option.name}:`, (storageError as any).message)
                } else {
                    console.log(`[IMAGE_SERVE] ❌ Error accessing ${option.name}:`, storageError)
                }
                continue
            }
        }

        // If not found in any storage, try filesystem as last resort
        try {
            console.log(`[IMAGE_SERVE] Trying filesystem storage`)
            const fs = await import('fs').catch(() => null)
            const path = await import('path').catch(() => null)
            
            if (fs && path) {
                const filePath = path.join(process.cwd(), 'public', 'uploads', filename)
                
                if (fs.existsSync(filePath)) {
                    console.log(`[IMAGE_SERVE] ✅ Found in filesystem: ${filePath}`)
                    
                    const imageData = fs.readFileSync(filePath)
                    const ext = filename.split('.').pop()?.toLowerCase()
                    const contentType = getContentType(ext)
                    
                    setHeader(event, 'Content-Type', contentType)
                    setHeader(event, 'Content-Length', imageData.length)
                    setHeader(event, 'Cache-Control', 'public, max-age=31536000') // 1 year
                    
                    return imageData
                }
            }
        } catch (fsError) {
            if (fsError && typeof fsError === 'object' && 'message' in fsError) {
                console.log(`[IMAGE_SERVE] ❌ Filesystem error:`, (fsError as any).message)
            } else {
                console.log(`[IMAGE_SERVE] ❌ Filesystem error:`, fsError)
            }
        }

        console.log(`[IMAGE_SERVE] ❌ File not found in any storage location: ${filename}`)
        
        throw createError({
            statusCode: 404,
            statusMessage: 'Image not found'
        })

    } catch (error) {
        console.error('[IMAGE_SERVE] Error serving image:', error)
        
        if (error && typeof error === 'object' && 'statusCode' in error) {
            throw error
        }
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})

function getContentType(extension: string | undefined): string {
    const mimeTypes: Record<string, string> = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'png': 'image/png',
        'gif': 'image/gif',
        'webp': 'image/webp',
        'svg': 'image/svg+xml',
        'bmp': 'image/bmp',
        'tiff': 'image/tiff',
        'ico': 'image/x-icon'
    }
    
    return mimeTypes[extension || ''] || 'image/jpeg'
}