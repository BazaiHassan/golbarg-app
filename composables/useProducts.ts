// composable for fetching dummy products
// composables/useProducts.js
export const useProducts = () => {
  const products = ref<any>([])

  const isLoadingProducts = ref(false)

  // Get all products
  const getAllProducts = async() => {
    isLoadingProducts.value = true
    $fetch('/api/products')
      .then((response: any) => {
        if (response.status === 'success') {
          products.value = response.data || []
          isLoadingProducts.value = false
        } else {
          console.error(response.message || 'خطا در بارگذاری محصولات')
          isLoadingProducts.value = false
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error)
          isLoadingProducts.value = false
      })
  }
  // Initial fetch of products
  onMounted(() => {
    getAllProducts()
  })


  return {
    products,
    getAllProducts,
    isLoadingProducts
  }
}