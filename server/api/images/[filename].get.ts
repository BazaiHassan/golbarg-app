// server/api/images/[filename].get.ts
export default defineEventHandler(async (event) => {
    const filename = getRouterParam(event, 'filename')
    if (!filename) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Filename is required'
        })
    }

    try {
        const file = await useStorage('data').getItem(`images/${filename}`)
        if (!file) {
            throw createError({
                statusCode: 404,
                statusMessage: 'File not found'
            })
        }

        // If file is a Buffer or string, set default headers
        if (typeof file === 'string' || file instanceof Buffer) {
            setHeader(event, 'Content-Type', 'image/jpeg')
            setHeader(event, 'Content-Length', Buffer.byteLength(file))
            return file
        }

        // If file is an object with type, size, and data
        setHeader(event, 'Content-Type', (file as any).type || 'image/jpeg')
        setHeader(event, 'Content-Length', (file as any).size || Buffer.byteLength((file as any).data))
        return (file as any).data
    } catch (error) {
        console.error('[IMAGE] Error retrieving image:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to retrieve image'
        })
    }
})