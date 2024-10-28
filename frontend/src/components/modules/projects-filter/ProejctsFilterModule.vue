<script setup lang="ts">
import Input from '@/components/ui/inputs/Input.vue'
import Button from '@/components/ui/button/Button.vue'
import Form from '@/components/ui/form/Form.vue'
import Select from '@/components/ui/selects/Select.vue'
</script>

<template>
  <section class="module">
    <Form class="form flex row gap-1">
      <Select
        :titles="[
          'Расчет',
          'Согласование',
          'Закупка',
          'Начало',
          'Конец',
          'Сдача',
        ]"
      />
      <Select :titles="['Кровля', 'Фундамент', 'Доработка']" />
      <Select :titles="['Новые', 'Старые']" />
      <Input type="search" placeholder="Поиск проектов" class="search" />
      <Button type="button" variant="quaternary">Найти</Button>
    </Form>
  </section>
</template>

<style scoped lang="scss">
.module {
  width: 100%;
}

.form {
  padding: 0;
}

.search {
  width: 100%;
  max-width: 300px;
}
</style>
