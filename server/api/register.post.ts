export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    const db = useDatabase('golbargDB');
    await db.sql`INSERT INTO users (email, phone, password) VALUES (${requestBody.email},${requestBody.phone}, ${requestBody.password})`;

    return {
        status: 'موفق',
        message: 'ثبت نام با موفقیت انجام شد',
    };
})