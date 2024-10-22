<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted } from 'vue'
import { useOnlineStatus } from '@/utils/useOnlineStatus.ts'
import { useApplicationStore } from '@/stores/app.store.ts'
import Alerts from '@/components/globals/alerts/Alerts.vue'
import Modals from '@/components/globals/modals/Modals.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import SessionLayout from '@/layouts/SessionLayout.vue'
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'
import LoaderModule from '@/components/modules/loader/LoaderModule.vue'

const route = useRoute()
const applicationStore = useApplicationStore()

const layout = computed(() => {
  const layouts = {
    default: DefaultLayout,
    session: SessionLayout,
  }
  const metaLayout = route.meta.layout
  if (!metaLayout) return layouts.default
  else return layouts[metaLayout]
})

onMounted(() => {
  const { isOnline } = useOnlineStatus()
  if (!isOnline.value) applicationStore.getAlert('error')?.setSettings({ message: 'Отсутствует интернет соединение' }).onShow()
})
</script>

<template>
  <RouterView v-slot="{ Component }">
    <Alerts />
    <Modals />
    <LoaderModule v-if="applicationStore.getStateLoadingApplication()" />
    <template v-if="Component">
      <transition name="fade" mode="out-in">
        <suspense>
          <component :is="layout">
            <component :is="Component" :key="route.fullPath"></component>
          </component>
        </suspense>
      </transition>
    </template>
  </RouterView>
</template>

<style scoped></style>
