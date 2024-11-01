<template>
    <div>
      <h2>Cartelera de Películas</h2>
      <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-item">
          <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" :alt="movie.title" />
          <h3>{{ movie.title }}</h3>
          <p>{{ movie.overview }}</p>
          <!-- Navegar a la reserva de asientos de esta película -->
          <router-link :to="{ name: 'SeatReservation', params: { id: movie.id } }">
            Reservar Asientos
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  export default {
    name: 'MovieList',
    setup() {
      const movies = ref([]);
      const apiKey = '5877a1fcce98c7eafa67a3b52a7117b4'; 
      const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es`;
  
      const fetchMovies = async () => {
        try {
          const response = await axios.get(apiUrl);
          movies.value = response.data.results;
        } catch (error) {
          console.error('Error al obtener las películas:', error);
        }
      };
  
      onMounted(fetchMovies);
  
      return { movies };
    },
  };
  </script>
  
  <style scoped>
  .movie-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
  .movie-item {
    text-align: center;
  }
  .movie-item img {
    max-width: 100%;
    border-radius: 8px;
  }
  </style>
  