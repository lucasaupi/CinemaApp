<template>
    <div class="auth-wrapper">
        <div class="auth-inner">
            <form @submit.prevent="handleLogin">
                <h3>Login</h3>
                <div class="form-group">
                    <label>Email</label>
                    <input v-model="email" type="email" class="form-control small-input" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input v-model="password" type="password" class="form-control small-input" placeholder="Password" required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
            <p v-if="errorMessage"> {{ errorMessage }} </p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { login } from '../auth';

export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
        };
    },
    methods: {
        async handleLogin() {
            try {
                const respuesta = await axios.get('https://672f6ea666e42ceaf15db204.mockapi.io/users/users', {
                    params: {
                        email: this.email,
                        password: this.password,
                    },
                });

                const user = respuesta.data.find(u => u.email === this.email && u.password === this.password);
                if (user) {
                    localStorage.setItem('userToken', 'some-token');
                    const selectedMovieId = localStorage.getItem('selectedMovieId'); // Recupera el ID de la película
                    localStorage.removeItem('selectedMovieId'); // // Redirigimos al home

                    const route = selectedMovieId
                        ? `/reservation/${selectedMovieId}`
                        : (this.$route.query.redirectTo || '/');
                    this.$router.push(route);
                } else {
                    this.errorMessage = 'Usuario o password incorrecto';
                }
            } catch (error) {
                this.errorMessage = 'Error de conexión';
            }
        },
    },
};
</script>
