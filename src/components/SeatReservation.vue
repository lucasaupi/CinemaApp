<template>
  <div>
    <h2>Reserva de Asientos para la Película ID: {{ movieId }}</h2>
    <div class="seats">
      <div v-for="(seat, index) in seats" :key="index"
        :class="{ 'seat': true, 'available': seat.available, 'booked': !seat.available, 'selected': selectedSeats.includes(index) }"
        @click="toggleSeat(index)" :style="{ cursor: seat.available ? 'pointer' : 'not-allowed' }"></div>
    </div>
    <div>
      <label for="ticketCount">Entradas: </label>
      <input type="number" id="ticketCount" v-model.number="ticketCount" min="1" @input="updateSelectedSeats" />
    </div>
    <div>
      <h3>Asientos Seleccionados: {{ selectedSeats.join(', ') }}</h3>
      <button @click="confirmSelection">Confirmar Reserva</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import apiService from '../services/apiService';
import "../Styles/seatReservation.css";

export default {
  setup() {
    const seats = ref(Array.from({ length: 20 }, () => ({ available: true })));
    const selectedSeats = ref([]);
    const ticketCount = ref(1);
    const route = useRoute();
    const movieId = ref(route.params.id);
    const reservas = ref([]);
    const nuevaReserva = ref({ movieId: '', asientos: [] });

    const toggleSeat = (index) => {
      const seatAvailable = seats.value[index].available;
      if (seatAvailable) {
        if (selectedSeats.value.includes(index)) {
          selectedSeats.value = selectedSeats.value.filter(seat => seat !== index);
        } else if (selectedSeats.value.length < ticketCount.value) {
          selectedSeats.value.push(index);
        }
      }
    };

    const updateSelectedSeats = () => {
      if (selectedSeats.value.length > ticketCount.value) {
        selectedSeats.value = selectedSeats.value.slice(0, ticketCount.value);
      }
    };

    const confirmSelection = async () => {
      if (selectedSeats.value.length === ticketCount.value) {
        try {
          nuevaReserva.value = {
            movieId: movieId.value,
            asientos: selectedSeats.value,
          };

          const response = await apiService.createReserva(nuevaReserva.value);
          reservas.value.push(response.data);
          console.log('Reserva exitosa:', response.data);

          selectedSeats.value.forEach(seat => {
            seats.value[seat].available = false;
          });
          console.log(localStorage.getItem('userRole'))

          alert('Reservas confirmadas: ' + selectedSeats.value.join(', '));
          selectedSeats.value = []; // Reiniciar selección después de la confirmación
        } catch (error) {
          console.error('Error al hacer la reserva:', error);
        }
      } else {
        alert('Debes seleccionar ' + ticketCount.value + ' asientos.');
      }
    };
    const loadReservedSeats = async () => {
      try {
        const allReservas = await apiService.getReservas();

        const reservasForMovie = allReservas.data.filter(reserva => reserva.movieId === movieId.value);

        seats.value = Array.from({ length: 20 }, (_, index) => ({
          available: !reservasForMovie.some(reserva => reserva.asientos.includes(index))
        }));

      } catch (error) {
        console.error('Error al cargar las reservas:', error);
      }
    };
    onMounted(loadReservedSeats);
    return { seats, selectedSeats, ticketCount, toggleSeat, confirmSelection, updateSelectedSeats, movieId };
  },
};
</script>
