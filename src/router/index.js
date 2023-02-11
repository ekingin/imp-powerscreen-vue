import { createRouter, createWebHistory } from 'vue-router'
import PowerScreen from '../views/powerscreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'powerscreen',
      component: PowerScreen
    },
  ]
})

export default router
