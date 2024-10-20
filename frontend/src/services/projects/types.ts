export type ProjectStatusField = {
  id: number
  attributes: {
    title: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export type ProjectTypeField = ProjectStatusField

export type PreviewFormat = {
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
export type ProjectTable = {
  id: number
  attributes: {
    title: string
    fields: string[]
    items: string[]
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}
export type ProjectPreview = {
  id: number
  attributes: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: {
      thumbnail: PreviewFormat
      small: PreviewFormat
      medium: PreviewFormat
      large: PreviewFormat
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
}

export type ProjectMember = {
  id: number
  attributes: {
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
  }
}

export type Project = {
  id: number
  attributes: {
    name: string
    address: string
    status: {
      data: ProjectStatusField | null
    }
    type: {
      data: ProjectTypeField | null
    }
    description: string
    preview?: {
      data: ProjectPreview | null
    }
    images?: {
      data: ProjectPreview[] | null
    }
    members?: {
      data: ProjectMember[] | null
    }
    tables?: {
      data: ProjectTable[]
    }
    expenses: string
    location: number[]
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}
export type ResponseProjects = {
  projects: Project[]
  meta: {
    pagination: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
}
export type ResponseProject = Project
