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

        console.log(`[IMAGE] Serving image: ${filename}`)

        // Try to get from assets:public:images first
        try {
            const imageData = await useStorage('assets:public:images').getItemRaw(filename)
            if (imageData) {
                console.log(`[IMAGE] ✅ Found in assets:public:images`)
                
                // Set appropriate headers
                setHeader(event, 'content-type', getContentType(filename))
                setHeader(event, 'cache-control', 'public, max-age=31536000')
                
                return imageData
            }
        } catch (assetsError) {
            console.log(`[IMAGE] Not found in assets:public:images, trying data storage`)
        }

        // Fallback to data storage
        try {
            const imageRecord = await useStorage('data').getItem(`images/${filename}`)
            if (imageRecord && imageRecord.data) {
                console.log(`[IMAGE] ✅ Found in data storage`)
                
                // Convert array back to Uint8Array
                const imageData = new Uint8Array(imageRecord.data)
                
                // Set appropriate headers
                setHeader(event, 'content-type', imageRecord.type || getContentType(filename))
                setHeader(event, 'cache-control', 'public, max-age=31536000')
                
                return imageData
            }
        } catch (dataError) {
            console.log(`[IMAGE] Not found in data storage`)
        }

        // Image not found in any storage
        throw createError({
            statusCode: 404,
            statusMessage: 'Image not found'
        })

    } catch (error) {
        console.error('[IMAGE] Error serving image:', error)
        
        if (typeof error === 'object' && error !== null && 'statusCode' in error) {
            throw error
        }
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error'
        })
    }
})

// Helper function to get content type based on file extension
function getContentType(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase()
    
    switch (ext) {
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg'
        case 'png':
            return 'image/png'
        case 'gif':
            return 'image/gif'
        case 'webp':
            return 'image/webp'
        case 'svg':
            return 'image/svg+xml'
        default:
            return 'image/jpeg'
    }
}