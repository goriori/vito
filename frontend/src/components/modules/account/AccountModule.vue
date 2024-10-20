<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import { generateRandomId } from '@/utils/helpers/generateRandomId.ts'
import { LocationQueryRaw, useRouter } from 'vue-router'
import PersonIcon from '@/components/ui/icons/PersonIcon.vue'
import ProjectIcon from '@/components/ui/icons/ProjectIcon.vue'
import LogoutIcon from '@/components/ui/icons/LogoutIcon.vue'
import { useSessionStore } from '@/stores/session.store.ts'
import Image from '@/components/ui/image/Image.vue'

const router = useRouter()
const sessionStore = useSessionStore()
const session = ref(sessionStore.getSession())
const username = ref(session.value?.username)
const avatar = computed(() => window.API + session.value?.avatar?.url)
const isActive = ref(false)
const menu = ref([
  {
    id: generateRandomId(),
    title: 'Личный кабинет',
    icon: shallowRef(PersonIcon),
    onClick: () => redirectTo('account'),
  },
  {
    id: generateRandomId(),
    title: 'Проекты',
    icon: shallowRef(ProjectIcon),
    onClick: () => redirectTo('projects', { page: 1 }),
  },
  {
    id: generateRandomId(),
    title: 'Выйти',
    icon: shallowRef(LogoutIcon),
    onClick: () => {
      sessionStore.getSession()?.deleteSessionStorage()
      sessionStore.setSession(null)
      redirectTo('auth')
    },
  },
])
const redirectTo = (name: string, query?: LocationQueryRaw) => {
  toggleMenu()
  router.push({
    name,
    query: query || {},
  })
}
const toggleMenu = () => (isActive.value = !isActive.value)
</script>

<template>
  <div class="account">
    <div class="account-avatar" @click="toggleMenu">
      <p>{{ username }}</p>
      <div class="account-icon">
        <Image :href="avatar" alt="" rounded />
      </div>
    </div>
    <div class="account-menu" v-if="isActive">
      <div
        v-for="item in menu"
        :key="item.id"
        @click="item.onClick"
        class="menu-item"
      >
        <component :is="item.icon" class="icon" />
        <p>
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.account {
  position: relative;

  &-avatar {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-sm);
  }

  &-icon {
    width: 50px;
    height: 50px;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      object-fit: cover;
    }
  }

  &-menu {
    position: absolute;
    width: 250px;
    right: 100px;
    display: flex;
    flex-direction: column;
    text-align: center;
    border-radius: var(--radius-lg);
    padding: var(--space-xl);
    background-color: var(--secondary-color);
    gap: var(--space-md);
    animation: 0.3s toggle-menu linear;
  }
}

.menu {
  &-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    transition: 0.3s all ease-in-out;

    &:hover {
      opacity: 0.8;
    }

    .icon {
      max-width: 24px;
      max-height: 24px;
    }
  }
}

@keyframes toggle-menu {
  0% {
    right: -100px;
  }
  100% {
    right: 100px;
  }
}
</style>
