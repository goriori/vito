export type MemberOption = {
  id: number
  name: string
  surname: string
  lastname: string
  username: string
  email: string
  dateBirth: string
  skills: string
}

export class Member {
  id: number
  name: string
  surname: string
  lastname: string
  username: string
  email: string
  dateBirth: string
  skills: string

  constructor({
    id,
    name,
    surname,
    lastname,
    username,
    email,
    dateBirth,
    skills,
  }: MemberOption) {
    this.id = id
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.username = username
    this.email = email
    this.dateBirth = dateBirth
    this.skills = skills
  }
}
