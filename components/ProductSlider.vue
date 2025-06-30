<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

import p1 from "@/assets/images/p_1.png";
import p2 from "@/assets/images/p_2.png";
import p3 from "@/assets/images/p_3.png";
import p4 from "@/assets/images/p_4.jpg";
import p5 from "@/assets/images/p_5.jpg";

const imageList = [p1, p2, p3, p4, p5]; // Remove ref() since these are static imports

const plugin = ref(Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
}))
</script>

<template>
  <Carousel
    class="relative w-full max-w-4xl mx-auto"
    :plugins="[plugin]"
    :opts="{
      align: 'start',
      loop: true,
      slidesToScroll: 1,
      containScroll: 'trimSnaps'
    }"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()]"
  >
    <CarouselContent class="-ml-2">
      <CarouselItem v-for="(image, index) in imageList" :key="index" class="pl-2 basis-1/3">
        <div class="p-1">
          <div class="overflow-hidden h-64 rounded-lg shadow-lg">
            <img 
              :src="image" 
              :alt="`Image ${index + 1}`"
              class="w-full h-full object-contain rounded-lg"
            />
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious class="left-2" />
    <CarouselNext class="right-2" />
  </Carousel>
</template>