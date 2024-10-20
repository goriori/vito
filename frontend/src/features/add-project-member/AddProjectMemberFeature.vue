<script setup lang="ts">
import UsersButtonPopup from '@/components/ui/button-popup/users/UsersButtonPopup.vue'
import { onMounted, ref } from 'vue'
import { useListStore } from '@/stores/list.store.ts'
import { UserServer } from '@/services/users/types.ts'
import UserService from '@/services/users/index.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { useRoute } from 'vue-router'
import { Project } from '@/entities/project/index.ts'

const listStore = useListStore()
const sessionStore = useSessionStore()
const users = ref<UserServer[]>([])
const projectId = ref(+useRoute().params.id)
const isLoading = ref(false)

const loadUsers = async () => {
  const jwtToken = sessionStore
    .getSession()
    ?.tokens.find((token) => token.type === 'jwt')
  if (jwtToken) {
    const userData = await UserService.getUsers(jwtToken.value)
    userData.forEach((user) => listStore.addItemToList('users', user))
    users.value = listStore.getList('users') as UserServer[]
  }
}

const toggleLoadState = () => (isLoading.value = !isLoading.value)

const addUserToProject = (user: UserServer) => {
  console.log(user)
  const TIME_LOAD = 4000
  toggleLoadState()
  const findProject = (project) => project.id == projectId.value
  const project = listStore.getList('projects').find(findProject) as Project
  project.addMember(user)
  setTimeout(toggleLoadState, TIME_LOAD)
}

onMounted(async () => {
  const userList = listStore.getList('users')
  if (userList.length === 0) await loadUsers()
  else users.value = listStore.getList('users') as UserServer[]
})
</script>

<template>
  <UsersButtonPopup
    :users="users"
    :is-loading="isLoading"
    class="feature"
    @on-target="addUserToProject"
  />
</template>

<style scoped lang="scss"></style>
