<script setup lang="ts">
import ButtonPopup from '@/components/ui/button-popup/ButtonPopup.vue'
import AddButton from '@/components/ui/button/add/AddButton.vue'
import List from '@/components/ui/list/List.vue'
import Button from '@/components/ui/button/Button.vue'
import { useApplicationStore } from '@/stores/app.store.ts'
import { useRoute } from 'vue-router'

const applicationStore = useApplicationStore()
const projectId = +useRoute().params.id
const actions = [
  {
    id: 1,
    title: 'Создать таблицу',
    onClick: () => {
      applicationStore
        .getModal('create-table')
        ?.setSettings({
          projectId: projectId,
        })
        .onShow()
    },
  },
]
</script>

<template>
  <ButtonPopup popup-position="top-left" class="feature">
    <template #popup>
      <List :column-space="10">
        <Button
          v-for="action in actions"
          :key="action.id"
          variant="secondary"
          @on-click="action.onClick"
        >
          {{ action.title }}
        </Button>
      </List>
    </template>
    <template #button>
      <AddButton :is-loading="false" />
    </template>
  </ButtonPopup>
</template>

<style scoped lang="scss">
.feature {
  max-width: 50px;
  color: var(--fourth-color);

  :deep(.popup) {
    width: 180px;
  }
}
</style>
