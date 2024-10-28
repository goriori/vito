export interface SessionAbstracted {
  getInfo(): SessionInfo

  setTokenPermission(_token: TokenPermission): void
}

export type SessionInfo = {
  id: number
  username: string
  email: string
  role: string
  provider: string
  confirmed: boolean
}
export type TokenPermission = {
  type: string
  value: string
}
export type SessionAvatar = {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    thumbnail: SessionAvatarPreviewFormat
    small: SessionAvatarPreviewFormat
    medium: SessionAvatarPreviewFormat
    large: SessionAvatarPreviewFormat
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
export type SessionAvatarPreviewFormat = {
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

export type SessionRole = {
  id: number
  name: string
  description: string
  type: string
  createdAt: string
  updatedAt: string
}
export type SessionOption = {
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
  avatar: SessionAvatar
  role: SessionRole
  blocked: boolean
  createdAt: string
  updatedAt: string
}
