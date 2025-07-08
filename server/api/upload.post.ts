export default defineEventHandler(async (event) => {
  try {
    // Check if request method is POST
    if (event.method !== 'POST') {
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

    const uploadedFiles = []

    for (const file of files) {
      if (!file.filename) continue

      // Generate unique filename
      const ext = file.filename.split('.').pop()
      const baseName = file.filename.replace(/\.[^/.]+$/, '')
      const uniqueFilename = `${baseName}_${Date.now()}.${ext}`

      // Store the file using Nitro storage
      await useStorage().setItem(`uploads:${uniqueFilename}`, file.data)

      uploadedFiles.push({
        originalFilename: file.filename,
        filename: uniqueFilename,
        size: file.data.length,
        type: file.type,
        url: `/api/uploads/${uniqueFilename}`
      })
    }

    return {
      success: true,
      files: uploadedFiles
    }

  } catch (error) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      message: error instanceof Error ? error.message : 'Upload failed'
    })
  }
})