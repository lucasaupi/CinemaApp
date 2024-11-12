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

export default {
  name: 'MovieList',
  setup() {
    const movies = ref([]);
    const apiKey = '5877a1fcce98c7eafa67a3b52a7117b4';
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es`;
    const router = useRouter(); 
    const userToken = localStorage.getItem('userToken');

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
      return userToken !== null;
    };

    const handleReserveClick = (movieId) => {
      if (isAuthenticated()) {
        router.push({ name: 'SeatReservation', params: { id: movieId } });
      } else {
        router.push({ name: 'Login', query: { redirectTo: `/reservation/${movieId}` } });
      }
    };

    return { movies, handleReserveClick };
  },
};
</script>

<style scoped>
.movie-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  color: rgb(197, 168, 109);
}
#movie-list-title {
  color: rgba(255, 255, 255, 0.8);
  font-size: 2rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}
.movie-item {
  text-align: center;
}
.movie-item img {
  max-width: 100%;
  border-radius: 8px;
}
.reserve-button {
  background-color: rgba(197, 168, 109, 0.6);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.reserve-button:hover {
  background-color: rgba(197, 168, 109, 0.2);
}

</style>
