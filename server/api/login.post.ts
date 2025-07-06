export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    const db = useDatabase('golbargDB');
    
    // Validate required fields
    if (!requestBody.identifier || !requestBody.password) {
        setResponseStatus(event, 400);
        return {
            status: 'error',
            message: 'شماره موبایل/ایمیل و رمز عبور الزامی است',
        };
    }

    // Check if user exists with email or phone
    const existingUser = await db.sql`
        SELECT id, email, phone, password, token 
        FROM users 
        WHERE (phone = ${requestBody.identifier} OR email = ${requestBody.identifier})
    `;
    
    if (!existingUser.rows || existingUser.rows.length === 0) {
        setResponseStatus(event, 401); // Unauthorized
        return {
            status: 'error',
            message: 'کاربری با این مشخصات یافت نشد',
        };
    }

    const user = existingUser.rows[0];

    // Check if password matches
    if (user.password !== requestBody.password) {
        setResponseStatus(event, 401); // Unauthorized
        return {
            status: 'error',
            message: 'رمز عبور نادرست است',
        };
    }

    // Return successful login with token
    setResponseStatus(event, 200); // OK
    return {
        status: 'success',
        message: 'ورود با موفقیت انجام شد',
        data: {
            token: user.token,
            user: {
                id: user.id,
                email: user.email,
                phone: user.phone
            }
        }
    };
});