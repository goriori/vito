<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import { Member } from '@/entities/member'
import Image from '@/components/ui/image/Image.vue'

type MProps = {
  member: Member
}
type MEmits = {
  (_eventName: 'onClose'): void
}
const emits = defineEmits<MEmits>()
const props = defineProps<MProps>()
const apiUrl = window.API
const onClose = () => emits('onClose')
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window">
        <section class="window-left">
          <div class="avatar">
            <!--            <Image :href="apiUrl + member" />-->
          </div>
        </section>
        <section class="window-right flex column gap-3">
          <div class="field name">
            <strong>Имя</strong>
            <p>{{ member.name }} {{ member.surname }} {{ member.lastname }} ({{ member.username }})</p>
          </div>
          <div class="field email">
            <strong>Почта</strong>
            <p>{{ member.email }}</p>
          </div>
          <div class="field date-birth">
            <strong>Дата Рождения</strong>
            <p>{{ member.dateBirth }}</p>
          </div>
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
.window {
  border-radius: var(--radius-md);
  padding: var(--space-md);
  background-color: var(--secondary-color);
  color: var(--fourth-color);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
</style>
