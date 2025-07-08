export default defineEventHandler(async (event) => {
  const filename = getRouterParam(event, 'filename')
  if (!filename) throw createError({ statusCode: 400, message: 'Filename missing' })

  try {
    const fileData = await useStorage().getItem(`uploads:${filename}`)
    if (!fileData) throw createError({ statusCode: 404, message: 'File not found' })

    // Set appropriate headers
    setHeader(event, 'Content-Type', 'application/octet-stream')
    setHeader(event, 'Content-Disposition', `inline; filename="${filename}"`)
    
    return fileData
  } catch (error) {
    console.error('File serve error:', error)
    throw createError({
      statusCode: 500,
      message: 'Error retrieving file'
    })
  }
})