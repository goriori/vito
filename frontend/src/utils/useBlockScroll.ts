import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

export const useBlockScroll = () => {
  const isScrollBlocked = ref(false)

  const blockScroll = () => {
    document.body.style.overflow = 'hidden' // Блокируем скролл
    isScrollBlocked.value = true // Показываем элемент
  }

  const unblockScroll = () => {
    document.body.style.overflow = '' // Разблокируем скролл
    isScrollBlocked.value = false // Скрываем элемент
  }

  onBeforeMount(() => {
    blockScroll()
  })

  onBeforeUnmount(() => {
    unblockScroll()
  })

  return { isScrollBlocked, blockScroll, unblockScroll }
}
