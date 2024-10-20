<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import { onMounted, ref } from 'vue'
import { generateRandomId } from '@/utils/helpers/generateRandomId.ts'

type PProps = {
  numbers: number
  targetNumber?: number | string
}
type PEmits = {
  (_eventName: 'onClick', _item: Item | null): void
}

type Item = { id: number; value: number; isActive: boolean }
const props = defineProps<PProps>()
const emits = defineEmits<PEmits>()

const items = ref<Item[]>([])

const initNumbers = () => {
  for (let i = 1; i <= props.numbers; i++) {
    items.value.push({
      id: generateRandomId(),
      value: i,
      isActive: false,
    })
  }
}

const loadActiveNumber = () => {
  const activeNumber = props.targetNumber
  if (activeNumber) {
    const item = items.value.find((item) => item.value == activeNumber)
    if (item) item.isActive = true
  }
}

const onClickNumber = (event: MouseEvent) => {
  const { id } = (event.target as HTMLButtonElement).dataset
  if (id) {
    const item = items.value.find((item) => item.id == +id)
    if (item) item.isActive = true
    emits('onClick', item || null)
  }
}

onMounted(() => {
  initNumbers()
  loadActiveNumber()
})
</script>

<template>
  <article class="pagination">
    <div class="pagination-numbers" @click="onClickNumber">
      <Button
        v-for="item in items"
        :key="item.id"
        :data-id="item.id"
        :variant="item.isActive ? 'tertiary' : 'secondary'"
        class="number"
        >{{ item.value }}
      </Button>
    </div>
  </article>
</template>

<style scoped lang="scss">
@import '@/assets/scss/mixins';

.pagination {
  width: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--fourth-color);
  padding: var(--space-md);

  &-numbers {
    display: flex;
    align-items: center;
    gap: var(--space-md);
    overflow: auto;
    @include no-scroll();

    .number {
      flex: 1 0 50px;
      border-radius: var(--radius-md);
    }
  }
}
</style>
