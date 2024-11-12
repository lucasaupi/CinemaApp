import { reactive } from 'vue';

// Inicializa el estado de autenticación con el valor almacenado en localStorage
export const authState = reactive({
  isAuthenticated: localStorage.getItem('userToken') !== null, // Verifica si el token existe
});

// Función para iniciar sesión
export const login = (token) => {
  authState.isAuthenticated = true;
  localStorage.setItem('userToken', token); // Guarda el token real si lo hay
};

// Función para cerrar sesión
export const logout = () => {
  authState.isAuthenticated = false;
  localStorage.removeItem('userToken'); // Elimina el token del localStorage
};
