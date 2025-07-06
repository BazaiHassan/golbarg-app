// product.delete.ts
export default defineEventHandler(async (event) => {
    try {
        // Get id from query parameters instead of route parameters
        const query = getQuery(event);
        const productId = Number(query.id);

        if (!productId) {
            setResponseStatus(event, 400);
            return {
                status: 'error',
                message: 'شناسه محصول الزامی است',
            };
        }

        const db = useDatabase('golbargDB');

        // Delete the product from the database
        const deleteProduct = await db.sql`
            DELETE FROM products WHERE id = ${productId}
        `;

        // Check if the deletion was successful
        if (deleteProduct.changes === 0) {
            setResponseStatus(event, 404);
            return {
                status: 'error',
                message: 'محصول یافت نشد',
            };
        }

        // Return success response
        setResponseStatus(event, 200);
        return {
            status: 'success',
            message: 'محصول با موفقیت حذف شد',
        };

    } catch (error) {
        console.error('Error in product deletion:', error);
        
        setResponseStatus(event, 500);
        return {
            status: 'error',
            message: 'خطای سرور: ',
        };
    }
});