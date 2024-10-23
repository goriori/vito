<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useListStore } from '@/stores/list.store.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { UserServer } from '@/services/users/types.ts'
import { Project } from '@/entities/project/index.ts'
import { TokenPermission } from '@/entities/session/types.ts'
import { MemberUserAdapter } from '@/adapter/member'
import UserService from '@/services/users/index.ts'
import ProjectService from '@/services/projects/index.ts'
import UsersButtonPopup from '@/components/ui/button-popup/users/UsersButtonPopup.vue'
import { Member } from '@/entities/member'

const listStore = useListStore()
const sessionStore = useSessionStore()

const users = computed(() => {
  const userList = listStore.getList('users')
  if (userList.length === 0) return loadUsers()
  else return getUsersNotInProjects()
})

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
    const findCurrentProject = (project: Project) => project.id === projectId.value
    const addUserToList = (user: UserServer) => listStore.addItemToList('users', user)
    const getMemberUsernames = (member: Member) => member.username
    const project = listStore.getList('projects').find(findCurrentProject) as Project
    const projectMemberUsernames = project.getMembers().map(getMemberUsernames)
    userData.forEach(addUserToList)
    return userData
      .map((user) => {
        const haveUserInProject = projectMemberUsernames.find((memberUsername) => memberUsername === user.username)
        if (!haveUserInProject) return user
        else return false
      })
      .filter((user) => user)
  }
}

const getUsersNotInProjects = () => {
  const userList = listStore.getList('users') as UserServer[]
  const findCurrentProject = (project: Project) => project.id === projectId.value
  const getMemberUsernames = (member: Member) => member.username
  const project = listStore.getList('projects').find(findCurrentProject) as Project
  const projectMemberUsernames = project.getMembers().map(getMemberUsernames)
  return userList
    .map((user) => {
      const haveUserInProject = projectMemberUsernames.find((memberUsername) => memberUsername === user.username)
      if (!haveUserInProject) return user
      else return false
    })
    .filter((user) => user)
}

const toggleLoadState = () => (isLoading.value = !isLoading.value)

const addUserToProject = async (user: UserServer) => {
  const TIME_LOAD = 4000
  toggleLoadState()
  const findProject = (project: Project) => project.id == projectId.value
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
      getUsersNotInProjects()
    }, TIME_LOAD)
  })
}

const clearUserList = () => {
  listStore.clearList('users')
}

onUnmounted(() => {
  clearUserList()
})
</script>

<template>
  <UsersButtonPopup :users="users" :is-loading="isLoading" class="feature" @on-target="addUserToProject" />
</template>

<style scoped lang="scss">
.feature {
  max-width: 50px;
  max-height: 38px;
}
</style>
