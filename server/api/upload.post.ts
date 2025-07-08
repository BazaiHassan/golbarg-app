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

            // Convert buffer to base64 for storage (temporary solution)
            const base64Data = Buffer.from(file.data).toString('base64')
            
            // Store file info in runtime storage (this is temporary and will be lost on restart)
            await useStorage('data').setItem(`images/${uniqueFilename}`, {
                data: base64Data,
                filename: uniqueFilename,
                type: file.type || 'image/jpeg',
                size: file.data.length
            })
            
            uploadedFiles.push(uniqueFilename)
        }

        return {
            success: true,
            message: "Files uploaded successfully",
            files: uploadedFiles,
            note: "Files are stored temporarily and will be lost on server restart"
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