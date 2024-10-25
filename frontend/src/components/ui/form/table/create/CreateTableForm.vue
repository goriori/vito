<script setup lang="ts">
import { ref } from 'vue'
import { FComponents } from '@/components/ui/form/types.ts'
import Form from '@/components/ui/form/Form.vue'
import Input from '@/components/ui/inputs/Input.vue'

type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
const emits = defineEmits<FEmits>()
const props = defineProps<FComponents & { projectId?: number }>()
const form = ref({
  title: '',
  fields: '',
  projectId: props.projectId,
})

const clearForm = () => {
  form.value.title = ''
  form.value.fields = ''
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
  <Form class="flex column gap-3">
    <Input
      v-model="form.title"
      type="text"
      placeholder="Название таблицы"
      required
    />
    <Input
      v-model="form.fields"
      type="text"
      placeholder="Названия полей"
      required
    />
    <div class="form-actions">
      <component
        :is="action"
        v-for="action in actions"
        :key="action"
        v-bind="form"
        @on-success="onSuccess"
        @on-error="onError"
      />
    </div>
  </Form>
</template>

<style scoped lang="scss"></style>
