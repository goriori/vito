<script setup lang="ts">
import ButtonPopup from '@/components/ui/button-popup/ButtonPopup.vue'
import DotsIcon from '@/components/ui/icons/DotsIcon.vue'
import List from '@/components/ui/list/List.vue'

type BProps = {
  actions: object[]
}

defineProps<BProps>()
</script>

<template>
  <ButtonPopup popup-position="top">
    <template #popup>
      <List :column-space="10">
        <component
          :is="action"
          v-for="action in actions"
          :key="action"
          :projectId="1"
        />
      </List>
    </template>
    <template #button>
      <DotsIcon class="icon" />
    </template>
  </ButtonPopup>
</template>

<style scoped lang="scss">
:deep(.button) {
  max-width: 50px;
}

.icon {
  max-height: 20px;
  color: var(--thrid-color);
}
</style>
