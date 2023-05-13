import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores/store'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/grades',
    name: 'grades',
    component: () => import('@/views/GradesView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/absences',
    name: 'absences',
    component: () => import('@/views/AbsencesView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: () => import('@/views/SubjectsView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: () => import('@/views/TasksView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  {
    path: '/:catchAll(.*)',
    name: 'pageNotFound',
    component: () => import('@/views/PageNotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router