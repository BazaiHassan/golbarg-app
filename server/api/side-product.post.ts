export default defineEventHandler(async (event) => {
    try {
        const requestBody = await readBody(event);

        // Validate required fields
        if (!requestBody.title || !requestBody.price || !requestBody.image_url || !requestBody.description || requestBody.in_stock === undefined) {
            setResponseStatus(event, 400);
            return {
                status: 'error',
                message: 'تمام فیلدهای ضروری را پر کنید',
            };
        }

        const db = useDatabase('golbargDB');

        // Prepare data for insertion with all table fields
        const sideProductData = {
            title: requestBody.title.trim(),
            description: requestBody.description.trim(),
            in_stock: requestBody.in_stock,
            price: parseFloat(requestBody.price),
            image_url: requestBody.image_url.trim(),
            rate: requestBody.rate ? parseFloat(requestBody.rate) : null,
            discount: requestBody.discount ? parseFloat(requestBody.discount) : null,
            shiping_price: requestBody.shiping_price ? parseFloat(requestBody.shiping_price) : null,
            created_at: new Date().toISOString()
        };

        // Insert the new product into the database with all fields
        const addNewSideProduct = await db.sql`
            INSERT INTO side_products (title, description, in_stock, price, image_url, rate, discount, shiping_price, created_at) 
            VALUES (${sideProductData.title}, ${sideProductData.description}, ${sideProductData.in_stock}, ${sideProductData.price}, ${sideProductData.image_url}, ${sideProductData.rate}, ${sideProductData.discount}, ${sideProductData.shiping_price}, ${sideProductData.created_at})
        `;

        // Get the inserted product using last_insert_rowid()
        const insertedSideProduct = await db.sql`
            SELECT id, title, description, in_stock, price, image_url, rate, discount, shiping_price, created_at 
            FROM side_products 
            WHERE id = last_insert_rowid()
        `;

        // Check if the insertion was successful
        if (!insertedSideProduct.rows || insertedSideProduct.rows.length === 0) {
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
            data: insertedSideProduct.rows[0],
        };

    } catch (error) {
        console.error('Error in product creation:', error);

        setResponseStatus(event, 500);
        return {
            status: 'error',
            message: 'خطای سرور: '
        };
    }
});