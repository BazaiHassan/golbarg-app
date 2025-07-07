<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

defineProps<{
  ID: number
  title: string
  price: string
  image: string
  description: string
}>()
</script>

<template>
  <Card class="overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <CardHeader class="p-0">
      <img 
        v-if="image" 
        :src="image" 
        :alt="title" 
        class="w-full h-48 object-cover"
      />
    </CardHeader>
    <CardContent class="p-4">
      <CardTitle class="text-lg font-semibold mb-2 line-clamp-1">
        {{ title }}
      </CardTitle>
      <CardDescription class="text-sm text-gray-600 line-clamp-2">
        {{ description }}
      </CardDescription>
    </CardContent>
    <CardFooter class="p-4 pt-0">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm text-gray-500">قیمت:</span>
        <span class="text-sm text-gray-500">تومان ${{ price }}</span>
      </div>
      <NuxtLink 
        :to="`/product/${ID}`" 
        class="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
      >
        مشاهده جزئیات
      </NuxtLink>
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
</style>