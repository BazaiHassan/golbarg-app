export const useDialog = () => {
    const isOpen = ref(true)
    
    const openDialog = () => {
      isOpen.value = true
    }
    
    const closeDialog = () => {
      isOpen.value = false
    }
    
    return {
      isOpen: readonly(isOpen),
      openDialog,
      closeDialog
    }
  }