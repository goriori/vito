<script setup lang="ts">
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultMarker,
  YandexMapDefaultSchemeLayer,
  YandexMapZoomControl,
} from 'vue-yandex-maps'

type MProps = {
  coordinates: number[]
}
defineProps<MProps>()
</script>

<template>
  <yandex-map
    :settings="{
      location: {
        center: coordinates,
        zoom: 10,
      },
      showScaleInCopyrights: true,
    }"
    height="100vh"
    class="map"
  >
    <yandex-map-default-features-layer />
    <yandex-map-default-scheme-layer :settings="{ theme: 'dark' }" />
    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-default-marker
      :settings="{
        coordinates: coordinates,
        color: 'red',
        title: 'Объект',
      }"
    />
  </yandex-map>
</template>

<style scoped lang="scss"></style>
