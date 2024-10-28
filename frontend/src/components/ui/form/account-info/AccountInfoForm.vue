<script setup lang="ts">
import Input from '@/components/ui/inputs/Input.vue'
import Form from '@/components/ui/form/Form.vue'
import { ref } from 'vue'
import { generateRandomId } from '@/utils/helpers/generateRandomId.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import Button from '@/components/ui/button/Button.vue'

const sessionStore = useSessionStore()
const session = ref(sessionStore.getSession())
const fields = ref([
  {
    id: generateRandomId(),
    name: 'full_name',
    placeholder: 'ФИО',
    type: 'text',
    pattern: '',
    resolveChange: true,
    value: `${session.value?.name} ${session.value?.surname} ${session.value?.lastname}`,
  },
  {
    id: generateRandomId(),
    name: 'date_birth',
    placeholder: 'Дата рождения',
    type: 'date',
    pattern: '',
    resolveChange: true,
    value: session.value?.dateBirth,
  },
  {
    id: generateRandomId(),
    name: 'passport_number',
    placeholder: 'Номер паспорта',
    type: 'text',
    pattern: '',
    resolveChange: false,
    value: '1234567890',
  },
  {
    id: generateRandomId(),
    name: 'passport_output',
    placeholder: 'Кем выдан',
    type: 'text',
    pattern: '',
    resolveChange: false,
    value: 'Отдел УФМС по УР МВД России',
  },
  {
    id: generateRandomId(),
    name: 'role',
    placeholder: 'Должность',
    type: 'text',
    pattern: '',
    resolveChange: false,
    value: 'Директор',
  },
  {
    id: generateRandomId(),
    name: 'skills',
    placeholder: 'Специализация',
    type: 'text',
    pattern: '',
    resolveChange: false,
    value: session.value?.skills,
  },
])

const gridForm = ref([
  [fields.value[0], fields.value[1]],
  [fields.value[2], fields.value[3]],
  [fields.value[4]],
  [fields.value[5]],
])
</script>

<template>
  <Form class="info-form">
    <section v-for="gridFields in gridForm" class="row">
      <Input
        v-for="field in gridFields"
        :key="field.id"
        v-model="field.value"
        :pattern="field.pattern"
        :type="field.type"
        :placeholder="field.placeholder"
        :disabled="!field.resolveChange"
      />
    </section>
    <Button variant="secondary">Сохранить</Button>
  </Form>
</template>

<style scoped lang="scss">
.info {
  &-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
}

.row {
  display: flex;
  gap: var(--space-xl);
}
</style>
