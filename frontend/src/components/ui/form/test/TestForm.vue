<script setup lang="ts">
import Form from '@/components/ui/form/Form.vue'
import Input from '@/components/ui/inputs/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import { ref, useId } from 'vue'

const form = ref({
  email: {
    id: useId(),
    value: '',
  },
  password: {
    id: useId(),
    value: '',
  },
})

const onSubmit = (fields: HTMLInputElement[]) => {
  console.log(fields)
}
</script>

<template>
  <Form no-validate @on-submit="onSubmit">
    <Input
      v-model="form.email.value"
      type="email"
      placeholder="Введите почту"
      required
    />
    <Input
      v-model="form.email.value"
      type="email"
      placeholder="Введите почту"
      required
    />
    <Input
      v-model="form.password.value"
      type="password"
      placeholder="Введите пароль"
      required
    />
    <Button background="secondary" title="Отправить" />
  </Form>
</template>

<style scoped lang="scss"></style>
