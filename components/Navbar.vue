<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from '@/components/ui/navigation-menu'
</script>

<template>
  <div class="border-b w-full border-gray-200 pb-1">
    <div class="w-full flex justify-center max-w-screen-xl mx-auto px-4">
      <NavigationMenu dir="rtl" class="font-sans w-full">
        <NavigationMenuList class="gap-6 w-full justify-center">
          <!-- Home -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <span class="irSans text-xl">
                خانه
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Plant Disease Detection -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <NuxtLink to="#">
                <span class="irSans text-xl">
                  تشخیص بیماری گیاه
                </span>
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Accessories -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <span class="irSans text-xl">
                اکسسوری
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Dish Garden & Terrarium -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <span class="irSans text-xl">
                دیش گاردن و تراریوم
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Contact Us -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <span class="irSans text-xl">
                تماس با ما
              </span>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </div>
</template>

<style scoped>
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