<script setup lang="ts">
import { useSessionStore } from '@/stores/session.store.ts'
import { Member } from '@/entities/member/index.ts'
import Chip from '@/components/ui/chip/Chip.vue'
import PersonList from '@/components/ui/list/person-list/PersonList.vue'
import AddProjectMemberFeature from '@/features/add-project-member/AddProjectMemberFeature.vue'
import { ref } from 'vue'

type PProps = {
  name: string
  type: string
  address: string
  status: string
  description: string
  members: Member[]
  expenses: number
}
defineProps<PProps>()
const sessionStore = useSessionStore()
const role = ref(sessionStore.getSession()?.role.name)
</script>

<template>
  <div class="info">
    <div class="info-top">
      <div class="info-title">
        <h1 class="title">{{ name }}</h1>
        <p class="address">{{ address }}</p>
      </div>
      <div class="info-statuses">
        <Chip rounded variant="secondary" class="status">{{ type }}</Chip>
        <Chip rounded variant="secondary" class="status">{{ status }}</Chip>
      </div>
    </div>
    <div class="info-center">
      <div class="members">
        <h2>Состав</h2>
        <div class="members-list">
          <PersonList :members="members" />
          <AddProjectMemberFeature v-if="role === 'director'" />
          <p v-if="members && members.length === 0">Состав не сформирован</p>
        </div>
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="info-bottom">
      <h2>Затрачено: {{ expenses }} Р</h2>
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

  &-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  &-statuses {
    display: flex;
    justify-content: center;
    flex: 0 1 200px;
    gap: var(--space-sm);

    .status {
      flex: 0 1 150px;
    }
  }

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

  &-title {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);

    .address {
      font-size: var(--secondary-font-size);
    }
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
    gap: var(--space-sm);
  }
}
</style>
