import { Service } from '@/services'

type AuthDTO = {
  identifier: string
  password: string
}

class SessionService extends Service {
  constructor() {
    super()
    super.setBaseUrl(window.API)
  }

  async auth(authData: AuthDTO) {
    try {
      return await this.request({
        method: 'post',
        url: '/api/auth/local',
        data: authData,
      })
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  async getUserInfo(id: number, jwtToken: string) {
    try {
      return await this.request({
        method: 'get',
        url: `/api/users/${id}`,
        params: {
          populate: 'avatar,role',
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

export default new SessionService()
