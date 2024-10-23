<script setup lang="ts">
import Modal from '@/components/ui/modal/Modal.vue'
import UserList from '@/components/ui/list/user-list/UserList.vue'
import { useListStore } from '@/stores/list.store.ts'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { TokenPermission } from '@/entities/session/types.ts'
import UserService from '@/services/users'
import { Project } from '@/entities/project'
import { UserServer } from '@/services/users/types.ts'
import { Member } from '@/entities/member'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session'

type MEmits = {
  (_eventName: 'onClose'): void
}
const emits = defineEmits<MEmits>()
const listStore = useListStore()
const sessionStore = useSessionStore()
const onClose = () => emits('onClose')
const users = ref<UserServer[]>([])

const projectId = ref(+useRoute().params.id)
const loadUsers = async () => {
  const addUserToList = (user: UserServer) => listStore.addItemToList('users', user)
  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission('jwt')
  if (!jwtToken?.value) return false
  const userData = await UserService.getUsers(jwtToken.value)
  userData.forEach(addUserToList)
}
const getUserList = () => {
  const findCurrentProject = (project: Project) => project.id === projectId.value
  const getMemberUsernames = (member: Member) => member.username
  const project = listStore.getList('projects').find(findCurrentProject) as Project
  const projectMemberUsernames = project.getMembers().map(getMemberUsernames)
  return listStore
    .getList('users')
    .map((user: UserServer) => {
      const haveUserInProject = projectMemberUsernames.find((memberUsername) => memberUsername === user.username)
      if (!haveUserInProject) return user
      else return false
    })
    .filter((user) => user) as UserServer[]
}

onMounted(async () => {
  await loadUsers()
  users.value = getUserList()
})
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window flex column gap-3">
        <h2 class="window-title">Выберите пользователя которого хотите добавить</h2>
        <section class="list">
          <UserList :users="users" />
        </section>
      </div>
    </template>
  </Modal>
</template>

<style scoped lang="scss">
@import '@/assets/scss/mixins';

.window {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-md);
  padding: var(--space-md);
  background-color: var(--secondary-color);
  color: var(--fourth-color);
}

.list {
  max-height: 500px;
  overflow-y: auto;
  @include no-scroll();
}
</style>
