
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/all-products',
      name: 'allProducts',
      component: () => import('../pages/allProducts.vue')
    },
    {
      path: '/category/:id',
      name: 'category',
      component: () => import('../views/CategoryView.vue')
    },
    {
      path: '/book/:id',
      name: 'book',
      component: () => import('../views/BookView.vue')
    },{
      path: '/cart',
      name: 'cart',
      component: () => import('../views/CartView.vue')
    }
  ],
})

export default router

