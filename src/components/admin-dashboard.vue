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
  import { BarChart, PieChart } from 'vue-chart-3';
  import axios from 'axios';
  
  export default {
    components: { BarChart, PieChart }, // Importamos las gráficas
    setup() {
      // Lista de KPIs
      const kpis = ref([]);
      // Datos de películas
      const movies = ref([]);
      // Datos para la gráfica de barras
      const barChartData = ref(null);
      // Datos para la gráfica de pastel
      const pieChartData = ref(null);
  
      // Configuración de opciones para las gráficas
      const barChartOptions = ref({
        responsive: true, // Gráfica ajustable al contenedor
        plugins: { legend: { position: 'top' } }, // Posición de la leyenda
      });
      const pieChartOptions = ref({
        responsive: true,
        plugins: { legend: { position: 'bottom' } },
      });
  
      // Función para cargar datos del servidor
      const fetchAdminData = async () => {
        try {
          // Petición a la API para los KPIs
          const kpiResponse = await axios.get('/api/admin/kpis');
          // Petición a la API para los datos de películas
          const movieDataResponse = await axios.get(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=es`);
          // Petición a la API para los datos de las gráficas
          const chartDataResponse = await axios.get('/api/admin/chart-data');
  
          // Asignar datos a las referencias reactivas
          kpis.value = kpiResponse.data; // KPIs
          movies.value = movieDataResponse.data; // Resumen de películas
          barChartData.value = {
            labels: chartDataResponse.data.bar.labels, // Etiquetas para la gráfica de barras
            datasets: chartDataResponse.data.bar.datasets, // Conjuntos de datos
          };
          pieChartData.value = {
            labels: chartDataResponse.data.pie.labels, // Etiquetas para la gráfica de pastel
            datasets: chartDataResponse.data.pie.datasets, // Conjuntos de datos
          };
        } catch (error) {
          console.error('Error al cargar los datos del panel:', error);
        }
      };
  
      // Cargar los datos al montar el componente
      onMounted(fetchAdminData);
  
      return {
        kpis,
        movies,
        barChartData,
        pieChartData,
        barChartOptions,
        pieChartOptions,
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
  