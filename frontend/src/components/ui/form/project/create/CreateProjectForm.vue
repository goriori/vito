<script setup lang="ts">
import { ref } from 'vue'
import { FComponents } from '@/components/ui/form/types.ts'
import Form from '@/components/ui/form/Form.vue'
import Input from '@/components/ui/inputs/Input.vue'

type FProps = FComponents
type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
defineProps<FProps>()

const emits = defineEmits<FEmits>()
const form = ref({
  name: '',
  address: '',
  location: {
    x: 0,
    y: 0,
  },
  description: '',
})

const clearForm = () => {
  form.value.name = ''
  form.value.address = ''
  form.value.location = {
    x: 0,
    y: 0,
  }
  form.value.description = ''
}
const onSuccess = () => {
  clearForm()
  emits('onSuccess')
}
const onError = () => {
  clearForm()
  emits('onError')
}
</script>

<template>
  <Form class="flex column gap-1">
    <Input v-model="form.name" type="text" placeholder="Название проекта" />
    <Input v-model="form.address" type="text" placeholder="Адрес" />
    <div class="flex gap-1">
      <Input v-model="form.location.x" type="number" placeholder="Широта" />
      <Input v-model="form.location.y" type="number" placeholder="Долгота" />
    </div>
    <Input
      v-model="form.description"
      type="text"
      placeholder="Описание проекта"
    />
    <div class="form-actions">
      <component
        :is="action"
        v-for="action in actions"
        :key="action"
        v-bind="{ form }"
        @on-success="onSuccess"
        @on-error="onError"
      />
    </div>
  </Form>
</template>

<style scoped lang="scss"></style>
