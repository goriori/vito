import { Service } from '@/services/index.ts'

class JsonPlaceholderService extends Service {
  constructor() {
    super()
    this.setBaseUrl('https://jsonplaceholder.typicode.com/')
    this.setBaseHeaders({
      'Content-Type': 'application/json',
    })
  }

  async getPosts() {
    return await this.request({ url: '/posts' })
  }

  async getComments() {
    return await this.request({ url: '/comments' })
  }

  async getAlbums() {
    return await this.request({ url: '/albums' })
  }

  async getPhotos() {
    return await this.request({ url: '/photos' })
  }

  async getTodos() {
    return await this.request({ url: '/todos' })
  }

  async getUsers() {
    return await this.request({ url: '/users' })
  }
}

export default new JsonPlaceholderService()
