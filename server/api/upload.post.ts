// server/api/upload.post.ts
export default defineEventHandler(async (event) => {
    try {
        // Check if request method is POST
        if (getMethod(event) !== 'POST') {
            throw createError({
                statusCode: 405,
                statusMessage: 'Method Not Allowed'
            })
        }

        // Read multipart form data
        const files = await readMultipartFormData(event)

        if (!files || files.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No files uploaded'
            })
        }

        const uploadedFiles: Array<{
            filename: string,
            storageMethod: string,
            storagePath: string,
            url: string
        }> = []

        for (const file of files) {
            if (!file.filename) {
                continue
            }

            // Generate unique filename to prevent conflicts
            const fileExtension = file.filename.split('.').pop() || ''
            const baseName = file.filename.replace(/\.[^/.]+$/, '')
            const timestamp = Date.now()
            const randomId = Math.random().toString(36).substring(2, 8)
            const uniqueFilename = `${baseName}_${timestamp}_${randomId}.${fileExtension}`

            console.log(`[UPLOAD] Processing file: ${file.filename}`)
            console.log(`[UPLOAD] Generated filename: ${uniqueFilename}`)
            console.log(`[UPLOAD] File size: ${file.data.length} bytes`)
            console.log(`[UPLOAD] File type: ${file.type || 'unknown'}`)

            let storageMethod = ''
            let storagePath = ''
            let fileUrl = ''

            try {
                // Use assets:public:images since it's working reliably
                console.log(`[UPLOAD] Saving to assets:public:images`)
                await useStorage('assets:public:images').setItemRaw(uniqueFilename, file.data)
                
                storageMethod = 'assets:public:images'
                storagePath = `assets/public:images/${uniqueFilename}`
                fileUrl = `/api/images/${uniqueFilename}`
                
                console.log(`[UPLOAD] ✅ Successfully saved to assets:public:images`)
                console.log(`[UPLOAD] Storage path: ${storagePath}`)
                console.log(`[UPLOAD] File URL: ${fileUrl}`)
                
                uploadedFiles.push({
                    filename: uniqueFilename,
                    storageMethod,
                    storagePath,
                    url: fileUrl
                })
                
            } catch (storageError) {
                console.error(`[UPLOAD] ❌ assets:public:images failed:`, storageError)
                
                // Fallback to data storage
                try {
                    console.log(`[UPLOAD] Fallback: Saving to data storage`)
                    await useStorage('data').setItem(`images/${uniqueFilename}`, {
                        data: Array.from(file.data),
                        filename: uniqueFilename,
                        type: file.type || 'image/jpeg',
                        size: file.data.length,
                        timestamp: Date.now()
                    })
                    
                    storageMethod = 'data'
                    storagePath = `data/images/${uniqueFilename}`
                    fileUrl = `/api/images/${uniqueFilename}`
                    
                    console.log(`[UPLOAD] ✅ Successfully saved to data storage`)
                    console.log(`[UPLOAD] Storage path: ${storagePath}`)
                    console.log(`[UPLOAD] File URL: ${fileUrl}`)
                    
                    uploadedFiles.push({
                        filename: uniqueFilename,
                        storageMethod,
                        storagePath,
                        url: fileUrl
                    })
                    
                } catch (dataError) {
                    console.error(`[UPLOAD] ❌ data storage failed:`, dataError)
                    console.error(`[UPLOAD] All storage methods failed for file: ${uniqueFilename}`)
                    
                    throw createError({
                        statusCode: 500,
                        statusMessage: 'Failed to save file - all storage methods failed'
                    })
                }
            }
        }

        if (uploadedFiles.length === 0) {
            throw createError({
                statusCode: 500,
                statusMessage: 'No files were saved successfully'
            })
        }

        // Log final results
        console.log(`[UPLOAD] Final results:`)
        uploadedFiles.forEach((file, index) => {
            console.log(`[UPLOAD] File ${index + 1}:`)
            console.log(`  - Filename: ${file.filename}`)
            console.log(`  - Storage method: ${file.storageMethod}`)
            console.log(`  - Storage path: ${file.storagePath}`)
            console.log(`  - URL: ${file.url}`)
        })

        return {
            success: true,
            message: "Files uploaded successfully",
            files: uploadedFiles
        }
    } catch (error) {
        console.error('[UPLOAD] Upload error:', error)
        
        if (typeof error === 'object' && error !== null && 'statusCode' in error) {
            throw error
        }
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        })
    }
})