import { createRouter, createWebHistory } from 'vue-router'

const HomeView = () => import('@/pages/HomeView.vue')
const TestView = () => import('@/pages/TestView.vue')
const UiView = () => import('@/pages/ui/Ui.vue')
const ProjectInfoView = () => import('@/pages/project-info/ProjectInfo.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        name: 'Главная страница',
      },
      component: HomeView,
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        name: 'Тестовая страница',
      },
      component: TestView,
    },
    {
      path: '/ui',
      name: 'ui',
      meta: {
        name: 'Ui Kit',
      },
      component: UiView,
    },
    {
      path: '/project-info',
      name: 'project-info',
      meta: {
        name: 'Страница о проекте',
      },
      component: ProjectInfoView,
    },
  ],
})
router.beforeEach((_to, _from, next) => {
  next()
})
export default router
