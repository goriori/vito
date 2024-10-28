<script setup lang="ts">
import Form from '@/components/ui/form/Form.vue'
import { FComponents } from '@/components/ui/form/types.ts'
import Input from '@/components/ui/inputs/Input.vue'
import { onMounted, ref } from 'vue'

type FProps = FComponents & {
  projectId: number
  tableId: number
  fields: string[]
}
type FEmits = {
  (_eventName: 'onSuccess'): void
  (_eventName: 'onError'): void
}
type FormItem = { id: number; value: string; placeholder: string }
const props = defineProps<FProps>()
const emits = defineEmits<FEmits>()
const form = ref<FormItem[]>([])

const buildForm = () => {
  form.value = props.fields.map((field, index) => {
    return {
      id: index,
      value: '',
      placeholder: field,
    }
  })
}
const clearForm = () => {
  if (form.value) form.value = []
}

const onSuccess = () => {
  clearForm()
  emits('onSuccess')
}

const onError = () => {
  clearForm()
  emits('onError')
}
onMounted(() => {
  buildForm()
})
</script>

<template>
  <Form class="flex column gap-2">
    <Input
      v-for="field in form"
      :key="field.id"
      v-model="field.value"
      :placeholder="field.placeholder"
      type="text"
    />
    <div class="form-actions">
      <component
        :is="action"
        v-for="action in actions"
        :key="action"
        v-bind="{ form, projectId, tableId }"
        @on-success="onSuccess"
        @on-error="onError"
      />
    </div>
  </Form>
</template>

<style scoped lang="scss"></style>
