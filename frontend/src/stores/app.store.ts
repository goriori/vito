import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { Modal } from '@/entities/modal/index.ts'
import { Alert } from '@/entities/modal/alert/index.ts'
import TestModal from '@/components/globals/modals/test-modal/TestModal.vue'
import ErrorAlert from '@/components/globals/alerts/error-alert/ErrorAlert.vue'
import SuccessAlert from '@/components/globals/alerts/success-alert/SuccessAlert.vue'

export const useApplicationStore = defineStore('application', () => {
  const isLoading = ref(false)

  const modals = ref<Modal[]>([
    new Modal('get-data-modal', shallowRef(TestModal)),
  ])
  const alerts = ref<Alert[]>([
    new Alert('error', shallowRef(ErrorAlert)),
    new Alert('success', shallowRef(SuccessAlert)),
  ])
  const getModals = () => modals.value
  const getAlerts = () => alerts.value
  const getAlert = (name: string) => {
    const alert = alerts.value.find((alert) => alert.getName() === name)
    if (alert) return alert
  }
  const getModal = (name: string) => {
    const modal = modals.value.find((modal) => modal.getName() === name)
    if (modal) return modal
  }

  const getStateLoadingApplication = () => isLoading.value

  const toggleStateLoadingApplication = () =>
    (isLoading.value = !isLoading.value)

  return {
    getModals,
    getModal,
    getAlerts,
    getAlert,
    getStateLoadingApplication,
    toggleStateLoadingApplication,
  }
})
