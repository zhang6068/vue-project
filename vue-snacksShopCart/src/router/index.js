import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'goods'//打开默认跳转到商品列表页
    },
    {
      path: '/goods',
      name: 'goods',
      component: ()=>import('../views/GoodsList.vue')
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: () => import('../views/Cart.vue'),
    },
  ],
})

export default router
