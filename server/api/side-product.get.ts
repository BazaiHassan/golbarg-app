export default defineEventHandler(async (event) => {
    const db = useDatabase('golbargDB');

    // Fetch all products from the database
    const allSideProducts = await db.sql`SELECT * FROM side_products ORDER BY created_at DESC`;

    // Check if products were found
    if (!allSideProducts.rows || allSideProducts.rows.length === 0) {
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
        data: allSideProducts.rows,
    };
})