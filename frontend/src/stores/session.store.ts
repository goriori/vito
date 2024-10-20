import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Session } from '@/entities/session/index.ts'

export const useSessionStore = defineStore('session', () => {
  const session = ref<Session | null>(null)

  const setSession = (newSession: Session | null) =>
    (session.value = newSession)
  const getSession = () => session.value
  return {
    session,
    setSession,
    getSession,
  }
})
