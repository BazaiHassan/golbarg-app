<template>
  <main class="irSans" :style="{backgroundColor: bgColor}">
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
const bgColor = ref("#EAFFE4")
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