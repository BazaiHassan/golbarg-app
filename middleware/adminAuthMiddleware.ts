import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware(async (to, from) => {

  const token = useCookie('auth_token')


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
        token.value = ''

        toast.error('توکن نامعتبر است. لطفاً دوباره وارد شوید.', {
          position: 'top-right',
          duration: 2000,
        })
        return navigateTo('/admin/login')
      }
    } catch (error) {
      token.value = ''
      toast.error('خطایی در اعتبارسنجی رخ داد. لطفاً دوباره وارد شوید.', {
        position: 'top-right',
        duration: 2000,
      })
      return navigateTo('/admin/login')
    }
})