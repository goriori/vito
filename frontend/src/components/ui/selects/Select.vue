<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { IEmits, SList, SProps } from '@/components/ui/selects/types.ts'

const props = defineProps<SProps>()
const emits = defineEmits<IEmits>()
const list: Ref<SList[]> = ref([])
const targetElement: Ref<string | number> = ref('')

const initList = () => {
  list.value = props.titles.map((title, index) => {
    return {
      id: index + 1,
      title,
      value: title,
    }
  })
  targetElement.value = list.value[0].value
}

const onChange = (event: Event) => {
  targetElement.value = (event.target as HTMLSelectElement).value
  emits('update:modelValue', targetElement.value)
  emits('onChange', targetElement.value)
}
onMounted(() => {
  initList()
})
</script>

<template>
  <select class="select" @change="onChange">
    <option
      v-for="item in list"
      :key="item.id"
      :value="item.value"
      class="select-option"
    >
      {{ item.title }}
    </option>
  </select>
</template>

<style scoped>
.select {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid transparent;
  padding: 10px;

  &:focus {
    transition: var(--animation-time) all ease-in-out;
    border-color: var(--thrid-color);
    outline: none;
  }
}

.select-option {
  background-color: #dcdcdc;
}
</style>
