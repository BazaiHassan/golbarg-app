<template>
    <div class="flex flex-col gap-4 sm:gap-6 lg:gap-8 justify-center items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <!-- Hero Image -->
        <div class="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
            <img 
                class="w-full h-auto object-contain" 
                src="../assets/images/hero-img.png" 
                alt="گل های شکوفا"
                loading="lazy"
            >
        </div>
        
        <!-- Hero Text Content -->
        <div class="flex flex-col gap-2 sm:gap-3 lg:gap-4 justify-center items-center text-center max-w-4xl">
            <!-- Main Headlines -->
            <div class="space-y-1 sm:space-y-2">
                <h1 class="font-irSans text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
                    گل های شکوفا
                </h1>
                <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
                    با مراقبت هوشمند
                </h2>
            </div>
            
            <!-- Subtitle -->
            <p class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mt-4 sm:mt-6 lg:mt-8 leading-relaxed px-2">
                طبیعت را با
                <span class="text-green-700 font-semibold">گلبرگ</span>
                به خانه هایتان دعوت کنید
            </p>
        </div>
        
        <!-- CTA Section (if needed for future use) -->
        <div class="mt-4 sm:mt-6 lg:mt-8">
            <!-- Add buttons or other call-to-action elements here if needed -->
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
/* Custom responsive adjustments if needed */
@media (max-width: 640px) {
    .font-irSans {
        line-height: 1.2;
    }
}

@media (min-width: 1280px) {
    .hero-container {
        max-width: 1200px;
    }
}
</style>