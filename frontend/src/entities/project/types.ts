import { ProjectTable } from '@/services/projects/types.ts'
import { Member } from '@/entities/member/index.ts'

export type ProjectOption = {
  id: number
  name: string
  type: string
  preview: string | null
  status: string
  address: string
  images: string[]
  members: Member[] | []
  location: number[]
  description: string
  details: {
    tables: ProjectTable[]
  }
  expenses: string
}
