<script setup lang="ts">
import { ref, computed } from 'vue'
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import p1 from "@/assets/images/p_1.png";
import p2 from "@/assets/images/p_2.png";
import p3 from "@/assets/images/p_3.png";

const imageList = [p1, p2, p3];

const plugin = ref(Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
}))

// Responsive carousel options
const carouselOptions = computed(() => ({
  align: 'start',
  loop: true,
  slidesToScroll: 1,
  containScroll: 'trimSnaps',
  breakpoints: {
    '(min-width: 768px)': { 
      slidesToScroll: 1 
    },
    '(min-width: 1024px)': { 
      slidesToScroll: 1 
    }
  }
}))
</script>

<template>
  <div class="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
    <Carousel
      class="relative w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto"
      :plugins="[plugin]"
      :opts="carouselOptions"
      @mouseenter="plugin.stop"
      @mouseleave="[plugin.reset(), plugin.play()]"
    >
      <CarouselContent class="-ml-1 sm:-ml-2 md:-ml-4">
        <CarouselItem 
          v-for="(image, index) in imageList" 
          :key="index" 
          class="pl-1 sm:pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
        >
          <div class="p-1 sm:p-2">
            <div class="overflow-hidden h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img 
                :src="image" 
                :alt="`صورت ${index + 1}`"
                class="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      
      <!-- Navigation Arrows - Hidden on mobile, visible on tablet+ -->
      <CarouselPrevious 
        class="left-2 sm:left-4 hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" 
        aria-label="تصویر قبلی"
      />
      <CarouselNext 
        class="right-2 sm:right-4 hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12" 
        aria-label="تصویر بعدی"
      />
      
      <!-- Mobile Touch Indicators (Optional) -->
      <div class="flex justify-center mt-4 sm:hidden">
        <div class="flex space-x-2 rtl:space-x-reverse">
          <div 
            v-for="(_, index) in imageList" 
            :key="index"
            class="w-2 h-2 rounded-full bg-gray-300"
          ></div>
        </div>
      </div>
    </Carousel>
  </div>
</template>

<style scoped>
/* Custom responsive styles */
@media (max-width: 640px) {
  /* Ensure smooth touch scrolling on mobile */
  .carousel-content {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
  }
}

/* RTL support for navigation arrows */
.carousel-previous,
.carousel-next {
  transition: all 0.3s ease;
}

.carousel-previous:hover,
.carousel-next:hover {
  transform: scale(1.1);
}

/* Custom scrollbar for touch devices */
@media (hover: none) and (pointer: coarse) {
  .carousel-content::-webkit-scrollbar {
    display: none;
  }
  
  .carousel-content {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>