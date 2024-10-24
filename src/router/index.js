import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/login.vue';
import HomePage from '../views/HomePage.vue';

const routes = [

  {
    path: '/homepage',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
