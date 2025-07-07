<script setup lang="ts">
import { ref } from 'vue'
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

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <div class="border-b w-full border-gray-200 pb-1 relative">
    <div class="w-full flex justify-center max-w-screen-xl mx-auto px-4">
      <!-- Desktop Navigation -->
      <NavigationMenu dir="rtl" class="font-sans w-full hidden lg:block">
        <NavigationMenuList class="gap-6 w-full justify-center">
          <!-- Home -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <NuxtLink to="/" class="block">
                <span class="irSans text-xl">
                  خانه
                </span>
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Plant Disease Detection -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <NuxtLink to="/golbarg-ai" class="block">
                <span class="irSans text-xl">
                  تشخیص بیماری گیاه
                </span>
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Accessories -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <NuxtLink to="#" class="block">
                <span class="irSans text-xl">
                  اکسسوری
                </span>
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Dish Garden & Terrarium -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <NuxtLink to="#" class="block">
                <span class="irSans text-xl">
                  دیش گاردن و تراریوم
                </span>
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <!-- Contact Us -->
          <NavigationMenuItem>
            <NavigationMenuLink class="px-4 py-2 hover:text-primary transition-colors">
              <NuxtLink to="#" class="block">
                <span class="irSans text-xl">
                  تماس با ما
                </span>
              </NuxtLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <!-- Mobile Navigation -->
      <div class="lg:hidden w-full flex justify-between items-center py-3">
        <!-- Logo/Brand (optional) -->
        <div class="flex-1">
          <!-- Add your logo here if needed -->
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMobileMenu"
          class="p-2 rounded-md hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
          :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <!-- Hamburger Icon -->
          <div class="w-6 h-6 flex flex-col justify-center items-center">
            <span
              class="block w-5 h-0.5 bg-gray-600 transform transition-all duration-300"
              :class="{
                'rotate-45 translate-y-1.5': isMobileMenuOpen,
                'rotate-0 translate-y-0': !isMobileMenuOpen
              }"
            ></span>
            <span
              class="block w-5 h-0.5 bg-gray-600 mt-1 transition-all duration-300"
              :class="{
                'opacity-0': isMobileMenuOpen,
                'opacity-100': !isMobileMenuOpen
              }"
            ></span>
            <span
              class="block w-5 h-0.5 bg-gray-600 mt-1 transform transition-all duration-300"
              :class="{
                '-rotate-45 -translate-y-1.5': isMobileMenuOpen,
                'rotate-0 translate-y-0': !isMobileMenuOpen
              }"
            ></span>
          </div>
        </button>
      </div>

      <!-- Mobile Menu Overlay -->
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        @click="closeMobileMenu"
      ></div>

      <!-- Mobile Menu Sidebar -->
      <div
        class="fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 lg:hidden"
        :class="{
          'translate-x-0': isMobileMenuOpen,
          'translate-x-full': !isMobileMenuOpen
        }"
      >
        <div class="p-4 border-b">
          <div class="flex justify-between items-center">
            <Logo />
            <button
              @click="closeMobileMenu"
              class="p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Close menu"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <nav class="p-4">
          <ul class="space-y-2 text-right">
            <li>
              <NuxtLink
                to="/"
                @click="closeMobileMenu"
                class="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span class="irSans text-lg">خانه</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="/golbarg-ai"
                @click="closeMobileMenu"
                class="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span class="irSans text-lg">تشخیص بیماری گیاه</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#"
                @click="closeMobileMenu"
                class="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span class="irSans text-lg">اکسسوری</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#"
                @click="closeMobileMenu"
                class="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span class="irSans text-lg">دیش گاردن و تراریوم</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink
                to="#"
                @click="closeMobileMenu"
                class="block px-4 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                <span class="irSans text-lg">تماس با ما</span>
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
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

/* Additional responsive styles */
@media (max-width: 1023px) {
  .navigation-menu-list {
    display: none;
  }
}

/* Smooth scrolling when menu items are clicked */
html {
  scroll-behavior: smooth;
}

/* Ensure mobile menu is above other content */
.mobile-menu-overlay {
  z-index: 40;
}

.mobile-menu-sidebar {
  z-index: 50;
}
</style>