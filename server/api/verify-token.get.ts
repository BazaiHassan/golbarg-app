export default defineEventHandler(async (event) => {
  // Extract Authorization header
  const authHeader = getHeader(event, 'Authorization')

  // Validate Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    setResponseStatus(event, 401)
    return {
      status: 'error',
      message: 'توکن معتبر نیست'
    }
  }

  // Extract token from header
  const token = authHeader.replace('Bearer ', '')
  const db = useDatabase('golbargDB')

  try {
    // Query users table to find user with matching token
    const result = await db.sql`
      SELECT token 
      FROM admin 
      WHERE token = ${token}
    `

    // Check if user exists
    if (!result.rows || result.rows.length === 0) {
      setResponseStatus(event, 401)
      return {
        status: 'error',
        message: 'توکن معتبر نیست'
      }
    }

    // Return success response
    setResponseStatus(event, 200)
    return {
      status: 'success',
      message: 'توکن معتبر است',
    }
  } catch (error) {
    setResponseStatus(event, 500)
    return {
      status: 'error',
      message: 'خطایی در سرور رخ داد'
    }
  }
})