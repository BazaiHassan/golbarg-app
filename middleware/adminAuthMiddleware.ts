import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware(async (to, from) => {

  const token = useCookie('auth_token')


    if (!token) {
      toast.error('برای دسترسی به این صفحه باید وارد شوید.', {
        position: 'top-right',
        duration: 2000,
      })
      return navigateTo('/admin/login')
    }

    return navigateTo('/admin')
})