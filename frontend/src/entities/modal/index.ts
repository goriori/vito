import { ShallowRef } from 'vue'
import { generateRandomId } from '@/utils/helpers/generateRandomId.ts'

export class Modal {
  id: number
  private name: string
  private show: boolean
  private settings: object
  readonly component: ShallowRef

  constructor(name: string, component: ShallowRef) {
    this.id = generateRandomId()
    this.name = name
    this.show = false
    this.settings = {}
    this.component = component
  }

  onShow() {
    this.show = true
    return this
  }

  onHide() {
    this.show = false
    return this
  }

  getName() {
    return this.name
  }

  getComponent() {
    return this.component
  }

  getSettings() {
    return this.settings
  }

  getStateVisibility() {
    return this.show
  }

  setSettings(settings: object) {
    this.settings = settings
    return this
  }
}
