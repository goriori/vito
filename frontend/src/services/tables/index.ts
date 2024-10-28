import { Service } from '@/services/index.ts'
import { TableFormData } from '@/services/tables/types.ts'

class TableService extends Service {
  constructor() {
    super()
    super.setBaseUrl(window.API)
  }

  async createTable(formData: TableFormData, jwtToken: string) {
    try {
      return await this.request({
        method: 'post',
        url: '/api/tables',
        data: {
          data: formData,
        },
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async updateTable(
    tableId: number,
    payload: { data: object },
    jwtToken: string
  ) {
    try {
      return await this.request({
        method: 'put',
        url: `/api/tables/${tableId}`,
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        data: payload,
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}

export default new TableService()
