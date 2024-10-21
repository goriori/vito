<script setup lang="ts">
import ButtonPopup from '@/components/ui/button-popup/ButtonPopup.vue'
import AddButton from '@/components/ui/button/add/AddButton.vue'
import UserList from '@/components/ui/list/user-list/UserList.vue'
import { UserServer } from '@/services/users/types.ts'

type BProps = {
  isLoading: boolean
  users: UserServer[]
}
type BEmits = {
  (_eventName: 'onTarget', _user: UserServer): void
}
defineProps<BProps>()
const emits = defineEmits<BEmits>()
const onTarget = (user: UserServer) => {
  emits('onTarget', user)
}
</script>

<template>
  <ButtonPopup class="users-button-popup">
    <template #popup>
      <UserList :users="users" class="list" @on-target="onTarget" />
    </template>
    <template #button>
      <AddButton :is-loading="isLoading" class="action" />
    </template>
  </ButtonPopup>
</template>

<style scoped lang="scss">
.users-button-popup {
  .list {
    max-width: 400px;
  }
}

::v-deep(.button),
.action {
  max-width: 50px;
}
::v-deep(.popup) {
  width: 400px;
}
</style>
