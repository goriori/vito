<script setup lang="ts">
import ProjectCard from '@/components/ui/cards/project-card/ProjectCard.vue'
import List from '@/components/ui/list/List.vue'
import { DeviceSize, useSizeWindow } from '@/utils/useSizeWindow.ts'

type LProps = {
  projects: object[]
}
type LEmits = {
  (eventName: 'onTargetCard', card: object): void
}
const props = defineProps<LProps>()
const emits = defineEmits<LEmits>()
const { deviceSize } = useSizeWindow()
const onTargetCard = (event: PointerEvent) => {
  const targetProjectId = (event.target as HTMLElement).offsetParent?.dataset.id
  if (targetProjectId) {
    const findProjectById = (project: object) => project.id == targetProjectId
    const project = props.projects.find(findProjectById)
    if (project) emits('onTargetCard', project)
  }
}
</script>

<template>
  <template v-if="deviceSize === DeviceSize.DESKTOP">
    <List
      :column-space="10"
      :column-width="400"
      :columns="4"
      @click="onTargetCard"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.projectName"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.projectType"
        class="item"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.LAPTOP">
    <List
      :column-space="10"
      :column-width="500"
      :columns="3"
      @click="onTargetCard"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.projectName"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.projectType"
        class="item"
      />
    </List>
  </template>

  <template v-else-if="deviceSize === DeviceSize.TABLET">
    <List
      :column-space="10"
      :column-width="400"
      :columns="2"
      @click="onTargetCard"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.projectName"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.projectType"
        class="item"
      />
    </List>
  </template>
  <template v-else-if="deviceSize === DeviceSize.MOBILE">
    <List
      :column-space="10"
      :column-width="350"
      :columns="1"
      @click="onTargetCard"
    >
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :data-id="project.id"
        :title="project.projectName"
        :address="project.address"
        :preview="project?.preview"
        :status="project.status"
        :type="project?.projectType"
        class="item"
      />
    </List>
  </template>
</template>

<style scoped lang="scss"></style>
