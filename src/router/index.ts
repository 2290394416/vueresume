import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import IndexView from '../views/IndexView.vue'
import Home from '@/views/Home.vue'

import User from '@/views/content/User/index.vue'
import Role from '@/views/content/Role/index.vue'

const router = createRouter({
  // import.meta.env.BASE_URL
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
    }, 
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
          children: [
            {
              path: '',
              name: 'homeContent',
              component: () => import('@/views/content/HomeContent/index.vue')
            }, {
              path: 'about',
              name: 'about',
              component: () => import('../views/AboutView.vue')
            }, {
              path: 'system/user',
              name: 'user',
              component: User
            }, {
              path: 'system/role',
              name: 'role',
              component: Role
            }, {
              path: 'active',
              name: 'active',
              component: () => import('../views/ActiveView.vue')
            }
          ]
        },
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
