<template>
  <div class="min-h-screen bg-gradient-to-br from-green-900 via-green-900 to-green-900 flex items-center justify-center p-4" dir="rtl">
    <div class="w-full max-w-md">
      <!-- Logo/Brand Section -->
      <div class="irSans text-center mb-8">
        <div class="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-white mb-2">پنل مدیریت</h1>
        <p class="text-gray-300">به پنل مدیریت خوش آمدید</p>
      </div>

      <!-- Login Form -->
      <div class="bg-white/10 irSans backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div class="space-y-2">
            <label for="username" class="block text-sm font-medium text-white">
              نام کاربری
            </label>
            <div class="relative">
              <input
                id="username"
                v-model="loginForm.username"
                type="text"
                required
                class="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                placeholder="نام کاربری خود را وارد کنید"
                :disabled="isLoading"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2">
            <label for="password" class="block text-sm font-medium text-white">
              کلمه عبور
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="w-full px-4 py-3 pr-12 pl-12 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
                placeholder="کلمه عبور خود را وارد کنید"
                :disabled="isLoading"
              />
              <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-300 hover:text-white transition-colors"
                :disabled="isLoading"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
            <p class="text-red-200 text-sm text-center">{{ errorMessage }}</p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div v-if="isLoading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              در حال ورود...
            </div>
            <span v-else>ورود به پنل</span>
          </button>
        </form>

        <!-- Footer -->
        <div class="mt-6 text-center">
          <p class="text-xs text-gray-400">
            © ۱۴۰۳ تمامی حقوق محفوظ است
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LoginForm {
  username: string
  password: string
}

// Reactive state
const loginForm = ref<LoginForm>({
  username: '',
  password: '',
})

const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

// const adminToken = useCookie('adminToken')


// Login handler
// const handleLogin = async () => {
//   errorMessage.value = ''
//   isLoading.value = true

//   try {
//     // Validate form
//     if (!loginForm.value.username.trim()) {
//       throw new Error('نام کاربری الزامی است')
//     }
    
//     if (!loginForm.value.password.trim()) {
//       throw new Error('کلمه عبور الزامی است')
//     }

//     interface AdminLoginResponse {
//       status: string
//       message: string
//       data?: {
//         token: string
//       }
//     }

//     const response = await $fetch<AdminLoginResponse>('/api/admin', {
//       method: 'POST',
//       body: {
//         username: loginForm.value.username,
//         password: loginForm.value.password,
//       }
//     })

//     if (response.status === 'success' && response.data && response.data.token) {
//       adminToken.value = response.data.token // Store token in cookie
//       await navigateTo('/admin')
//     } else {
//       throw new Error('نام کاربری یا کلمه عبور اشتباه است')
//     }
//   } catch (error) {
//     errorMessage.value = error instanceof Error ? error.message : 'خطا در ورود به سیستم'
//   } finally {
//     isLoading.value = false
//   }
// }

// Clear error message when user starts typing
watch([() => loginForm.value.username, () => loginForm.value.password], () => {
  if (errorMessage.value) {
    errorMessage.value = ''
  }
})
</script>

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

/* Custom styles for Persian/RTL support */
input::placeholder {
  text-align: right;
}

/* Ensure proper RTL layout */
[dir="rtl"] {
  font-family: 'Vazir', 'Tahoma', sans-serif;
}

/* Custom focus styles */
.focus-visible\:ring-offset-gray-900:focus-visible {
  --tw-ring-offset-color: #111827;
}

/* Smooth transitions */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}
</style>