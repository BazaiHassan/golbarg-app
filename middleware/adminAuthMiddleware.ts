import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware(async (to, from) => {

  const token = localStorage.getItem('auth_token')


    if (!token) {
      toast.error('crush برای دسترسی به این صفحه باید وارد شوید.', {
        position: 'top-right',
        duration: 2000,
      })
      return navigateTo('/admin/login')
    }

    try {
      // Verify token by making a request to a protected endpoint
      const response = await $fetch<{ status: string }>('/api/verify-token', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.status !== 'success') {
        localStorage.removeItem('auth_token')
        toast.error('توکن نامعتبر است. لطفاً دوباره وارد شوید.', {
          position: 'top-right',
          duration: 2000,
        })
        return navigateTo('/admin/login')
      }
    } catch (error) {
      localStorage.removeItem('auth_token')
      toast.error('خطایی در اعتبارسنجی رخ داد. لطفاً دوباره وارد شوید.', {
        position: 'top-right',
        duration: 2000,
      })
      return navigateTo('/admin/login')
    }
})