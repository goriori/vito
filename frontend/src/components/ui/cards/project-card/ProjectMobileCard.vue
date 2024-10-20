<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'
import Chip from '@/components/ui/chip/Chip.vue'

type CProps = {
  preview: string
  title: string
  address: string
  status: string
  type: string
}
defineProps<CProps>()
const serverUrl = window.API
</script>

<template>
  <Card rounded variant="quaternary" class="card" v-ripple>
    <template #card-top> </template>
    <template #card-center>
      <div class="card-content">
        <img :src="serverUrl + preview" alt="" />
        <div class="card-group">
          <p class="card-title">{{ title }}</p>
          <p class="card-address">{{ address }}</p>
        </div>
      </div>
    </template>
    <template #card-bottom>
      <div class="statuses">
        <Chip variant="primary" rounded class="card-status card-type"
          >{{ type }}
        </Chip>
        <Chip variant="secondary" rounded class="card-status"
          >{{ status }}
        </Chip>
      </div>
    </template>
  </Card>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';
@import '@/assets/scss/animation';

.card {
  position: relative;
  overflow: hidden;
  animation: var(--animation-time) default-display-card linear;

  &-content {
    display: flex;
    flex-direction: column;
    gap: var(--space-lg);
    font-weight: bold;
  }

  &-group {
    display: flex;
    flex-direction: column;
    flex: 0 1 50px;
    gap: var(--space-sm);
  }

  &-title {
    font-size: var(--primary-font-size);
    @media (max-width: $md3 + px) {
      font-size: var(--thrid-font-size);
    }
  }

  &-address {
    font-weight: normal;
    color: gray;
    font-size: var(--thrid-font-size);
  }

  &-status {
    flex: 0 1 100px;
  }
}

img {
  flex: 1 0 150px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-sm);
  @media (max-width: $md3 + px) {
    flex: 1 0 100px;
  }
}

.statuses {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-sm);
}
</style>
