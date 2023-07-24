import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home"
      },
    },
    {
      path: '/weather/:state/:city',
      name: 'cityView',
      component: () => import('../views/CityView.vue'),
      meta: {
        title: "Weather"
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${
    to.params.state 
      ? `${to.params.state}, ${to.params.city}`
      : to.meta.title} | The Local Weather`;
  next(); 
})

export default router
