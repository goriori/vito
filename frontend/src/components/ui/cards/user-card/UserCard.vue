<script setup lang="ts">
import Card from '@/components/ui/cards/Card.vue'
import Image from '@/components/ui/image/Image.vue'
import Chip from '@/components/ui/chip/Chip.vue'
import { UserSkill } from '@/services/users/types.ts'

type CProps = {
  name: string
  username: string
  skills: UserSkill[]
  avatar: string | null
}

defineProps<CProps>()

const serverUrl = window.API
</script>

<template>
  <Card variant="secondary" rounded>
    <template #card-center>
      <div></div>
      <div class="flex a-i-center gap-3">
        <Image
          v-if="avatar"
          :href="serverUrl + avatar"
          rounded
          class="avatar"
        />
        <div class="flex column gap-2">
          <p>{{ name }} ({{ username }})</p>
          <div class="flex gap-2">
            <Chip
              v-for="skill in skills"
              :key="skill.id"
              id="skill"
              variant="tertiary"
              rounded
            >
              {{ skill.title }}
            </Chip>
          </div>
        </div>
      </div>
    </template>
    <template #card-bottom></template>
  </Card>
</template>

<style scoped lang="scss">
.avatar {
  width: 100%;
  height: 100%;
  max-width: 50px;
  max-height: 50px;

  ::v-deep(img) {
    width: 50px;
    height: 50px;
  }
}

p {
  color: var(--fourth-color);
}

#skill {
  color: var(--primary-color);
  font-size: 10px;
  padding: 2px;
  max-height: 20px;
}
</style>
