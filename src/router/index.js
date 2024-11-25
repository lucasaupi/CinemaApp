import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import HomePage from '../Views/HomePage.vue';
import MovieList from '../components/MovieList.vue';
import SeatReservation from '../components/SeatReservation.vue';
import Dashboard from '../components/admin-dashboard.vue';
import { authState } from '../auth';

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
  { 
    path: '/',
    name: 'MovieList', 
    component: MovieList 
  },
  { 
    path: '/reservation/:id', 
    name: 'SeatReservation', 
    component: SeatReservation,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('userToken');
      if (token) {
        next();
      } else {
        next({ name: 'Login' });
      }
    }
  },
  {
    path: '/admin-dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (authState.isAuthenticated && authState.role === 'admin') {
        next();
      } else {
        next({ name: 'Login' });
      }
    },
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
