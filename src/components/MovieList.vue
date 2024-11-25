<template>
  <div id="welcome-message">
    <h1>Bienvenidos a CINE ORT</h1>
    <p>Elegi tu película:</p>
  </div>
  <div>
    <h2 id="movie-list-title">Cartelera de Películas</h2>
    <div class="movie-list">
      <div v-for="movie in movies" :key="movie.id" class="movie-item">
        <img :src="`https://image.tmdb.org/t/p/w200${movie.poster_path}`" :alt="movie.title" />
        <h3>{{ movie.title }}</h3>
        <p>{{ movie.overview }}</p>
        <!-- Botón para redirigir según autenticación -->
        <button @click="handleReserveClick(movie.id)" class="reserve-button">
          Reservar Asientos
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import "../Styles/movieList.css";

export default {
  name: 'MovieList',
  setup() {
    const movies = ref([]);
    const apiKey = '5877a1fcce98c7eafa67a3b52a7117b4';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es`;
    const router = useRouter();

    const fetchMovies = async () => {
      try {
        const response = await axios.get(apiUrl);
        movies.value = response.data.results;
      } catch (error) {
        console.error('Error al obtener las películas:', error);
      }
    };

    onMounted(fetchMovies);

    const isAuthenticated = () => {
      return localStorage.getItem('userToken') !== null;
    };

    const handleReserveClick = (movieId) => {
      if (isAuthenticated()) {
        router.push({ name: 'SeatReservation', params: { id: movieId } });
      } else {
        localStorage.setItem('selectedMovieId', movieId); // Guarda el ID
        router.push({ name: 'Login', query: { redirectTo: `/reservation/${movieId}` } });
      }
    };

    return { movies, handleReserveClick };
  },
};
</script>
