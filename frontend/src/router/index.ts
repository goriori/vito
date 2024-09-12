import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/pages/HomeView.vue')
const TestView = () => import('@/pages/TestView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/test',
      name: 'test',
      component: TestView,
    },
  ],
})
router.beforeEach((_to, _from, next) => {
  next()
})
export default router
