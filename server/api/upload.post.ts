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

        const uploadedFiles: string[] = []

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

            try {
                // Use Nitro's storage layer instead of fs
                await useStorage('assets:public:images').setItemRaw(uniqueFilename, file.data)
                uploadedFiles.push(uniqueFilename)
            } catch (storageError) {
                console.error('Storage error:', storageError)
                
                // Fallback: try to save to public directory using hubBlob if available
                try {
                    // For deployment environments that support blob storage
                    const blob = new Blob([file.data], { type: file.type || 'image/jpeg' })
                    
                    // Store in runtime storage as fallback
                    await useStorage('data').setItem(`images/${uniqueFilename}`, {
                        data: Array.from(file.data),
                        filename: uniqueFilename,
                        type: file.type || 'image/jpeg',
                        size: file.data.length
                    })
                    
                    uploadedFiles.push(uniqueFilename)
                } catch (fallbackError) {
                    console.error('Fallback storage error:', fallbackError)
                    throw createError({
                        statusCode: 500,
                        statusMessage: 'Failed to save file'
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

        return {
            success: true,
            message: "Files uploaded successfully",
            files: uploadedFiles
        }
    } catch (error) {
        console.error('Upload error:', error)
        
        if (error.statusCode) {
            throw error
        }
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        })
    }
})