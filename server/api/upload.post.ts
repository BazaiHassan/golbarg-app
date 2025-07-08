// server/api/upload.post.ts
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

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

        // Create public/images directory if it doesn't exist
        const publicImagesPath = join(process.cwd(), 'public', 'images')
        if (!existsSync(publicImagesPath)) {
            await mkdir(publicImagesPath, { recursive: true })
            console.log(`[UPLOAD] Created directory: ${publicImagesPath}`)
        }

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

            try {
                // Save file to public/images directory
                const filePath = join(publicImagesPath, uniqueFilename)
                await writeFile(filePath, file.data)
                
                const storageMethod = 'public-directory'
                const storagePath = `public/images/${uniqueFilename}`
                const fileUrl = `/images/${uniqueFilename}` // Direct public URL
                
                console.log(`[UPLOAD] ✅ Successfully saved to public directory`)
                console.log(`[UPLOAD] File path: ${filePath}`)
                console.log(`[UPLOAD] Storage path: ${storagePath}`)
                console.log(`[UPLOAD] File URL: ${fileUrl}`)
                
                uploadedFiles.push({
                    filename: uniqueFilename,
                    storageMethod,
                    storagePath,
                    url: fileUrl
                })
                
            } catch (saveError) {
                console.error(`[UPLOAD] ❌ Failed to save file to public directory:`, saveError)
                
                // Fallback to data storage if public directory fails
                try {
                    console.log(`[UPLOAD] Fallback: Saving to data storage`)
                    await useStorage('data').setItem(`images/${uniqueFilename}`, {
                        data: Array.from(file.data),
                        filename: uniqueFilename,
                        type: file.type || 'image/jpeg',
                        size: file.data.length,
                        timestamp: Date.now()
                    })
                    
                    const storageMethod = 'data'
                    const storagePath = `data/images/${uniqueFilename}`
                    const fileUrl = `/api/images/${uniqueFilename}`
                    
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