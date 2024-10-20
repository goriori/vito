<script setup lang="ts">
import { onMounted } from 'vue'
import { DeviceSize, useSizeWindow } from '@/utils/useSizeWindow.ts'
import { Project } from '@/entities/project/index.ts'
import ProjectCard from '@/components/ui/cards/project-card/ProjectCard.vue'
import List from '@/components/ui/list/List.vue'
import ProjectMobileCard from '@/components/ui/cards/project-card/ProjectMobileCard.vue'

type LProps = {
  projects: Project[]
}
type LEmits = {
  (_eventName: 'onTargetCard', _card: Project): void
}
const props = defineProps<LProps>()
const emits = defineEmits<LEmits>()
const { deviceSize } = useSizeWindow()

const onTargetCard = (event: PointerEvent) => {
  const element = event.target as HTMLElement
  if (!element) return false
  const targetProjectId = element.offsetParent?.dataset.id
  if (targetProjectId) {
    const findProjectById = (project: Project) => project.id == targetProjectId
    const project = props.projects.find(findProjectById)
    if (project) emits('onTargetCard', project)
  }
}

onMounted(() => console.log(deviceSize.value))
</script>

<template>
  <template v-if="deviceSize === DeviceSize.DESKTOP">
    <List :column-space="10" :columns="3" @click="onTargetCard">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.name"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.type"
        class="item"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.LAPTOP">
    <List :column-space="10" :columns="3" @click="onTargetCard">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.name"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.type"
        class="item"
      />
    </List>
  </template>

  <template v-else-if="deviceSize === DeviceSize.TABLET">
    <List :column-space="10" :columns="2" @click="onTargetCard">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.name"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.type"
        class="item"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.MOBILE">
    <List :column-space="10" :columns="2" @click="onTargetCard">
      <ProjectMobileCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.name"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.type"
        class="item"
      />
    </List>
  </template>
</template>

<style scoped lang="scss"></style>
