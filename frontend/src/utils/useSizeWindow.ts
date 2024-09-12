import { computed } from 'vue'

const DESKTOP_WIDTH = 1760
const LAPTOP_WIDTH = 1240
const TABLET_WIDTH = 768
const MOBILE_WIDTH = 767

export enum DeviceSize {
  DESKTOP = DESKTOP_WIDTH,
  LAPTOP = LAPTOP_WIDTH,
  TABLET = TABLET_WIDTH,
  MOBILE = MOBILE_WIDTH,
}

export const useSizeWindow = () => {
  const width = computed(() => document.body.offsetWidth)
  const deviceSize = computed<DeviceSize>(() => {
    if (width.value >= DeviceSize.DESKTOP) return DeviceSize.DESKTOP
    if (width.value >= DeviceSize.LAPTOP) return DeviceSize.LAPTOP
    if (width.value >= DeviceSize.TABLET) return DeviceSize.TABLET
    if (width.value < DeviceSize.MOBILE) return DeviceSize.MOBILE
    else return DeviceSize.MOBILE
  })

  return {
    deviceSize,
  }
}
