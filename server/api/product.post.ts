export default defineEventHandler(async (event) => {
    try {
        console.log('Starting product creation...');
        
        const requestBody = await readBody(event);
        console.log('Request body:', requestBody);

        // Validate required fields
        if (!requestBody.title || !requestBody.price || !requestBody.image_url || !requestBody.description) {
            console.log('Validation failed - missing required fields');
            setResponseStatus(event, 400);
            return {
                status: 'error',
                message: 'تمام فیلدهای ضروری را پر کنید',
            };
        }

        console.log('Validation passed, connecting to database...');
        const db = useDatabase('golbargDB');
        
        // Test database connection
        console.log('Testing database connection...');
        const testConnection = await db.sql`SELECT 1 as test`;
        console.log('Database connection test:', testConnection);

        // Check if products table exists
        console.log('Checking if products table exists...');
        const tableExists = await db.sql`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'products'
            );
        `;
        console.log('Table exists check:', tableExists);

        // If table doesn't exist, create it
        if (!tableExists.rows[0].exists) {
            console.log('Creating products table...');
            await db.sql`
                CREATE TABLE products (
                    id SERIAL PRIMARY KEY,
                    title VARCHAR(255) NOT NULL,
                    price DECIMAL(10, 2) NOT NULL,
                    description TEXT,
                    image_url TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            `;
            console.log('Products table created successfully');
        }

        // Check table structure
        console.log('Checking table structure...');
        const tableStructure = await db.sql`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'products' 
            ORDER BY ordinal_position;
        `;
        console.log('Table structure:', tableStructure);

        // Prepare data for insertion
        const productData = {
            title: requestBody.title.trim(),
            price: parseFloat(requestBody.price),
            description: requestBody.description.trim(),
            image_url: requestBody.image_url.trim(),
            created_at: new Date().toISOString()
        };

        console.log('Prepared product data:', productData);

        // Insert the new product into the database
        console.log('Inserting product into database...');
        const addNewProduct = await db.sql`
            INSERT INTO products (title, price, description, image_url, created_at) 
            VALUES (${productData.title}, ${productData.price}, ${productData.description}, ${productData.image_url}, ${productData.created_at})
            RETURNING id, title, price, description, image_url, created_at
        `;

        console.log('Insert result:', addNewProduct);

        // Check if the insertion was successful
        if (!addNewProduct.rows || addNewProduct.rows.length === 0) {
            console.log('Insert failed - no rows returned');
            setResponseStatus(event, 500);
            return {
                status: 'error',
                message: 'خطایی در افزودن محصول رخ داده است. لطفا دوباره تلاش کنید.',
            };
        }

        console.log('Product created successfully:', addNewProduct.rows[0]);

        // Return the newly created product data
        setResponseStatus(event, 201); // Created
        return {
            status: 'success',
            message: 'محصول با موفقیت اضافه شد',
            data: addNewProduct.rows[0],
        };

    } catch (error) {
        console.error('Error in product creation:', error);
        console.error('Error stack:', error.stack);
        
        setResponseStatus(event, 500);
        return {
            status: 'error',
            message: 'خطای سرور: ' + error.message,
            debug: process.env.NODE_ENV === 'development' ? {
                error: error.message,
                stack: error.stack
            } : undefined
        };
    }
});