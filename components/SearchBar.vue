<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="relative w-full max-w-lg items-center">
    <Input 
      id="search" 
      type="text" 
      placeholder="" 
      class="pl-4 pr-12 h-12 text-lg shadow-lg bg-[#c9f5be]"
    />
    <span class="absolute right-0 inset-y-0 flex items-center justify-center px-3">
      <Search class="size-6 text-muted-foreground" />
    </span>
  </div>
</template>