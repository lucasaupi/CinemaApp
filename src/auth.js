import { reactive } from 'vue';

export const authState = reactive({
  isAuthenticated: localStorage.getItem('userToken') !== null, // Verifica si el token existe
  role: localStorage.getItem('userRole'), // Verifica si hay un rol almacenado
});

// Función de login
export const login = (token, role) => {
  authState.isAuthenticated = true;
  authState.role = role; // Guarda el rol del usuario
  localStorage.setItem('userToken', token); // Guarda el token real
  localStorage.setItem('userRole', role); // Guarda el rol del usuario
};

// Función de logout
export const logout = () => {
  authState.isAuthenticated = false;
  authState.role = null; // Limpia el rol
  localStorage.removeItem('userToken'); // Elimina el token del localStorage
  localStorage.removeItem('userRole'); // Elimina el rol del localStorage
};