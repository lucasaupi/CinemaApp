import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/login.vue';
import HomePage from '../Views/HomePage.vue';
import MovieList from '../components/MovieList.vue';
import SeatReservation from '../components/SeatReservation.vue';

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
      // Verificar si el usuario tiene el token en localStorage
      const token = localStorage.getItem('userToken');
      if (token) {
        // Si el token está presente, permitir el acceso
        next();
      } else {
        // Si no está logueado, redirigir al login
        next({ name: 'Login' });
      }
    }
  },
];

// Crear el router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
