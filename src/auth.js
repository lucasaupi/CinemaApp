import { reactive } from 'vue';

export const authState = reactive({
  isAuthenticated: localStorage.getItem('userToken') !== null,
});

export const login = () => {
  authState.isAuthenticated = true;
  localStorage.setItem('userToken', 'some-token');  // Aca va el token real si hay
};

export const logout = () => {
  authState.isAuthenticated = false;
  localStorage.removeItem('userToken');
};
