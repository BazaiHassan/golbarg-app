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
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-vue-next'

defineProps<{
  ID: number
  title: string
  price: string
  image: string
  description: string
  rating?: number
  originalPrice?: string
  isNew?: boolean
  isSale?: boolean
}>()
</script>

<template>
  <div class="relative group">
    <!-- Main Card -->
    <Card class="overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:border-gray-300/80 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
      <!-- Image Section -->
      <div class="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img 
          v-if="image" 
          :src="image" 
          :alt="title" 
          class="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
        />
        
        <!-- Overlay Gradient -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <!-- Badges -->
        <div class="absolute top-4 left-4 flex flex-col gap-2">
          <Badge v-if="isNew" class="bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
            <Zap class="w-3 h-3 mr-1" />
            جدید
          </Badge>
          <Badge v-if="isSale" class="bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg">
            تخفیف ویژه
          </Badge>
        </div>
        
        <!-- Quick Actions -->
        <div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <Button
            size="icon"
            variant="ghost"
            class="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <Heart class="w-4 h-4 text-gray-600 hover:text-red-500" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            class="w-10 h-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
          >
            <Eye class="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>
      
      <!-- Content Section -->
      <CardContent class="p-6 space-y-4">
        <!-- Title -->
        <CardTitle class="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-purple-600 transition-colors duration-300">
          {{ title }}
        </CardTitle>
        
        <!-- Rating -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-1">
            <Star class="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span class="text-sm font-medium text-gray-700">{{ rating || 4.5 }}</span>
          </div>
          <span class="text-xs text-gray-500">(125 نظر)</span>
        </div>
        
        <!-- Description -->
        <CardDescription class="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {{ description }}
        </CardDescription>
        
        <!-- Price Section -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold text-gray-900">{{ price }}</span>
            <span class="text-sm text-gray-500">تومان</span>
          </div>
          <div v-if="originalPrice" class="flex items-center gap-1">
            <span class="text-sm text-gray-400 line-through">{{ originalPrice }}</span>
            <Badge variant="destructive" class="text-xs">20%</Badge>
          </div>
        </div>
      </CardContent>
      
      <!-- Footer -->
      <CardFooter class="p-6 pt-0">
        <div class="w-full space-y-3">
          <!-- Main Action Button -->
          <Button 
            as-child
            class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group/btn"
          >
            <NuxtLink :to="`/product/${ID}`" class="flex items-center justify-center gap-2">
              <ShoppingCart class="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110" />
              مشاهده و خرید
            </NuxtLink>
          </Button>
          
          <!-- Features -->
          <div class="grid grid-cols-3 gap-4 text-xs text-gray-500">
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>ارسال سریع</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>ضمانت اصالت</span>
            </div>
            <div class="flex items-center gap-1">
              <div class="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>7 روز تضمین</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
    
    <!-- Floating Effect -->
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform scale-95 group-hover:scale-105"></div>
  </div>
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

/* Glass morphism effect */
@supports (backdrop-filter: blur(10px)) {
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
}
</style>