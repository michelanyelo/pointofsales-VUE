import { createRouter, createWebHistory } from 'vue-router'
import ShopView from '@/views/ShopView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShopView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/admin/ProductsView.vue')
    }
  ],
})

export default router
