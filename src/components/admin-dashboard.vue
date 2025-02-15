<template>
  <div class="admin-dashboard">
    <h1>Panel de Administración</h1>

    <div class="charts-container">
      <div class="chart">
        <BarChart v-if="barChartData" :chart-data="barChartData" :chart-options="barChartOptions" />
      </div>
      <div class="chart">
        <PieChart v-if="pieChartData" :chart-data="pieChartData" :chart-options="pieChartOptions" />
      </div>
    </div>

    <h2>Resumen por Película</h2>
    <table class="movie-summary">
      <thead>
        <tr>
          <th>Película</th>
          <th>Reservas Totales</th>
          <th>Asientos Disponibles</th>
          <th>Porcentaje Ocupación</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movie in movies" :key="movie.id">
          <td>{{ movie.title }}</td>
          <td>{{ movie.totalReservations }}</td>
          <td>{{ movie.availableSeats }}</td>
          <td>{{ movie.occupancyRate }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { BarChart, PieChart } from 'vue-chart-3';
import Chart from 'chart.js/auto';
import reservasService from '../services/apiService';
import { calculateMovieStatistics } from '../services/estadisticasService';
import axios from 'axios';
import "../Styles/admin-Dashboard.css";

export default {
  components: { BarChart, PieChart },
  setup() {
    const movies = ref([]);
    const barChartData = ref(null);
    const pieChartData = ref(null);

    // Opciones para las gráficas
    const barChartOptions = ref({
      responsive: true,
      plugins: { legend: { position: 'top' } },
    });

    const pieChartOptions = ref({
      responsive: true,
      plugins: { legend: { position: 'bottom' } },
    });

    const TOTAL_SEATS = 20;

    const fetchAdminData = async () => {
      try {
        const response = await reservasService.getReservas();
        const reservations = response.data;

        if (!reservations || reservations.length === 0) {
          console.warn('No se encontraron reservas.');
          return;
        }

        const movieStats = calculateMovieStatistics(reservations, TOTAL_SEATS);

        const apiKey = '5877a1fcce98c7eafa67a3b52a7117b4';
        const movieDataResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es`
        );
        const movieData = movieDataResponse.data.results;

        const movieMap = {};
        movieData.forEach(movie => {
          movieMap[movie.id] = movie.title;
        });

        const enrichedStats = movieStats.map(stat => ({
          ...stat,
          title: movieMap[stat.movieId] || 'Desconocida',
        }));

        movies.value = enrichedStats;

        const barLabels = enrichedStats.map(movie => movie.title);
        const barData = enrichedStats.map(movie => movie.totalReservations);

        barChartData.value = {
          labels: barLabels,
          datasets: [
            {
              label: 'Reservas Totales',
              backgroundColor: '#36A2EB',
              data: barData,
            },
          ],
        };

        const pieData = enrichedStats.map(movie => movie.occupancyRate);
        pieChartData.value = {
          labels: barLabels,
          datasets: [
            {
              data: pieData,
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
            },
          ],
        };

        console.log('Datos para gráfica de barras:', barChartData.value);
        console.log('Datos para gráfica de pastel:', pieChartData.value);
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error);
      }
    };

    onMounted(fetchAdminData);

    return {
      movies,
      barChartData,
      pieChartData,
      barChartOptions,
      pieChartOptions,
    };
  },
};
</script>
