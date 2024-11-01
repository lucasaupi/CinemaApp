<template>
    <div>
      <h2>Reserva de Asientos para la Película ID: {{ movieId }}</h2>
      <div class="seats">
      <div
        v-for="(seat, index) in seats"
        :key="index"
        :class="{'seat': true, 'available': seat.available, 'booked': !seat.available, 'selected': selectedSeats.includes(index)}"
        @click="toggleSeat(index)"
        :style="{ cursor: seat.available ? 'pointer' : 'not-allowed' }"
      ></div>
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
  
  export default {
    setup() {
        const seats = ref(Array.from({ length: 20 }, (_, i) => ({ available: Math.random() > 0.3 })));
        const selectedSeats = ref([]);
        const ticketCount = ref(1);
      const route = useRoute();
      const movieId = ref(route.params.id);

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

    const confirmSelection = () => {
      if (selectedSeats.value.length === ticketCount.value) {
        selectedSeats.value.forEach(seat => {
          seats.value[seat].available = false; // Marcar como reservado
        });
        alert('Reservas confirmadas: ' + selectedSeats.value.join(', '));
        selectedSeats.value = []; // Reiniciar selección
      } else {
        alert('Debes seleccionar ' + ticketCount.value + ' asientos.');
      }
    };
      return { seats, selectedSeats, ticketCount, toggleSeat, confirmSelection, updateSelectedSeats,movieId };
    },
  };
  </script>

<style>
.seats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}
.seat {
  width: 60px;
  height: 50px;
  background-color: #ccc;
  border-radius: 10px 10px 0 0; /* Respaldo redondeado */
  position: relative;
  border: 2px solid #333;
  cursor: pointer;
}

.seat::before {
  content: '';
  position: absolute;
  top: -15px; /* Respaldo que sobresale */
  left: 5px;
  right: 5px;
  height: 15px;
  background-color: inherit;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 2px solid #333;
  border-bottom: none;
}

.available {
  background-color: green;
}
.booked {
  background-color: red;
}
.selected {
  background-color: blue;
}
</style>
  