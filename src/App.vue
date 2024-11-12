<template>
  <div id="app">
    <div class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Contacto</a>
          </li>
        </ul>
        
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/Login">Login</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <button class="nav-link" @click="handleLogout">Logout</button>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { authState, logout } from './auth';
import { onMounted } from 'vue';

export default {
  name: 'App',
  computed: {
    isLoggedIn() {
      return authState.isAuthenticated;
    },
  },
  methods: {
    handleLogout() {
      logout();
      this.$router.push('/'); // Redirige al home después de hacer logout
    },
  },
  setup() {
    // Limpiar el token y restablecer el estado de autenticación al montar el componente
    onMounted(() => {
      localStorage.removeItem('userToken'); // Eliminar el token
      authState.isAuthenticated = false;    // Restablecer la autenticación a falso
    });
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800');

* {
  box-sizing: border-box;
}
#welcome-message {
    position: relative;
    top: 10%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px;
    background-color: transparent;
    text-align: center;
}

#welcome-message h1 {
    font-family: 'Cinzel', cursive;
    font-size: 4rem;
    color: rgb(197, 168, 109);
    margin-bottom: 10px; 
    text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.6), 
                 4px 4px 0 rgba(0, 0, 0, 0.5), 
                 6px 6px 0 rgba(0, 0, 0, 0.4);
    transform: translateZ(0);
}

#welcome-message p {
    font-family: 'Cinzel', cursive;
    font-size: 2rem;
    color: rgba(255, 255, 255, 0.8);
    text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.6), 
                 2px 2px 0 rgba(0, 0, 0, 0.5);
}

h1, h2, h3, h4, h5, h6, label, span {
  font-weight: 500;
  font-family: 'Fira Sans', sans-serif;
}

body, html, #app, #root, .auth-wrapper {
  width: 100%;
  height: 100%;
}

#app {
  text-align: center;
}

.auth-wrapper {
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: left;
}

.auth-inner {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.auth-wrapper .form-control:focus {
  border-color: #167bff;
  box-shadow: none;
}

.auth-wrapper h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

.custom-control-label {
  font-weight: 400;
}

.forgot-password a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7f7d7d;
  margin: 0;
}

.forgot-password a {
  color: #167bff;
}
</style>
