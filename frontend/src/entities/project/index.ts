import { ProjectOption } from '@/entities/project/types.ts'
import { ProjectTable } from '@/services/projects/types.ts'
import { Member, MemberOption } from '@/entities/member/index.ts'
import { UserServer } from '@/services/users/types.ts'

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
  }

  addMember(user: MemberOption) {
    this.members.push(new Member(user))
  }
}
