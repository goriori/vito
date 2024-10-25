<script setup lang="ts">
import Table from '@/components/ui/table/Table.vue'
import { ProjectTable } from '@/services/projects/types.ts'
import CreateProjectDetailsFeature from '@/features/create-project-details/CreateProjectDetailsFeature.vue'

type PProps = {
  details: {
    tables: ProjectTable[]
  }
}
defineProps<PProps>()
</script>

<template>
  <div class="project-details">
    <div class="details-header flex a-i-center between">
      <h2 class="title">Детали проекта</h2>
      <CreateProjectDetailsFeature />
    </div>
    <div v-if="details.tables" class="tables">
      <div v-for="table in details.tables" :key="table.id" class="table-item">
        <h3>{{ table.attributes.title }}</h3>
        <Table :columns="table.attributes.fields" :rows="table.attributes.items" />
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
}
</style>
