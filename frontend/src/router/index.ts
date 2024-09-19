import { createRouter, createWebHistory } from 'vue-router'

const AuthView = () => import('@/pages/auth/Authorization.vue')
const ProjectsView = () => import('@/pages/projects/Projects.vue')
const ProjectView = () => import('@/pages/projects/Project.vue')
const UiView = () => import('@/pages/ui/Ui.vue')
const ProjectInfoView = () => import('@/pages/project-info/ProjectInfo.vue')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth',
      meta: {
        name: 'Авторизация',
      },
      component: AuthView,
    },
    {
      path: '/projects',
      name: 'projects',
      meta: {
        name: 'Проекты',
      },
      component: ProjectsView,
    },
    {
      path: '/project/:id',
      name: 'project',
      meta: {
        name: 'Проект',
      },
      component: ProjectView,
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
