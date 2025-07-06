<template>
  <div dir="rtl" class="flex container mx-auto w-full min-h-screen flex-col px-4 sm:px-6 lg:px-8">
    <!-- Top App Bar -->
    <div class="flex flex-col sm:flex-row justify-between w-full min-h-[80px] sm:h-[96px] py-4 gap-4 sm:gap-0">
      <!-- Logo Section -->
      <div class="flex w-full sm:w-1/3 justify-center sm:justify-start items-center order-1 sm:order-1">
        <Logo />
      </div>
      
      <!-- Search Bar Section -->
      <div class="flex w-full sm:w-1/3 justify-center items-center order-3 sm:order-2">
        <div class="w-full max-w-md sm:max-w-none">
          <SearchBar />
        </div>
      </div>
      
      <!-- Login Section -->
      <div class="flex w-full sm:w-1/3 justify-center sm:justify-end items-center order-2 sm:order-3">
        <Auth />
      </div>
    </div>

    <!-- Navigation Bar -->
    <div class="mt-6 sm:mt-8 lg:mt-12">
      <Navbar />
    </div>

    <!-- Hero Section -->
    <div class="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32">
      <Hero />
    </div>

    <!-- Product Slider -->
    <div class="flex justify-center mt-8 sm:mt-12 md:mt-14 lg:mt-16 mb-8 sm:mb-12 lg:mb-16">
      <div class="w-full">
        <ProductSlider />
      </div>
    </div>

    <!-- Ai Hero -->
    <div>
      <AiHero />
    </div>

    <!-- Terarium Section -->
     <div class="mt-12 sm:mt-16 md:mt-20 lg:mt-24 xl:mt-32">
      <Terarium />
     </div>

     <!-- Product Section -->
      <div>
        <ProductHome />
      </div>
    <!-- Footer Spacer -->
    <div class="flex-grow"></div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import ProductSlider from "~/components/ProductSlider.vue";
</script>

<style scoped>
/* Custom responsive adjustments */
@media (max-width: 640px) {
  /* Ensure proper mobile spacing */
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media (min-width: 641px) and (max-width: 1023px) {
  /* Tablet optimizations */
  .top-bar-section {
    padding: 0.75rem;
  }
}

@media (min-width: 1024px) {
  /* Desktop optimizations */
  .container {
    max-width: 1200px;
  }
}

@media (min-width: 1280px) {
  /* Large desktop optimizations */
  .container {
    max-width: 1400px;
  }
}

/* RTL specific adjustments */
[dir="rtl"] .flex-row-reverse {
  flex-direction: row-reverse;
}

/* Smooth transitions for layout changes */
.top-bar-transition {
  transition: all 0.3s ease-in-out;
}
</style>