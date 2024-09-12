<script setup lang="ts"></script>

<template>
  <article class="card">
    <section class="card-top">
      <slot name="card-top" />
    </section>
    <section class="card-center">
      <slot name="card-center" />
    </section>
    <section class="card-bottom">
      <slot name="card-bottom" />
    </section>
  </article>
</template>

<style scoped>
.card {
  cursor: pointer;
  color: #000;
  max-width: 200px;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: var(--animation-time) all ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
}
</style>
