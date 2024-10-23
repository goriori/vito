<script setup lang="ts">
import { computed, onMounted, useTemplateRef } from 'vue'
import { TEmits, TProps } from '@/components/ui/table/types.ts'

const emits = defineEmits<TEmits>()
const props = defineProps<TProps>()
const tableElement = useTemplateRef<HTMLDivElement | null>('table')
const countColumns = computed(() => props.columns.length)
const widthColumn = computed(() => {
  if (tableElement.value?.offsetWidth) {
    return Math.round(tableElement.value?.offsetWidth / countColumns.value)
  }
})
const repeatValue = computed(() => `${countColumns.value}, ${widthColumn.value}px`)
onMounted(() => {})
</script>

<template>
  <div ref="table" class="table">
    <section class="table-header">
      <div class="table-columns">
        <p v-for="column in columns" :key="column">{{ column }}</p>
      </div>
    </section>
    <section class="table-body">
      <div v-for="(row, index) in rows" :key="index" class="table-row">
        <p v-for="item in row" :key="item">{{ item }}</p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/mixins';
@import '@/assets/scss/variables';

.table {
  border-radius: var(--radius-sm);
  padding: var(--space-sm);
  background-color: #fff;

  &-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &-body {
    display: flex;
    flex-direction: column;
    gap: 1px;
    max-height: 295px;
    overflow-y: auto;
    @include no-scroll();
  }

  &-columns,
  &-row {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(v-bind(repeatValue));
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
  }

  &-columns {
    @media (max-width: $md4 + px) {
      font-size: 8px;
    }
  }

  &-row {
    width: 100%;
    color: var(--fourth-color);
    background-color: var(--secondary-color);
    @media (max-width: $md4 + px) {
      font-size: 8px;
    }
  }
}
</style>
