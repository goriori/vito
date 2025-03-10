<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSessionStore } from '@/stores/session.store.ts'
import { Member } from '@/entities/member/index.ts'
import PersonList from '@/components/ui/list/member-list/MemberList.vue'
import AddProjectMemberFeature from '@/features/add-project-member/AddProjectMemberFeature.vue'
import ProjectTitle from '@/components/pages/project/project-info/ProjectTitle.vue'
import AddProjectMemberModalFeature from '@/features/add-project-member-modal/AddProjectMemberModalFeature.vue'
import { DeviceSize, useSizeWindow } from '@/utils/useSizeWindow.ts'
import MemberProjectEditListModule from '@/components/modules/list/member-project-edit/MemberProjectEditListModule.vue'
import DeleteProjectFeature from '@/features/delete-project/DeleteProjectFeature.vue'

type PProps = {
  id: number
  name: string
  type: string
  address: string
  status: string
  description: string
  members: Member[]
  expenses: number
}
const props = defineProps<PProps>()
const sessionStore = useSessionStore()
const { deviceSize } = useSizeWindow()
const members = computed(() => props.members)
const role = ref(sessionStore.getSession()?.role.name)
const isDirector = role.value === 'director'
</script>

<template>
  <div class="info">
    <ProjectTitle
      :address="address"
      :name="name"
      :type="type"
      :status="status"
    />
    <div class="info-center">
      <div class="members">
        <h2>Состав</h2>
        <div class="members-list">
          <MemberProjectEditListModule v-if="isDirector" :members="members" />
          <PersonList v-else :members="members" />
          <AddProjectMemberFeature
            v-if="isDirector && deviceSize > DeviceSize.MOBILE"
          />
          <AddProjectMemberModalFeature
            v-if="isDirector && deviceSize === DeviceSize.MOBILE"
          />
          <p v-if="members && members.length === 0">Состав не сформирован</p>
        </div>
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="info-bottom">
      <!--      <h2>Затрачено: {{ expenses }} Р</h2>-->
      <DeleteProjectFeature v-if="isDirector" :project-id="id" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.info {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: var(--radius-lg);
  padding: var(--space-md);
  background-color: var(--fourth-color);
  gap: var(--space-xs);

  &-center {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
  }

  &-bottom {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: var(--space-lg);
    font-size: var(--secondary-font-size);
  }

  &-center {
    .description {
      text-align: justify;
      line-height: normal;
    }
  }
}

.members {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  &-item {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  &-list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 800px;
    gap: var(--space-sm);
  }
}
</style>
