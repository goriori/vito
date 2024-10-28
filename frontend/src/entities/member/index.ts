export type MemberOption = {
  id: number
  name: string
  surname: string
  lastname: string
  username: string
  email: string
  dateBirth: string
  skills: string[]
  avatar: string
}

export class Member {
  id: number
  name: string
  surname: string
  lastname: string
  username: string
  email: string
  dateBirth: string
  skills: string[]
  avatar: string

  constructor({ id, name, surname, lastname, username, email, dateBirth, skills, avatar }: MemberOption) {
    this.id = id
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.username = username
    this.email = email
    this.dateBirth = dateBirth
    this.skills = skills
    this.avatar = avatar
  }
}
