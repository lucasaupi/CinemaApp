import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://672957ad6d5fa4901b6ce131.mockapi.io/cineort', // reemplaza 'your-endpoint' por tu URL de mockapi.io
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  // Obtener todas las reservas
  getReservas() {
    return apiClient.get('/reservas');
  },
  // Crear una nueva reserva
  createReserva(data) {
    return apiClient.post('/reservas', data);
  },
  // Actualizar una reserva
  updateReserva(id, data) {
    return apiClient.put(`/reservas/${id}`, data);
  },
  // Eliminar una reserva
  deleteReserva(id) {
    return apiClient.delete(`/reservas/${id}`);
  },
};