import { reactive } from 'vue';

export const authState = reactive({
  isAuthenticated: localStorage.getItem('userToken') !== null, // Verifica si el token existe
});

export const login = (token) => {
  authState.isAuthenticated = true;
  localStorage.setItem('userToken', token); // Guarda el token real si lo hay
};

export const logout = () => {
  authState.isAuthenticated = false;
  localStorage.removeItem('userToken'); // Elimina el token del localStorage
};
