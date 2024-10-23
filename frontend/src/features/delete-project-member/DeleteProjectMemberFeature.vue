<script setup lang="ts">
import DeleteButton from '@/components/ui/button/delete/DeleteButton.vue'
import { useListStore } from '@/stores/list.store.ts'
import { Project } from '@/entities/project/index.ts'
import ProjectService from '@/services/projects/index.ts'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import { useApplicationStore } from '@/stores/app.store.ts'
import { SUCCESS_MESSAGES } from '@/utils/configs/success.config.ts'
import { ERROR_MESSAGES } from '@/utils/configs/errors.config.ts'
import { ref } from 'vue'

type Props = {
  memberId: number
  projectId: number
}
const props = defineProps<Props>()
const listStore = useListStore()
const sessionStore = useSessionStore()
const applicationStore = useApplicationStore()
const isLoading = ref(false)
const successHandler = () => {
  applicationStore.getAlert('success')?.setSettings(SUCCESS_MESSAGES.DELETE_MEMBER).onShow()
}
const errorHandler = () => {
  applicationStore.getAlert('success')?.setSettings(ERROR_MESSAGES.DELETE_MEMBER).onShow()
}
const toggleLoading = () => (isLoading.value = !isLoading.value)

const deleteMemberProject = () => {
  toggleLoading()
  const projectId = props.projectId
  const memberId = props.memberId
  const jwtToken = (sessionStore.getSession() as Session)?.getTokenPermission('jwt')
  if (!jwtToken) return
  const currentProject = listStore.getList('projects').find((project) => project.id == projectId) as Project
  const currentMemberIds = currentProject
    .deleteMember(memberId)
    .getMembers()
    .map((member) => member.id)
  const payload = {
    data: {
      members: currentMemberIds,
    },
  }
  ProjectService.updateProject(projectId, payload, jwtToken.value).then(successHandler).catch(errorHandler).finally(toggleLoading)
}
</script>

<template>
  <DeleteButton :is-loading="isLoading" class="feature" @click="deleteMemberProject" />
</template>

<style scoped lang="scss">
.feature {
  max-width: 50px;
  max-height: 38px;
}
</style>
