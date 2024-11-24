<template>
    <div class="admin-dashboard">
      <h1>Panel de Administración</h1>
  
      <!-- KPIs (Indicadores clave de rendimiento) -->
      <div class="kpi-container">
        <!-- Mostramos cada KPI como una tarjeta -->
        <div class="kpi-card" v-for="kpi in kpis" :key="kpi.title">
          <h3>{{ kpi.title }}</h3> <!-- Título del KPI -->
          <p>{{ kpi.value }}</p> <!-- Valor del KPI -->
        </div>
      </div>
  
      <!-- Gráficas -->
      <div class="charts-container">
        <!-- Gráfica de barras -->
        <div class="chart">
          <BarChart :chart-data="barChartData" :chart-options="barChartOptions" />
        </div>
        <!-- Gráfica de pastel -->
        <div class="chart">
          <PieChart :chart-data="pieChartData" :chart-options="pieChartOptions" />
        </div>
      </div>
  
      <!-- Tabla de resumen por película -->
      <h2>Resumen por Película</h2>
      <table class="movie-summary">
        <thead>
          <tr>
            <th>Película</th> <!-- Título de la película -->
            <th>Reservas Totales</th> <!-- Número total de reservas -->
            <th>Asientos Disponibles</th> <!-- Número de asientos disponibles -->
            <th>Porcentaje Ocupación</th> <!-- Porcentaje de ocupación -->
          </tr>
        </thead>
        <tbody>
          <!-- Iteramos sobre las películas para mostrar los datos en la tabla -->
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
import reservasService from '../services/apiService'; // Importamos el servicio
import { calculateMovieStatistics } from '../services/estadisticasService'; // Importamos el servicio de estadísticas
import axios from 'axios';


export default {
  setup() {
    const movies = ref([]);
    const barChartData = ref(null);
    const pieChartData = ref(null);

    const TOTAL_SEATS = 20; // Capacidad fija de asientos por película

    // Función para cargar los datos de reservas y estadísticas
    const fetchAdminData = async () => {
      try {
        // Llamada al servicio de reservas
        const response = await reservasService.getReservas();
        const reservations = response.data;

        // Calcular estadísticas usando la capacidad fija
        const movieStats = calculateMovieStatistics(reservations, TOTAL_SEATS);

        // Enriquecer con títulos de películas si tienes otra API (opcional)
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

        // Asignar datos a la tabla
        movies.value = enrichedStats;

        // Preparar datos para las gráficas
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
              label: 'Porcentaje Ocupación',
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
              data: pieData,
            },
          ],
        };
      } catch (error) {
        console.error('Error al cargar los datos del panel:', error);
      }
    };

    // Cargar los datos al montar el componente
    onMounted(fetchAdminData);

    return {
      movies,
      barChartData,
      pieChartData,
    };
  },
};

  </script>
  
  <style scoped>
  /* Estilo general del panel de administración */
  .admin-dashboard {
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  /* Contenedor de las tarjetas de KPIs */
  .kpi-container {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
  }
  
  /* Tarjetas individuales de KPIs */
  .kpi-card {
    background: #2a2a2a; /* Fondo oscuro */
    color: #fff; /* Texto blanco */
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    flex: 1;
  }
  
  /* Estilo para los gráficos */
  .charts-container {
    display: flex;
    gap: 30px;
    margin-bottom: 30px;
  }
  
  .chart {
    flex: 1;
    background: #f4f4f4; /* Fondo claro */
    padding: 20px;
    border-radius: 8px;
  }
  
  /* Tabla de resumen */
  .movie-summary {
    width: 100%;
    border-collapse: collapse;
  }
  
  .movie-summary th,
  .movie-summary td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  .movie-summary th {
    background: #f0f0f0;
  }
  
  .movie-summary tbody tr:nth-child(even) {
    background: #f9f9f9;
  }
  </style>
  