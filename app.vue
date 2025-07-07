<template>
  <main class="irSans">
    <NuxtPage />
     <!-- Nuxt  -->

    <Toaster :toast-options="{
      style:{
        fontFamily: 'irSans',
      }
    }" dir="rtl" class="pointer-events-auto" />

  </main>
</template>

<script setup lang="ts">
import 'vue-sonner/style.css'
import { Toaster } from 'vue-sonner'
</script>

<style>
@font-face {
  font-family: "irSans";
  src: url("/fonts/IRANSansWeb.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.irSans {
  font-family: "irSans", sans-serif;
}
</style>