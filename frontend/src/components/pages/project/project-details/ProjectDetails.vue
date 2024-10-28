<script setup lang="ts">
import Table from '@/components/ui/table/Table.vue'
import { ProjectTable } from '@/services/projects/types.ts'
import CreateProjectDetailsFeature from '@/features/create-project-details/CreateProjectDetailsFeature.vue'
import DeleteProjectTableFeature from '@/features/delete-project-table/DeleteProjectTableFeature.vue'
import AddTableItemFeature from '@/features/add-table-item-modal/AddTableItemModalFeature.vue'
import { useSessionStore } from '@/stores/session.store.ts'
import { ref } from 'vue'

type PProps = {
  projectId: number
  details: {
    tables: ProjectTable[]
  }
}
defineProps<PProps>()
const sessionStore = useSessionStore()
const role = ref(sessionStore.getSession()?.role.name)
</script>

<template>
  <div class="project-details">
    <div class="details-header flex a-i-center between">
      <h2 class="title">Детали проекта</h2>
      <CreateProjectDetailsFeature v-if="role === 'director'" />
    </div>
    <div v-if="details.tables" class="tables">
      <div v-for="table in details.tables" :key="table.id" class="table-item">
        <div class="item-head flex between a-i-center">
          <div></div>
          <h3>{{ table.attributes.title }}</h3>
          <div class="actions flex gap-1">
            <AddTableItemFeature
              v-if="role === 'director'"
              :project-id="projectId"
              :table-id="table.id"
            />
            <DeleteProjectTableFeature
              v-if="role === 'director'"
              :project-id="projectId"
              :table-id="table.id"
            />
          </div>
        </div>
        <Table
          :columns="table.attributes.fields"
          :rows="table.attributes.items || []"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.project {
  &-details {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
    border-radius: var(--radius-lg);
    padding: var(--space-md);
    background-color: var(--fourth-color);

    .title {
      width: 100%;
      text-align: center;
    }
  }
}

.tables {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  text-align: center;
  gap: var(--space-sm);
  overflow-x: auto;

  @media (max-width: $md1 + px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: $md2 + px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.table-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  .actions {
    width: 60px;
  }
}
</style>
