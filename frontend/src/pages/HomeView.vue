<script setup lang="ts">
import { useApplicationStore } from '@/stores/app.store.ts'
import Button from '@/components/ui/button/Button.vue'
import GetData from '@/features/get-data/GetData.vue'
import TestForm from '@/components/ui/form/test/TestForm.vue'

const applicationStore = useApplicationStore()

const openTestModal = () => {
  applicationStore.getModal('get-data-modal')?.onShow()
}

const openErrorAlert = () => {
  applicationStore
    .getAlert('error')
    ?.setSettings({ message: 'open error' })
    .onShow()
}
</script>

<template>
  <div class="page container">
    <section class="page-top">top</section>
    <section class="page-center">
      <p>center</p>
      <GetData />
      <Button background="primary" @click="openTestModal">open modal </Button>
      <Button background="primary" @click="openErrorAlert"
        >open error alert
      </Button>
      <TestForm />
    </section>
    <section class="page-bottom">bottom</section>
  </div>
</template>

<style scoped lang="scss">
.page {
  &-center {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.btn {
  max-width: 200px;
}
</style>
