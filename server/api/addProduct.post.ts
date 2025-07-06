export default defineEventHandler(async (event) => {
    const requestBody = await readBody(event);

    const db = useDatabase('golbargDB');

    // Validate required fields
    if (!requestBody.title || !requestBody.price || !requestBody.image_url || !requestBody.description) {
        setResponseStatus(event, 400);
        return {
            status: 'error',
            message: 'تمام فیلدهای ضروری را پر کنید',
        };
    }

    // Insert the new product into the database
    const addNewProduct = await db.sql`
        INSERT INTO products (title, price, description,image_url, created_at) 
        VALUES (${requestBody.title}, ${requestBody.price}, ${requestBody.description},${requestBody.image_url}, ${new Date().toISOString()})
        RETURNING id, title, price, image_url, description
    `;

    // Check if the insertion was successful
    if (!addNewProduct.rows || addNewProduct.rows.length === 0) {
        setResponseStatus(event, 500);
        return {
            status: 'error',
            message: 'خطایی در افزودن محصول رخ داده است. لطفا دوباره تلاش کنید.',
        };
    }

    // Return the newly created product data
    setResponseStatus(event, 201); // Created
    return {
        status: 'success',
        message: 'محصول با موفقیت اضافه شد',
        data: addNewProduct.rows[0],
    };
});