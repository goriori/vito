import {
  SessionAbstracted,
  SessionAvatar,
  SessionInfo,
  SessionOption,
  SessionRole,
  TokenPermission,
} from '@/entities/session/types.ts'

export class Session implements SessionAbstracted {
  id: number
  username: string
  name: string
  surname: string
  lastname: string
  skills: string
  dateBirth: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  role: SessionRole
  avatar: SessionAvatar
  tokens: TokenPermission[]

  constructor({
    id,
    username,
    name,
    surname,
    lastname,
    email,
    skills,
    dateBirth,
    provider,
    confirmed,
    avatar,
    role,
    blocked,
    createdAt,
    updatedAt,
  }: SessionOption) {
    this.id = id
    this.username = username
    this.name = name
    this.surname = surname
    this.lastname = lastname
    this.avatar = avatar
    this.skills = skills == 'undefined' ? 'Не определено' : skills
    this.dateBirth = dateBirth == null ? '0001-01-01' : dateBirth
    this.email = email
    this.provider = provider
    this.confirmed = confirmed
    this.role = role
    this.blocked = blocked
    this.createdAt = createdAt
    this.updatedAt = updatedAt
    this.tokens = []
  }

  getInfo(): SessionInfo {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      role: this.role.name,
      confirmed: this.confirmed,
      provider: this.provider,
    }
  }

  saveSessionStorage() {
    localStorage.setItem('session', JSON.stringify(this))
  }

  deleteSessionStorage() {
    localStorage.removeItem('session')
  }

  setTokenPermission(token: TokenPermission) {
    this.tokens.push(token)
  }
}
