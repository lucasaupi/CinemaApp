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
    component: SeatReservation 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
