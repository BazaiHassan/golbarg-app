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
import { Heart, Truck, Check, Star } from 'lucide-vue-next'

defineProps<{
  ID: number
  title: string
  price: string
  image: string
  description: string
}>()
</script>

<template>
  <Card class="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
    <CardHeader class="p-0 relative">
      <div class="relative overflow-hidden">
        <img 
          v-if="image" 
          :src="image" 
          :alt="title" 
          class="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <!-- Price Badge -->
        <Badge 
          variant="secondary" 
          class="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 shadow-lg hover:shadow-xl"
        >
          {{ price }} تومان
        </Badge>
      </div>
    </CardHeader>
    
    <CardContent class="p-5 space-y-3">
      <CardTitle class="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors duration-200">
        {{ title }}
      </CardTitle>
      
      <CardDescription class="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
        {{ description }}
      </CardDescription>
      
    </CardContent>
    
    <CardFooter class="p-5 pt-0">
      <div class="w-full space-y-3">
        <!-- Action Buttons -->
        <div class="flex gap-2">
          <Button 
            as-child
            class="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <NuxtLink :to="`/product/${ID}`">
              مشاهده جزئیات
            </NuxtLink>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            class="text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors duration-200 group/heart"
          >
            <Heart class="w-5 h-5 transition-transform duration-200 group-hover/heart:scale-110" />
          </Button>
        </div>
        
        <!-- Additional Info -->
        <div class="flex items-center justify-between text-xs text-muted-foreground">
          <div class="flex items-center gap-1">
            <Truck class="w-3 h-3" />
            <span>ارسال رایگان</span>
          </div>
          <div class="flex items-center gap-1">
            <Check class="w-3 h-3 text-green-600" />
            <span>موجود در انبار</span>
          </div>
        </div>
      </div>
    </CardFooter>
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
</style>