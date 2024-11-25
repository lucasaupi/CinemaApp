import { reactive } from 'vue';

export const authState = reactive({
  isAuthenticated: localStorage.getItem('userToken') !== null,
  role: localStorage.getItem('userRole'),
});

export const login = (token, role) => {
  authState.isAuthenticated = true;
  authState.role = role;
  localStorage.setItem('userToken', token);
  localStorage.setItem('userRole', role);
};

export const logout = () => {
  authState.isAuthenticated = false;
  authState.role = null;
  localStorage.removeItem('userToken');
  localStorage.removeItem('userRole');
};