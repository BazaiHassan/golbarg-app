import path from "path"
import fs from "fs"
import { createError } from 'h3'

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

        // Create images directory if it doesn't exist
        const imagesDir = path.join(process.cwd(), 'public/images')
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true })
        }

        const uploadedFiles: string[] = []

        for (const file of files) {
            if (!file.filename) {
                continue
            }

            // Generate unique filename to prevent conflicts
            const fileExtension = path.extname(file.filename)
            const baseName = path.basename(file.filename, fileExtension)
            const timestamp = Date.now()
            const uniqueFilename = `${baseName}_${timestamp}${fileExtension}`

            const filePath = path.join(imagesDir, uniqueFilename)
            
            // Write file to disk
            fs.writeFileSync(filePath, file.data)
            uploadedFiles.push(uniqueFilename)
        }

        return {
            success: true,
            message: "Files uploaded successfully",
            files: uploadedFiles
        }
    } catch (error) {
        console.error('Upload error:', error)
        
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
            message: error instanceof Error ? error.message : 'Unknown error occurred'
        })
    }
})