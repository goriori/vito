<script setup lang="ts">
import Input from '@/components/ui/inputs/Input.vue'
import Form from '@/components/ui/form/Form.vue'
import { FComponents } from '@/components/ui/form/types.ts'
import { ref } from 'vue'

defineProps<FComponents>()
const form = ref({
  login: '',
  password: '',
})

const clearForm = () => {
  console.log('success')
  form.value.login = ''
  form.value.password = ''
}
</script>

<template>
  <Form class="form">
    <p class="form-title">Авторизация</p>
    <Input
      v-model="form.login"
      outlined
      type="text"
      placeholder="Введите логин"
    />
    <Input
      v-model="form.password"
      outlined
      type="password"
      placeholder="Введите пароль"
    />
    <div class="form-actions">
      <component
        :is="action"
        v-for="action in actions"
        :key="action"
        v-bind="form"
        @on-success="clearForm"
      />
    </div>
  </Form>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  background-color: var(--fourth-color);

  &-title {
    text-align: center;
    font-weight: bold;
    font-size: 25px;
  }

  &-actions {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
  }
}
</style>
