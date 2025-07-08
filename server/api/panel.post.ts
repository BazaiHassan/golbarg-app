// /api/panel.post.ts
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const db = useDatabase('golbargDB');

    if (!body.username || !body.password) {
        setResponseStatus(event, 400)
        return {
            status: 'error',
            message: 'تمام فیلدهای ضروری را پر کنید',
        };
    }

    const existingUser = await db.sql`SELECT * FROM admin WHERE username = ${body.username}`;

    if (!existingUser.rows || existingUser.rows.length === 0) {
        setResponseStatus(event, 404);
        return {
            status: 'error',
            message: 'کاربر یافت نشد',
        };
    }

    const adminUser = existingUser.rows[0];

    // Check if password matches
    if (adminUser.password !== body.password) {
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
            token: adminUser.token,
        }
    };

})