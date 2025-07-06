export default defineEventHandler(async (event) => {
    try {
        const requestBody = await readBody(event);

        // Validate required fields
        if (!requestBody.title || !requestBody.price || !requestBody.image_url || !requestBody.description) {
            setResponseStatus(event, 400);
            return {
                status: 'error',
                message: 'تمام فیلدهای ضروری را پر کنید',
            };
        }

        const db = useDatabase('golbargDB');

        // Prepare data for insertion
        const productData = {
            title: requestBody.title.trim(),
            price: parseFloat(requestBody.price),
            description: requestBody.description.trim(),
            image_url: requestBody.image_url.trim(),
            created_at: new Date().toISOString()
        };

        // Insert the new product into the database
        const addNewProduct = await db.sql`
            INSERT INTO products (title, price, description, image_url, created_at) 
            VALUES (${productData.title}, ${productData.price}, ${productData.description}, ${productData.image_url}, ${productData.created_at})
        `;

        // Get the inserted product using last_insert_rowid()
        const insertedProduct = await db.sql`
            SELECT id, title, price, description, image_url, created_at 
            FROM products 
            WHERE id = last_insert_rowid()
        `;

        // Check if the insertion was successful
        if (!insertedProduct.rows || insertedProduct.rows.length === 0) {
            setResponseStatus(event, 500);
            return {
                status: 'error',
                message: 'خطایی در افزودن محصول رخ داده است. لطفا دوباره تلاش کنید.',
            };
        }

        // Return the newly created product data
        setResponseStatus(event, 201);
        return {
            status: 'success',
            message: 'محصول با موفقیت اضافه شد',
            data: insertedProduct.rows[0],
        };

    } catch (error) {
        console.error('Error in product creation:', error);
        
        setResponseStatus(event, 500);
        return {
            status: 'error',
            message: 'خطای سرور: ',
        };
    }
});