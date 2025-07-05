<template>
    <div class="h-screen w-full relative overflow-hidden">
        <!-- Background image covering full viewport while maintaining aspect ratio -->
        <img src="@/assets/images/curvy_bg_1.png" alt="Background" class="absolute inset-0 w-full object-cover" />

        <!-- Desktop Layout (lg and above) -->
        <div class="hidden lg:block">
            <!-- Left side container -->
            <div class="absolute left-2 top-1/2 transform -translate-y-1/2 w-[512px] h-[256px] flex items-center justify-center">
                <div class="relative">
                    <img src="@/assets/images/curvy_container_2.png" alt="Left Image" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-white">
                        <span class="text-black">
                            با راه حل های گلبرگ
                        </span>
                        <span class="text-black text-2xl font-extrabold">
                            گیاهت را به زندگی برگردون
                        </span>
                    </div>
                </div>
            </div>

            <!-- Right side container -->
            <div class="absolute right-4 top-1/3 transform -translate-y-1/2 w-[512px] h-[256px] flex items-center justify-center">
                <div class="relative">
                    <img src="@/assets/images/curvy_container_1.png" alt="Right Image" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
                        <span class="text-black">
                            یک عکس از گیاه که درگیر بیماری شده را آپلود کن
                        </span>
                        <span class="text-black text-2xl font-extrabold">
                            تا معجزه رو ببینی
                        </span>
                    </div>
                </div>
            </div>

            <!-- Image of robot -->
            <div class="absolute right-2 top-3/4 transform -translate-y-1/2 w-[512px] h-[256px] flex items-center justify-center">
                <div class="relative">
                    <img src="@/assets/images/robot.png" alt="Right Image" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Button of using AI -->
            <div class="absolute left-2 top-3/4 mt-12 transform -translate-y-1/2 w-[512px] h-[256px] flex items-center justify-center">
                <div class="flex flex-col gap-6">
                    <div class="flex flex-col text-black text-2xl font-extrabold mb-2">
                        <span>
                            هوش مصنوعی گلبرگ
                        </span>
                        <span>
                            برای تشخیص بیماری گیاهان
                        </span>
                    </div>
                    <Button class="bg-green-600 cursor-pointer w-fit hover:bg-green-800 text-white px-12 py-6 rounded-lg shadow-lg transition duration-300">
                        <span class="text-white text-lg font-semibold">
                            شروع کن
                        </span>
                    </Button>
                </div>
            </div>
        </div>

        <!-- Mobile/Tablet Layout -->
        <div class="lg:hidden relative z-10 min-h-screen flex flex-col justify-center p-4 space-y-8">
            
            <!-- Top container -->
            <div class="w-full max-w-sm mx-auto">
                <div class="relative aspect-[2/1] w-full">
                    <img src="@/assets/images/curvy_container_2.png" alt="Left Image" class="w-full h-full object-cover rounded-lg" />
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <span class="text-black text-sm md:text-base">
                            با راه حل های گلبرگ
                        </span>
                        <span class="text-black text-base md:text-xl font-extrabold mt-1">
                            گیاهت را به زندگی برگردون
                        </span>
                    </div>
                </div>
            </div>

            <!-- Middle container -->
            <div class="w-full max-w-sm mx-auto">
                <div class="relative aspect-[2/1] w-full">
                    <img src="@/assets/images/curvy_container_1.png" alt="Right Image" class="w-full h-full object-cover rounded-lg" />
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-1">
                        <span class="text-black text-xs md:text-sm">
                            یک عکس از گیاه که درگیر بیماری شده را آپلود کن
                        </span>
                        <span class="text-black text-base md:text-xl font-extrabold">
                            تا معجزه رو ببینی
                        </span>
                    </div>
                </div>
            </div>

            <!-- Robot image -->
            <div class="w-full max-w-xs mx-auto">
                <div class="relative aspect-[2/1] w-full">
                    <img src="@/assets/images/robot.png" alt="Robot" class="w-full h-full object-contain" />
                </div>
            </div>

            <!-- AI Button section -->
            <div class="w-full max-w-sm mx-auto">
                <div class="flex flex-col gap-4 items-center text-center">
                    <div class="flex flex-col text-black">
                        <span class="text-lg md:text-xl font-extrabold">
                            هوش مصنوعی گلبرگ
                        </span>
                        <span class="text-lg md:text-xl font-extrabold">
                            برای تشخیص بیماری گیاهان
                        </span>
                    </div>
                    
                    <NuxtLink to="/golbarg-ai" class="bg-green-600 cursor-pointer hover:bg-green-800 text-white px-8 py-4 md:px-10 md:py-5 rounded-lg shadow-lg transition duration-300 w-full max-w-xs">
                            <span class="text-white text-base md:text-lg font-semibold">
                                شروع کن
                            </span>
                    </NuxtLink>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">


</script>