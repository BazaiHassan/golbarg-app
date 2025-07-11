<script lang="ts" setup>
import { useProducts } from '~/composables/useProducts';
import ProductCard from './ProductCard.vue';
import AccessoryCard from './AccessoryCard.vue';
import { Sparkles, Package, ShoppingBag, TrendingUp } from 'lucide-vue-next';

const { getAllProducts, isLoadingProducts, products } = useProducts()

// Fetch products when the component is mounted
onMounted(() => {
    getAllProducts()
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40">
        <!-- Background Decoration -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div class="relative container mx-auto px-4 py-16">
            <!-- Hero Section -->
            <div class="text-center mb-16 relative">
                <!-- Decorative Elements -->
                <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                    <div class="flex items-center gap-2 text-purple-400">
                        <Sparkles class="w-5 h-5 animate-pulse" />
                        <div class="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                        <Sparkles class="w-5 h-5 animate-pulse delay-500" />
                    </div>
                </div>
                
                <!-- Main Title -->
                <div class="flex items-center justify-center gap-4 mb-6">
                    <div class="relative">
                        <img 
                            src="/assets/images/accesories.png" 
                            alt="Accessories Icon" 
                            class="w-16 h-16 md:w-20 md:h-20 object-contain animate-pulse"
                        />
                        <div class="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-xl animate-pulse"></div>
                    </div>
                    <h1 class="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-800 via-green-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                        اکسسوری های گلبرگ
                    </h1>
                    <div class="relative">
                        <img 
                            src="/assets/images/accesories.png" 
                            alt="Accessories Icon" 
                            class="w-16 h-16 md:w-20 md:h-20 object-contain animate-pulse delay-500"
                        />
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
                    </div>
                </div>
                
                <!-- Subtitle -->
                <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                    مجموعه‌ای منحصر به فرد از محصولات با کیفیت و طراحی مدرن
                </p>
                
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingProducts" class="flex justify-center items-center py-20">
                <div class="relative">
                    <div class="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                    <div class="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-green-600 rounded-full animate-spin animate-reverse"></div>
                </div>
                <span class="mr-4 text-gray-600 font-medium">در حال بارگذاری محصولات...</span>
            </div>

            <!-- Products Grid -->
            <div v-else class="relative">
                <!-- Section Title -->
                <div class="flex items-center justify-center mb-12">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-400 rounded-full"></div>
                        <h2 class="text-2xl font-bold text-gray-800">محصولات ما</h2>
                        <div class="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-400 rounded-full"></div>
                    </div>
                </div>
                
                <!-- Products Grid -->
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    <div 
                        v-for="(product, index) in products" 
                        :key="product.ID"
                        class="animate-fade-in-up"
                        :style="{ animationDelay: `${index * 150}ms` }"
                    >
                        <AccessoryCard 
                            :ID="product.ID"
                            :image="product.image_url" 
                            :title="product.title" 
                            :price="product.price" 
                            :description="product.description"
                            :rating="4.5"
                            :isNew="index < 3"
                            :isSale="index % 4 === 0"
                            :originalPrice="index % 4 === 0 ? String(Number(product.price) * 1.2) : undefined"
                        />
                    </div>
                </div>
                
                <!-- Empty State -->
                <div v-if="products?.length === 0" class="text-center py-20">
                    <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package class="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 class="text-2xl font-bold text-gray-800 mb-2">هنوز محصولی وجود ندارد</h3>
                    <p class="text-gray-600">به زودی محصولات جدید اضافه خواهد شد</p>
                </div>
            </div>
            
            <!-- Call to Action -->
            <div class="text-center mt-20">
                <div class="bg-gradient-to-r from-[#BDE896] to-[#BDE896] rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <!-- Background Pattern -->
                    <div class="absolute inset-0 opacity-10">
                        <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]"></div>
                    </div>
                    
                    <div class="relative z-10">
                        <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                            محصول مورد نظرتان را نمی‌بینید؟
                        </h2>
                        <p class="text-white/90 mb-8 max-w-2xl mx-auto">
                            با ما تماس بگیرید تا محصولات بیشتری را برای شما فراهم کنیم
                        </p>
                        <button class="bg-white text-black px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50">
                            تماس با ما
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1400px;
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
}

@keyframes reverse {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
}

.animate-reverse {
    animation: reverse 1s linear infinite;
}

/* Glass morphism effect */
@supports (backdrop-filter: blur(10px)) {
    .backdrop-blur-sm {
        backdrop-filter: blur(8px);
    }
}
</style>