
<template>
    <div id="app">
        <div class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/Login">Login</router-link>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Contacto</a>
              </li>

          
            </ul>
          </div>
        </div>
    </div>
  </template>
  
  <script>
  import "../Styles/homeStyle.css";
  export default {
    name: 'HomePage',
  };
  </script>
  

  