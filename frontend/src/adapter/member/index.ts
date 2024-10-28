import { Member } from '@/entities/member/index.ts'
import { ProjectMember } from '@/services/projects/types.ts'
import { UserServer } from '@/services/users/types.ts'

export class MemberProjectAdapter {
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
      skills: this.data.attributes.skills.data.map((skill) => skill.attributes.title),
      avatar: this.data.attributes.avatar.data.url,
    })
  }
}

export class MemberUserAdapter {
  data: UserServer

  constructor(data: UserServer) {
    this.data = data
  }

  adapt() {
    return new Member({
      id: this.data.id,
      name: this.data.name,
      surname: this.data.surname,
      lastname: this.data.lastname,
      username: this.data.username,
      email: this.data.email,
      dateBirth: this.data.dateBirth,
      skills: this.data.skills.map((skill) => skill.title),
      avatar: this.data.avatar.url,
    })
  }
}
