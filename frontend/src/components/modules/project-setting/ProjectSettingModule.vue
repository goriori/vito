<script setup lang="ts">
import SettingButtonPopup from '@/components/ui/button-popup/settings/SettingButtonPopup.vue'
import DeleteProjectFeature from '@/features/delete-project/DeleteProjectFeature.vue'

</script>

<template>
  <SettingButtonPopup :actions="[DeleteProjectFeature]" />
</template>

<style scoped lang="scss"></style>
