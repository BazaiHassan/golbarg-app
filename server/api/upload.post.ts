export default defineEventHandler(async (event) => {
  // 1. Verify request method
  if (event.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  // 2. Read multipart form data
  const files = await readMultipartFormData(event)
  if (!files?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No files uploaded'
    })
  }

  // 3. Process each file
  const uploadedFiles = []
  for (const file of files) {
    if (!file.filename) continue

    // Generate unique filename
    const ext = file.filename.split('.').pop() || 'bin'
    const baseName = file.filename.replace(/\.[^/.]+$/, '')
    const uniqueFilename = `${baseName}_${Date.now()}.${ext}`

    // Store file using Nitro storage
    await useStorage().setItem(`uploads/${uniqueFilename}`, file.data)

    uploadedFiles.push({
      originalName: file.filename,
      filename: uniqueFilename,
      size: file.data.length,
      type: file.type,
      url: `/api/uploads/${uniqueFilename}`  // Will be served by our endpoint
    })
  }

  return { success: true, files: uploadedFiles }
})