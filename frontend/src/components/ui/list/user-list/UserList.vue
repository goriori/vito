<script setup lang="ts">
import List from '@/components/ui/list/List.vue'
import UserCard from '@/components/ui/cards/user-card/UserCard.vue'
import { UserServer } from '@/services/users/types.ts'

type LProps = {
  users: UserServer[]
}
type LEmits = {
  (_eventName: 'onTarget', _user: UserServer): void
}
defineProps<LProps>()
const emits = defineEmits<LEmits>()
const onTarget = (user: UserServer) => {
  emits('onTarget', user)
}
</script>

<template>
  <List :column-space="10" class="list">
    <template v-if="users.length > 0">
      <UserCard
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :username="user.username"
        :avatar="user.avatar?.url"
        :skills="user.skills"
        @click="onTarget(user)"
      />
    </template>
    <template v-else>Список пуст</template>
  </List>
</template>

<style scoped lang="scss">
.list {
  color:var(--fourth-color)
}
</style>
