export default defineEventHandler(async (event) => {
    const db = useDatabase('golbargDB');

    // Fetch all products from the database
    const allProducts = await db.sql`SELECT * FROM products ORDER BY created_at DESC`;

    // Check if products were found
    if (!allProducts.rows || allProducts.rows.length === 0) {
        setResponseStatus(event, 404); // Not Found
        return {
            status: 'error',
            message: 'هیچ محصولی یافت نشد',
        };
    }

    // Return the list of products
    setResponseStatus(event, 200); // OK
    return {
        status: 'success',
        message: 'محصولات با موفقیت بارگذاری شدند',
        data: allProducts.rows,
    };
})