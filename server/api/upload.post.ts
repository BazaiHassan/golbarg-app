export default defineEventHandler(async (event) => {
  try {
    // Verify request method
    if (event.method !== 'POST') {
      throw createError({
        statusCode: 405,
        statusMessage: 'Method Not Allowed'
      })
    }

    // Read multipart form data
    const files = await readMultipartFormData(event)
    if (!files?.length) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No files uploaded'
      })
    }

    const uploadedFiles = []

    for (const file of files) {
      if (!file.filename) continue

      // Generate unique filename
      const ext = file.filename.split('.').pop() || 'bin'
      const baseName = file.filename.replace(/\.[^/.]+$/, '')
      const uniqueFilename = `${baseName}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`

      // Store using Nitro storage
      await useStorage().setItem(`uploads/${uniqueFilename}`, file.data)

      uploadedFiles.push({
        originalName: file.filename,
        filename: uniqueFilename,
        size: file.data.length,
        type: file.type,
        url: `/api/uploads/${uniqueFilename}` // This will be served by our separate endpoint
      })
    }

    return {
      success: true,
      files: uploadedFiles
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message: error.message || 'Failed to process upload'
    })
  }
})