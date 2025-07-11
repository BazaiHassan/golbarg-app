<script lang="ts" setup>
import { useProducts } from '~/composables/useProducts';
import ProductCard from './ProductCard.vue';

const { getAllProducts, isLoadingProducts, products } = useProducts()
// Fetch products when the component is mounted
onMounted(() => {
    getAllProducts()
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="container mx-auto px-6 py-12">
            <!-- Hero Section -->
            <div class="text-center mb-16 relative">
                <div class="absolute inset-0 bg-gradient-to-r from-transparent via-green-50 to-transparent opacity-30 blur-3xl"></div>
                <div class="relative z-10">
                    <h1 class="text-5xl md:text-6xl font-black text-gray-800 mb-6 leading-tight">
                        محصولات گلبرگ
                    </h1>
                    <p class="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        مجموعه‌ای از زیباترین گل‌های طبیعی با کیفیت برتر
                    </p>
                    <div class="mt-8 w-24 h-1 bg-gradient-to-r from-green-400 to-green-600 mx-auto rounded-full"></div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingProducts" class="flex flex-col justify-center items-center py-32">
                <div class="relative mb-8">
                    <div class="w-20 h-20 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    <div class="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-green-600 rounded-full animate-spin" style="animation-direction: reverse; animation-duration: 1.5s;"></div>
                </div>
                <div class="text-center">
                    <span class="text-gray-600 font-semibold text-lg">در حال بارگذاری محصولات...</span>
                    <div class="mt-4 flex justify-center space-x-1">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
                    </div>
                </div>
            </div>

            <!-- Products Grid -->
            <div v-else class="relative">
                <!-- Background decoration -->
                <div class="absolute inset-0 bg-gradient-to-r from-green-50/20 via-transparent to-green-50/20 rounded-3xl"></div>
                
                <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <ProductCard 
                        v-for="product in products" 
                        :key="product.ID" 
                        :ID="product.ID"
                        :image="product.image_url" 
                        :title="product.title" 
                        :price="product.price" 
                        :description="product.description"
                        class="transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    />
                </div>
            </div>

            <!-- Empty State (if no products) -->
            <div v-if="!isLoadingProducts && products.length === 0" class="text-center py-20">
                <div class="mb-8">
                    <svg class="w-24 h-24 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 13h.01M12 13h.01M15 13h.01"></path>
                    </svg>
                </div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">هیچ محصولی یافت نشد</h3>
                <p class="text-gray-600 text-lg">در حال حاضر محصولی موجود نیست. لطفاً بعداً تلاش کنید.</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1400px;
}

/* Custom animation for reverse spinning */
@keyframes reverse-spin {
    from {
        transform: rotate(360deg);
    }
    to {
        transform: rotate(0deg);
    }
}

/* Smooth scrolling enhancement */
html {
    scroll-behavior: smooth;
}

/* Enhanced hover effects */
.hover\:scale-105:hover {
    transform: scale(1.05);
}

/* Gradient text effect for future enhancement */
.gradient-text {
    background: linear-gradient(135deg, #10b981, #047857);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
</style>