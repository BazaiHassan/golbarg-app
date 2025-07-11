<script lang="ts" setup>

</script>

<template>
                    <!-- Stats Cards -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                    <div class="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
                        <div class="flex items-center justify-center mb-4">
                            <div class="w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Package class="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">{{  }}+</h3>
                        <p class="text-gray-600">محصولات متنوع</p>
                    </div>
                    
                    <div class="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
                        <div class="flex items-center justify-center mb-4">
                            <div class="w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <ShoppingBag class="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">1000+</h3>
                        <p class="text-gray-600">مشتری راضی</p>
                    </div>
                    
                    <div class="group bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-white/50">
                        <div class="flex items-center justify-center mb-4">
                            <div class="w-14 h-14 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp class="w-7 h-7 text-white" />
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold text-gray-800 mb-2">98%</h3>
                        <p class="text-gray-600">رضایت کاربران</p>
                    </div>
                </div>
</template>

<style lang="css" scoped>
    
</style>
