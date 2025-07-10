import { toast } from 'vue-sonner'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('auth_token')
  
  // If trying to access admin area without token
  if (to.path.startsWith('/admin') && !token.value) {
    if (to.path !== '/admin/login') {
      toast.error('برای دسترسی به این صفحه باید وارد شوید.', {
        position: 'top-right',
        duration: 2000,
      })
      return navigateTo('/admin/login')
    }
    // Allow access to login page
    return
  }
  
  // If already has token and trying to access login page, redirect to admin
  if (token.value && to.path === '/admin/login') {
    return navigateTo('/admin')
  }
  
  // For all other cases, continue
  return
})