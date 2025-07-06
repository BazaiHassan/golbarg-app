import { generateToken } from "../utils/generateToken";

export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    const db = useDatabase('golbargDB');
    
    // Validate required fields
    if (!requestBody.email || !requestBody.phone || !requestBody.password) {
        setResponseStatus(event, 400);
        return {
            status: 'error',
            message: 'تمام فیلدهای ضروری را پر کنید',
        };
    }

    // Check if the user already exists
    const existingUser = await db.sql`SELECT * FROM users WHERE phone = ${requestBody.phone} OR email = ${requestBody.email}`;
    if (existingUser.rows && existingUser.rows.length > 0) {
        setResponseStatus(event, 409); // Conflict
        return {
            status: 'error',
            message: 'کاربری با این شماره موبایل یا ایمیل قبلا ثبت نام کرده است',
        };
    }
    // Generate a unique token for the new user
    const token = generateToken();
    // Insert the new user into the database with token
    const addNewUser = await db.sql`
        INSERT INTO users (email, phone, password, token, created_at) 
        VALUES (${requestBody.email}, ${requestBody.phone}, ${requestBody.password}, ${token}, ${new Date().toISOString()})
        RETURNING id, email, phone, token
    `;
    
    // Check if the insertion was successful
    if (!addNewUser.rows || addNewUser.rows.length === 0) {
        setResponseStatus(event, 500);
        return {
            status: 'error',
            message: 'خطایی در ثبت نام رخ داده است. لطفا دوباره تلاش کنید.',
        };
    }

    // Return the newly created user data
    setResponseStatus(event, 201); // Created
    return {
        status: 'success',
        message: 'ثبت نام با موفقیت انجام شد',
    };


})
