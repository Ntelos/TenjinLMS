import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores/store'

const routes = [
  //Generic
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
  //Student
  {
    path: '/grades',
    name: 'grades',
    component: () => import('@/views/student/GradesView.vue'),
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
    component: () => import('@/views/student/AbsencesView.vue'),
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
    component: () => import('@/views/student/SubjectsView.vue'),
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
    component: () => import('@/views/student/TasksView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  //School
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/school/StudentsView.vue'),
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
    path: '/teachers',
    name: 'teachers',
    component: () => import('@/views/school/TeachersView.vue'),
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
    path: '/classes',
    name: 'classes',
    component: () => import('@/views/school/ClassesView.vue'),
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
    path: '/allsubjects',
    name: 'allsubjects',
    component: () => import('@/views/school/allSubjectsView.vue'),
    beforeEnter: (to, from, next) => {
      if (!useStore().authenticated) {
        return next({
          name: 'login'
        })
      }
      next()
    }
  },
  //Teacher
  {
    path: '/teachings',
    name: 'teachings',
    component: () => import('@/views/teacher/TeachingsView.vue'),
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
    path: '/classrooms',
    name: 'classrooms',
    component: () => import('@/views/teacher/ClassroomsView.vue'),
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
    path: '/teachergrades',
    name: 'teachergrades',
    component: () => import('@/views/teacher/TeacherGradesView.vue'),
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
