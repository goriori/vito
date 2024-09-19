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
</script>

<template>
  <Card rounded variant="quaternary" class="card" v-ripple>
    <template #card-top></template>
    <template #card-center>
      <div class="card-content">
        <img :src="preview" alt="" />
        <div class="card-group">
          <p class="card-title">{{ title }}</p>
          <p class="card-address">{{ address }}</p>
        </div>
        <Chip variant="primary" rounded class="card-status"
          >{{ type }}
        </Chip>
        <Chip variant="secondary" rounded class="card-status"
          >{{ status }}
        </Chip>
      </div>
    </template>
    <template #card-bottom></template>
  </Card>
</template>

<style scoped lang="scss">
.card {
  position: relative;
  overflow: hidden;

  &-content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-lg);
    font-weight: bold;
  }

  &-group {
    display: flex;
    flex-direction: column;
    flex: 0 1 190px;
    gap: var(--space-sm);
  }

  &-title {
    font-size: var(--primary-font-size);
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
  width: 150px;
  height: 100px;
  object-fit: cover;
  border-radius: var(--radius-sm);
}
</style>
