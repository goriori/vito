import { useRoute, useRouter } from 'vue-router'

export const useInactivity = (TIME_SECONDS: number) => {
  const TIME_SECONDS_START = 0
  const TIME_MS_INTERVAL_TIMER = 1000
  const route = useRoute()
  const router = useRouter()
  let intervalId: number | undefined = undefined
  let time = TIME_SECONDS_START

  const clearInactiveTime = () => clearInterval(intervalId)

  const inactivityTime = () => {
    const resetTimer = () => {
      time = TIME_SECONDS_START
    }

    intervalId = setInterval(() => {
      const timeout = TIME_SECONDS
      time++
      console.log(time)
      if (time >= timeout) {
        resetTimer()
        if (route.name !== 'home') {
          router.push({ name: 'home' })
        }
      }
    }, TIME_MS_INTERVAL_TIMER)

    // сюда можно добавить любой ивент.
    document.addEventListener('mousemove', resetTimer)
    document.addEventListener('keypress', resetTimer)
    document.addEventListener('touch', resetTimer)
  }

  return { inactivityTime, clearInactiveTime }
}
