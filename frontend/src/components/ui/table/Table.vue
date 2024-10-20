<script setup lang="ts">
import { computed } from 'vue'
import { TEmits, TProps } from '@/components/ui/table/types.ts'

const emits = defineEmits<TEmits>()
const props = defineProps<TProps>()
const countColumns = computed(() => props.columns.length)
</script>

<template>
  <div class="table">
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
    grid-template-columns: repeat(v-bind(countColumns), 1fr);
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
  }

  &-columns {
    @media (max-width: $md4 + px) {
      font-size: 8px;
    }
  }

  &-row {
    color: var(--fourth-color);
    background-color: var(--secondary-color);
    @media (max-width: $md4 + px) {
      font-size: 10px;
    }
  }
}
</style>
