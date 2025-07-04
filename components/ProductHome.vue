<script lang="ts" setup>
import { useProducts } from '~/composables/useProducts';
import ProductCard from './ProductCard.vue';

const { getAllProducts } = useProducts()
const products = getAllProducts()
</script>

<template>
    <div class="container mx-auto px-4 py-8">
        <!-- Title -->
        <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">محصولات گلبرگ</h1>
            <p class="text-gray-600">مجموعه‌ای از زیباترین گل‌های طبیعی</p>
        </div>

        <!-- List Of Products -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <ProductCard 
                v-for="product in products" 
                :key="product.id" 
                :image="product.image" 
                :title="product.title" 
                :price="product.price" 
                :description="product.description"
            />
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1200px;
}
</style>