import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://672957ad6d5fa4901b6ce131.mockapi.io/cineort', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getReservas() {
    return apiClient.get('/reservas');
  },
  createReserva(data) {
    return apiClient.post('/reservas', data);
  },
  updateReserva(id, data) {
    return apiClient.put(`/reservas/${id}`, data);
  },
  deleteReserva(id) {
    return apiClient.delete(`/reservas/${id}`);
  },
};