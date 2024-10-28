import { Project as ProjectDataServer } from '@/services/projects/types.ts'
import { Project } from '@/entities/project/index.ts'
import { MemberProjectAdapter } from '@/adapter/member/index.ts'

export class ProjectAdapter {
  data: ProjectDataServer

  constructor(data: ProjectDataServer) {
    this.data = data
  }

  adapt() {
    return new Project({
      id: this.data.id,
      name: this.data.attributes.name,
      type: this.data.attributes.type.data?.attributes.title || 'Не определен',
      preview: this.data.attributes.preview?.data?.attributes.formats.small.url || '',
      status: this.data.attributes.status.data?.attributes.title || 'Не определен',
      address: this.data.attributes.address,
      images: this.data.attributes.images?.data?.map((image) => image.attributes.url) || [],
      members: this.data.attributes.members?.data?.map((member) => new MemberProjectAdapter(member).adapt()) || [],
      location: this.data.attributes.location,
      description: this.data.attributes.description,
      details: {
        tables: this.data.attributes.tables?.data || [],
      },
      expenses: this.data.attributes.expenses,
    })
  }
}
