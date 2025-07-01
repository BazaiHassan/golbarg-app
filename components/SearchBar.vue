<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
</script>

<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
    <div class="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto items-center">
      <Input 
        id="search" 
        type="text" 
        placeholder="جستجو..." 
        class="w-full pl-4 pr-12 sm:pr-14 h-10 sm:h-12 md:h-14 text-sm sm:text-base md:text-lg shadow-md sm:shadow-lg hover:shadow-xl focus:shadow-xl bg-[#c9f5be] border-2 border-transparent focus:border-green-400 transition-all duration-300 rounded-lg sm:rounded-xl"
        dir="rtl"
      />
      <span class="absolute right-2 sm:right-3 inset-y-0 flex items-center justify-center px-1 sm:px-2">
        <Search class="size-4 sm:size-5 md:size-6 text-muted-foreground hover:text-green-700 transition-colors duration-200" />
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Custom responsive styles for RTL support */
.search-container {
  direction: rtl;
}

/* Focus styles for better accessibility */
input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.2);
}

/* Responsive placeholder text */
@media (max-width: 640px) {
  input::placeholder {
    font-size: 0.875rem; /* 14px */
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  input::placeholder {
    font-size: 1rem; /* 16px */
  }
}

@media (min-width: 769px) {
  input::placeholder {
    font-size: 1.125rem; /* 18px */
  }
}

/* Touch-friendly hover states for mobile */
@media (hover: none) and (pointer: coarse) {
  .search-input:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}

/* Enhanced focus states for keyboard navigation */
input:focus-visible {
  outline: 2px solid #22c55e;
  outline-offset: 2px;
}
</style>