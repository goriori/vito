import { Modal } from '../index.ts'
import { ShallowRef } from 'vue'

export class Alert extends Modal {
  constructor(name: string, component: ShallowRef) {
    super(name, component)
  }
}
