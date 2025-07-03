<script lang="ts" setup>

</script>

<template>
    <div class="flex flex-col md:flex-row w-full min-h-96 bg-[#BDE896]">
        <!-- Image section - half width -->
        <div class="flex-1 p-4 order-1 md:order-none">
            <img src="@/assets/images/terarium_pic.jpg" alt="Terrarium" class="w-full h-full object-cover rounded-lg" />
        </div>

        <!-- Text section - half width -->
        <div class="flex-1 flex flex-col justify-center items-center p-4 md:p-8 space-y-4 md:space-y-8 order-2 md:order-none">
            <div class="text-item text-item-1 h-86 w-full flex items-center justify-center">
                <p class="w-full rounded-lg text-green-700 text-lg md:text-4xl md:font-bold text-center">
                    تراریوم و دیش گاردن
                </p>
            </div>
            <div class="text-item text-item-2 flex flex-col w-full justify-center items-center h-64 md:p-8 rounded-lg text-green-700 text-lg md:text-2xl font-bold text-center">
                <span>  
                    طبیعت کوچک خودت رو
                </span>
                <div class="flex items-center justify-center gap-2 mt-4">
                    <span>
                        خلق کن
                    </span>
                    <img src="@/assets/images/icon_laugh.png" class="w-12 h-12" alt="">
                </div>

            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.text-item {
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    width: full;
}

.text-item-1 {
    background-image: url('@/assets/images/curvy_container_1.png');
}

.text-item-2 {
    background-image:url('@/assets/images/curvy_container_2.png');
}</style>