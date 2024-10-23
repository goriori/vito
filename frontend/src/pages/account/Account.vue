<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import { generateRandomId } from '@/utils/helpers/generateRandomId.ts'
import Button from '@/components/ui/button/Button.vue'
import LogoutIcon from '@/components/ui/icons/LogoutIcon.vue'
import AccountInfoForm from '@/components/ui/form/account-info/AccountInfoForm.vue'
import { useSessionStore } from '@/stores/session.store.ts'
import { Session } from '@/entities/session/index.ts'
import { useRouter } from 'vue-router'
import Image from '@/components/ui/image/Image.vue'

const router = useRouter()
const sessionStore = useSessionStore()
const session = ref<Session | null>(sessionStore.getSession())
const avatar = ref(window.API + session.value?.avatar.url)
const menu = ref([
  {
    id: generateRandomId(),
    title: 'Выйти',
    icon: shallowRef(LogoutIcon),
    onClick: () => {
      session.value?.deleteSessionStorage()
      sessionStore.setSession(null)
      router.push({ name: 'auth' })
    },
  },
])
</script>

<template>
  <div class="content">
    <div class="account">
      <article class="account-avatar">
        <Image :href="avatar" alt="avatar" class="avatar" rounded />
        <p class="name">{{ session?.username }}</p>
      </article>
      <article class="account-menu-desktop">
        <Button v-for="item in menu" :key="item" variant="quaternary" class="menu-item" @on-click="item.onClick">
          <component :is="item.icon" class="icon" />
          <p>{{ item.title }}</p>
        </Button>
      </article>
    </div>
    <div class="info">
      <AccountInfoForm />
    </div>
    <article class="account-menu-mobile">
      <Button v-for="item in menu" :key="item" variant="quaternary" class="menu-item" @on-click="item.onClick">
        <component :is="item.icon" class="icon" />
        <p>{{ item.title }}</p>
      </Button>
    </article>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/variables';

.content {
  width: 100%;
  display: flex;
  padding: var(--space-xl);
  gap: var(--space-xl);
  @media (max-width: $md4 + px) {
    flex-direction: column;
  }
}

.account,
.info {
  width: 100%;
  height: 100%;
}

.account {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  color: var(--primary-color);

  &-avatar {
    width: 100%;
    height: 100%;
    border-radius: var(--radius-lg);
    background-color: var(--fourth-color);
  }

  &-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    max-height: 150px;

    .name {
      font-weight: bold;
      font-size: 32px;
    }

    .avatar {
      width: 100%;
      height: 100%;
      max-width: 100px;
      max-height: 100px;
      border-radius: 100%;
      object-fit: cover;
    }
  }

  &-menu-desktop {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-sm);
  }

  &-menu-mobile {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-sm);
  }
}

.info {
  width: 100%;
  height: 100%;
  border-radius: var(--radius-lg);
  background-color: var(--fourth-color);

  &-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-xl);
  }
}

.menu {
  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-md);
    font-weight: bold;
    text-align: center;
    font-size: 20px;

    .icon {
      max-height: 24px;
      max-width: 24px;
    }
  }
}

@media (max-width: $md4 + px) {
  .content {
    flex-direction: column;
  }

  .account {
    max-width: none;
    flex: 0 1 200px;

    &-avatar {
      max-height: none;
    }

    &-menu-desktop {
      display: none;
    }

    &-menu-mobile {
      display: block;
    }
  }
}
</style>
