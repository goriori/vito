<script setup lang="ts"></script>

<template>
  <div class="account">
    <p>Vito</p>
    <div class="account-icon">
      <img src="/images/account/avatar.jpg" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.account {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);

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
}
</style>
