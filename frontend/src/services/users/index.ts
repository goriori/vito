import { Service } from '@/services/index.ts'
import { UserServer } from '@/services/users/types.ts'

class UserService extends Service {
  constructor() {
    super()
    super.setBaseUrl(window.API)
  }

  async getUsers(jwtToken: string): Promise<UserServer[]> {
    try {
      return await this.request({
        url: '/api/users',
        params: {
          populate: 'avatar, skills',
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
}

export default new UserService()
