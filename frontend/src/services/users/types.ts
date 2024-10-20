export type UserPreviewFormat = {
  name: string
  hash: string
  ext: string
  mime: string
  path: string
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}

export type UserAvatar = {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    thumbnail: UserPreviewFormat
    small: UserPreviewFormat
    medium: UserPreviewFormat
    large: UserPreviewFormat
  }
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  createdAt: string
  updatedAt: string
}
export type UserSkill = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}
export type UserRole = {
  id: number
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}
export type UserServer = {
  id: number
  username: string
  name: string
  surname: string
  lastname: string
  skills: UserSkill[]
  dateBirth: string
  email: string
  provider: string
  confirmed: boolean
  avatar: UserAvatar
  role: UserRole
  blocked: boolean
  createdAt: string
  updatedAt: string
}
