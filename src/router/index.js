import { createRouter, createWebHistory } from 'vue-router'
const Home = () => import('@/views/home/home')
const Detail = () => import('@/views/detail/detail')
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
