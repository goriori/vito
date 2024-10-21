import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/stores/session.store.ts'

const AuthView = () => import('@/pages/auth/Authorization.vue')
const AccountView = () => import('@/pages/account/Account.vue')
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
        layout: 'default',
      },
      component: AuthView,
    },
    {
      path: '/account',
      name: 'account',
      meta: {
        name: 'Аккаунт',
        layout: 'session',
      },
      component: AccountView,
    },
    {
      path: '/projects',
      name: 'projects',
      meta: {
        name: 'Проекты',
        layout: 'session',
      },
      component: ProjectsView,
    },
    {
      path: '/project/:id',
      name: 'project',
      meta: {
        name: 'Проект',
        layout: 'session',
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
  scrollBehavior(_to, _from, _savedPosition) {
    return { top: 0 }
  },
})
router.beforeEach((to, _from, next) => {
  const sessionStore = useSessionStore()
  const haveSession = sessionStore.getSession()
  if (to.name !== 'auth' && !haveSession) next({ name: 'auth' })
  else next()
})
export default router
