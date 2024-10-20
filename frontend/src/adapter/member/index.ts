import { Member } from '@/entities/member'
import { ProjectMember } from '@/services/projects/types.ts'

export class MemberAdapter {
  data: ProjectMember

  constructor(data: ProjectMember) {
    this.data = data
  }

  adapt() {
    return new Member({
      id: this.data.id,
      name: this.data.attributes.name,
      surname: this.data.attributes.surname,
      lastname: this.data.attributes.lastname,
      username: this.data.attributes.username,
      email: this.data.attributes.email,
      dateBirth: this.data.attributes.dateBirth,
      skills: this.data.attributes.skills,
    })
  }
}
