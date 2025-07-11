<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Truck, Check, Star, Eye } from 'lucide-vue-next'

defineProps<{
  ID: number
  title: string
  price: string
  image: string
  description: string
}>()

// Function to format price with proper number formatting
const formatPrice = (price: string) => {
  const numericPrice = price.replace(/[^\d]/g, '')
  return new Intl.NumberFormat('fa-IR').format(parseInt(numericPrice))
}
</script>

<template>
  <Card class="group relative overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg bg-gradient-to-br from-white via-white to-[#BDE896]/10 backdrop-blur-sm">
    <!-- Floating decoration -->
    <div class="absolute top-4 left-4 w-2 h-2 bg-gradient-to-r from-[#BDE896] to-[#A8D478] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
    
    <CardHeader class="p-0 relative">
      <div class="relative overflow-hidden rounded-t-lg">
        <img 
          v-if="image"
          :src="image"
          :alt="title"
          class="w-full h-64 object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
        />
        
        <!-- Gradient overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <!-- Price Badge with glassmorphism -->
        <Badge 
          variant="secondary"
          class="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#4A5D23] shadow-xl border border-[#BDE896]/30 px-3 py-1.5 text-sm font-bold"
        >
          {{ formatPrice(price) }} تومان
        </Badge>
        
        <!-- Rating Badge -->
        <div class="absolute top-4 left-4 bg-[#BDE896]/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 shadow-lg">
          <Star class="w-3 h-3 fill-[#A8D478] text-[#A8D478]" />
          <span class="text-xs font-bold text-[#4A5D23]">4.8</span>
        </div>
        
        <!-- Quick view button -->
        <Button
          variant="ghost"
          size="icon"
          class="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
        >
          <Eye class="w-4 h-4" />
        </Button>
      </div>
    </CardHeader>
        
    <CardContent class="p-6 space-y-4">
      <CardTitle class="text-xl font-bold text-[#4A5D23] line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#8BC34A] group-hover:to-[#A8D478] group-hover:bg-clip-text transition-all duration-300 leading-tight">
        {{ title }}
      </CardTitle>
            
      <CardDescription class="text-sm text-[#6B7F2F] line-clamp-3 leading-relaxed">
        {{ description }}
      </CardDescription>
    </CardContent>
        
    <CardFooter class="p-6 pt-0">
      <div class="w-full space-y-4">
        <!-- Action Buttons -->
        <div class="flex gap-3">
          <Button 
            class="flex-1 bg-gradient-to-r from-[#8BC34A] via-[#9CCC65] to-[#BDE896] hover:from-[#7CB342] hover:via-[#8BC34A] hover:to-[#A8D478] shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 text-[#4A5D23] font-medium px-6 py-3 rounded-xl"
          >
            <ShoppingCart class="w-4 h-4 mr-2" />
            اضافه کردن به سبد خرید
          </Button>
          
          <Button
            variant="outline"
            class="px-4 py-3 border-2 border-[#BDE896] hover:border-[#A8D478] hover:bg-[#BDE896]/10 transition-all duration-200 rounded-xl text-[#4A5D23]"
            as-child
          >
            <NuxtLink :to="`/product/${ID}`">
              <Eye class="w-4 h-4" />
            </NuxtLink>
          </Button>
        </div>
                
        <!-- Additional Info -->
        <div class="flex items-center justify-between text-xs text-[#6B7F2F] bg-[#BDE896]/10 rounded-lg p-3">
          <div class="flex items-center gap-1.5">
            <div class="w-2 h-2 bg-[#8BC34A] rounded-full"></div>
            <Truck class="w-3.5 h-3.5 text-[#8BC34A]" />
            <span class="font-medium">ارسال رایگان</span>
          </div>
          <div class="flex items-center gap-1.5">
            <Check class="w-3.5 h-3.5 text-[#8BC34A]" />
            <span class="font-medium">موجود در انبار</span>
          </div>
        </div>
      </div>
    </CardFooter>
    
    <!-- Bottom accent line -->
    <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
  </Card>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for better aesthetics */
.card-container::-webkit-scrollbar {
  width: 4px;
}

.card-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.card-container::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
}

.card-container::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #5a67d8 0%, #6b46c1 100%);
}
</style>