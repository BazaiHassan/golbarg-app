<template>
  <div dir="rtl" class="flex container mt-2 mx-auto w-full h-screen flex-col">
    <!-- top app -->
    <div class="flex justify-between w-full h-[96px]">
      <div class="flex w-1/3 justify-start items-center p-2">
        <Logo />
      </div>
      <div class="flex w-1/3 justify-center items-center p-2">
        <SearchBar />
      </div>
      <div class="flex w-1/3 justify-end items-center p-2">
        <Login />
      </div>
    </div>
    <!-- navbar -->
    <div class="mt-12">
      <Navbar />
    </div>
    <!-- hero -->
     <div class="mt-32">
        <Hero />
     </div>

     <!-- Slider -->
      <div class="flex justify-center mt-16">
        <ProductSlider />
      </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/Navbar.vue";
import ProductSlider from "~/components/ProductSlider.vue";
</script>

<style scoped></style>
