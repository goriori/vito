import { ProjectOption } from '@/entities/project/types.ts'
import { ProjectTable } from '@/services/projects/types.ts'
import { Member } from '@/entities/member/index.ts'

export class Project {
  id: number
  name: string
  type: string
  preview: string | null
  status: string
  address: string
  images: string[]
  members: Member[] | []
  coordinates: number[]
  description: string
  details: {
    tables: ProjectTable[]
  }
  expenses: string
  isTarget: boolean

  constructor(option: ProjectOption) {
    this.id = option.id
    this.name = option.name
    this.type = option.type
    this.preview = option.preview
    this.status = option.status
    this.address = option.address
    this.images = option.images || []
    this.members = option.members || []
    this.coordinates = option.location
    this.description = option.description
    this.details = option.details || {}
    this.expenses = option.expenses
    this.isTarget = false
  }

  addMember(member: Member) {
    this.members.push(member)
  }

  getMembers() {
    return this.members
  }

  toggleTarget() {
    this.isTarget = !this.isTarget
  }
}
