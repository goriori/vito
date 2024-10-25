<script setup lang="ts">
import ButtonPopup from '@/components/ui/button-popup/ButtonPopup.vue'
import AddButton from '@/components/ui/button/add/AddButton.vue'
import List from '@/components/ui/list/List.vue'
import Button from '@/components/ui/button/Button.vue'

const actions = [
  {
    id: 1,
    title: 'Создать таблицу',
    onClick: () => {},
  },
]
</script>

<template>
  <ButtonPopup popup-position="top-left" class="feature">
    <template #popup>
      <List :column-space="10">
        <Button v-for="action in actions" :key="action.id" variant="secondary">
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
