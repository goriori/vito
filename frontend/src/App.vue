<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useOnlineStatus } from '@/utils/useOnlineStatus.ts'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useInactivity } from '@/utils/useInactiveTime.ts'
import Alerts from '@/components/globals/alerts/Alerts.vue'
import Modals from '@/components/globals/modals/Modals.vue'

const INACTIVE_TIME = window.TIMEOUT
const route = useRoute()
const applicationStore = useApplicationStore()
const { inactivityTime } = useInactivity(INACTIVE_TIME)
onMounted(() => {
  inactivityTime()
  const { isOnline } = useOnlineStatus()
  if (!isOnline.value)
    applicationStore
      .getAlert('error')
      ?.setSettings({ message: 'Отсутствует интернет соединение' })
      .onShow()
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Alerts />
    <Modals />
    <template v-if="Component">
      <transition name="fade-page" mode="out-in">
        <suspense>
          <component :is="Component" :key="route.fullPath"></component>
        </suspense>
      </transition>
    </template>
  </RouterView>
</template>

<style scoped></style>
