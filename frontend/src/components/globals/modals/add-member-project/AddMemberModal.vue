<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted, ref } from 'vue'
import { useListStore } from '@/stores/list.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Project } from '@/entities/project/index.ts'
import { Member } from '@/entities/member/index.ts'
import { Session } from '@/entities/session/index.ts'
import { UserServer } from '@/services/users/types.ts'
import { MemberUserAdapter } from '@/adapter/member/index.ts'
import UserService from '@/services/users/index.ts'
import ProjectService from '@/services/projects/index.ts'
import Modal from '@/components/ui/modal/Modal.vue'
import UserList from '@/components/ui/list/user-list/UserList.vue'
import CircleSpinner from '@/components/ui/spiners/CircleSpinner.vue'

type MEmits = {
  (_eventName: 'onClose'): void
}
const emits = defineEmits<MEmits>()
const listStore = useListStore()
const sessionStore = useSessionStore()
const onClose = () => emits('onClose')
const users = ref<UserServer[]>([])
const isLoading = ref(false)
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

const addUserToProject = async (user: UserServer) => {
  const TIME_LOAD = 4000
  toggleLoadState()
  const findProject = (project: Project) => project.id == projectId.value
  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission('jwt')
  if (!jwtToken) return false
  const project = listStore.getList('projects').find(findProject) as Project
  const newMember = new MemberUserAdapter(user).adapt()
  const members = project.getMembers().map((member) => member.id)
  const payloadUpdate = {
    data: {
      members: [...members, newMember],
    },
  }
  ProjectService.updateProject(projectId.value, payloadUpdate, jwtToken.value).then(() => {
    setTimeout(() => {
      toggleLoadState()
      project.addMember(newMember)
      users.value = getUserList()
    }, TIME_LOAD)
  })
}
const toggleLoadState = () => (isLoading.value = !isLoading.value)
const clearUserList = () => {
  listStore.clearList('users')
}
onMounted(async () => {
  await loadUsers()
  users.value = getUserList()
})
onUnmounted(() => {
  clearUserList()
})
</script>

<template>
  <Modal @on-click-background="onClose">
    <template #window>
      <div class="window flex column gap-3">
        <h2 class="window-title">Выберите пользователя которого хотите добавить</h2>
        <section class="list">
          <CircleSpinner v-if="isLoading" class="list-loader" />
          <UserList v-else :users="users" @on-target="addUserToProject" />
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
  padding: var(--space-xl);
  background-color: var(--secondary-color);
  color: var(--fourth-color);
}

.list {
  max-height: 500px;
  overflow-y: auto;
  @include no-scroll();

  &-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }
}
</style>
