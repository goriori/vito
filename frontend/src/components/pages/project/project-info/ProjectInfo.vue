<script setup lang="ts">
import Chip from '@/components/ui/chip/Chip.vue'
import PersonList from '@/components/ui/list/person-list/PersonList.vue'

type PProps = {
  projectName: string
  projectType: string
  address: string
  status: string
  description: string
  members: string[]
}
defineProps<PProps>()
</script>

<template>
  <div>
    <div class="info-top">
      <div class="info-title">
        <h1 class="title">{{ projectName }}</h1>
        <p class="address">{{ address }}</p>
      </div>
      <div class="info-statuses">
        <Chip rounded variant="secondary" class="status"
          >{{ projectType }}
        </Chip>
        <Chip rounded variant="secondary" class="status">{{ status }}</Chip>
      </div>
    </div>
    <div class="info-center">
      <div class="members">
        <h2>Состав</h2>
        <div class="members-list">
          <PersonList :persons="members" />
          <p v-if="members.length === 0">Состав не сформирован</p>
        </div>
      </div>
      <p class="description">{{ description }}</p>
    </div>
    <div class="info-bottom">
      <h2>Затрачено: 3 360 Р</h2>
      <h2>Остаток: 96 640 Р</h2>
      <h2>Бюджет: 100 000 Р</h2>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info {
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
