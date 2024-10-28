<script setup lang="ts">
import { ref } from 'vue'
import { LProps } from '@/components/ui/list/types.ts'

const props = defineProps<LProps>()
const templateColumns = ref(
  `repeat(${props.columns},${
    props.columnWidth ? props.columnWidth + 'px' : '1fr'
  } )`
)
const columnSpace = ref(`${props.columnSpace}px`)
</script>

<template>
  <div class="list" :style="{ gridTemplateColumns: columns }">
    <slot />
  </div>
</template>

<style scoped lang="scss">
.list {
  width: 100%;
  display: grid;
  grid-template-columns: v-bind(templateColumns);
  gap: v-bind(columnSpace);
}
</style>
