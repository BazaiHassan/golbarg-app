export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Filename missing'
    })
  }

  try {
    const fileData = await useStorage().getItem(`uploads/${filename}`)
    if (!fileData) {
      throw createError({
        statusCode: 404,
        statusMessage: 'File not found'
      })
    }

    // Set appropriate headers
    setHeader(event, 'Content-Type', 'application/octet-stream')
    setHeader(event, 'Content-Disposition', `inline; filename="${filename}"`)
    
    return fileData
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error',
      message: error.message || 'Failed to retrieve file'
    })
  }
})