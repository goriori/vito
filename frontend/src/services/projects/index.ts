import { Service } from '@/services/index.ts'
import { ResponseProject, ResponseProjects } from '@/services/projects/types.ts'

class ProjectService extends Service {
  constructor() {
    super()
    super.setBaseUrl(window.API)
  }

  async getProjects(
    token: string,
    page: number = 1
  ): Promise<ResponseProjects> {
    try {
      const { data, meta } = await this.request({
        url: '/api/projects',
        params: {
          populate:
            'preview,type,status,members.avatar,members.skills,tables,images',
          'pagination[page]': page,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return {
        projects: data,
        meta,
      }
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getProject(projectId: number, token: string): Promise<ResponseProject> {
    try {
      const { data } = await this.request({
        url: `/api/projects/${projectId}`,
        params: {
          populate: 'images,status,type,members.avatar,members.skills,tables',
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async updateProject(
    projectId: number,
    payloadData: { data: object },
    token: string
  ) {
    try {
      await this.request({
        url: `/api/projects/${projectId}`,
        method: 'put',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payloadData,
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async createProject(payloadData: { data: object }, token: string) {
    try {
      await this.request({
        url: '/api/projects',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: payloadData,
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async deleteProject(projectId: number, token: string) {
    try {
      await this.request({
        url: `/api/projects/${projectId}`,
        method: 'delete',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export default new ProjectService()
