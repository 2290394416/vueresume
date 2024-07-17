import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from '../views/IndexView.vue'

import User from '@/views/content/User/index.vue'
import Role from '@/views/content/Role/index.vue'
import Dept from '@/views/content/Dept/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    }, 
    {
      path: '/vueresume/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'homeContent',
          component: () => import('@/views/content/HomeContent/index.vue')
        }, {
          path: 'system/user',
          name: 'user',
          component: User,
        }, {
          path: 'system/role',
          name: 'role',
          component: Role
        }, {
          path: 'system/dept',
          name: 'dept',
          component: Dept
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    },
  ]
})

export default router
