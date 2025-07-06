import { toast } from "vue-sonner"

export default defineNuxtRouteMiddleware((to, from) => {
  const checkUserLogin = useCookie('token')

  if (!checkUserLogin.value) {
    toast.error('برای دسترسی به این صفحه باید وارد شوید.', {
      position: 'top-right',
      duration: 2000,
    })
      return navigateTo('/')
  }
})