<script setup lang="ts">
import UsersButtonPopup from '@/components/ui/button-popup/users/UsersButtonPopup.vue'
import { computed, onMounted, ref } from 'vue'
import { useListStore } from '@/stores/list.store.ts'
import { UserServer } from '@/services/users/types.ts'
import UserService from '@/services/users/index.ts'
import ProjectService from '@/services/projects/index.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { useRoute } from 'vue-router'
import { Project } from '@/entities/project/index.ts'
import { TokenPermission } from '@/entities/session/types.ts'
import { MemberAdapter, MemberUserAdapter } from '@/adapter/member'
import { ProjectMember } from '@/services/projects/types.ts'

const listStore = useListStore()
const sessionStore = useSessionStore()

const users = ref<UserServer[]>([])
const projectId = ref(+useRoute().params.id)
const isLoading = ref(false)

const jwtToken = computed(() => {
  const findJwtToken = (token: TokenPermission) => token.type === 'jwt'
  const token = sessionStore.getSession()?.tokens.find(findJwtToken)
  if (!token) return ''
  return token.value
})

const loadUsers = async () => {
  if (jwtToken.value) {
    const userData = await UserService.getUsers(jwtToken.value)
    userData.forEach((user) => listStore.addItemToList('users', user))
    users.value = listStore.getList('users') as UserServer[]
  }
}

const toggleLoadState = () => (isLoading.value = !isLoading.value)

const addUserToProject = (user: UserServer) => {
  const TIME_LOAD = 4000
  toggleLoadState()
  const findProject = (project: Project) => project.id == projectId.value
  const project = listStore.getList('projects').find(findProject) as Project
  project.addMember(new MemberUserAdapter(user).adapt())
  const members = project.getMembers().map((member) => member.id)
  const payloadUpdate = {
    data: {
      members,
    },
  }
  ProjectService.updateProject(projectId.value, payloadUpdate, jwtToken.value)
  setTimeout(toggleLoadState, TIME_LOAD)
}

onMounted(async () => {
  const userList = listStore.getList('users')
  if (userList.length === 0) await loadUsers()
  else users.value = listStore.getList('users') as UserServer[]
})
</script>

<template>
  <UsersButtonPopup :users="users" :is-loading="isLoading" class="feature" @on-target="addUserToProject" />
</template>

<style scoped lang="scss"></style>
