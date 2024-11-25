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
                    <input v-model="password" type="password" class="form-control small-input" placeholder="Password"
                        required>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Login</button>
            </form>
            <p v-if="errorMessage">{{ errorMessage }}</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import { login } from '../auth';

export default {
    name: 'Login',
    setup() {
        const email = ref('');
        const password = ref('');
        const errorMessage = ref('');
        const router = useRouter();
        const route = useRoute();

        const handleLogin = async () => {
            try {
                const respuesta = await axios.get('https://672f6ea666e42ceaf15db204.mockapi.io/users/users', {
                    params: {
                        email: email.value,
                        password: password.value,
                    },
                });
                const user = respuesta.data.find(u => u.email === email.value && u.password === password.value);

                if (user) {
                    login(user.token, user.Categoria);

                    const redirectTo = route.query.redirectTo || '/';
                    const selectedMovieId = localStorage.getItem('selectedMovieId');
                    if (selectedMovieId) {
                        router.push(`/reservation/${selectedMovieId}`);
                        localStorage.removeItem('selectedMovieId');
                    } else {
                        router.push(redirectTo);
                    }
                } else {
                    errorMessage.value = 'Usuario o password incorrecto';
                }
            } catch (error) {
                errorMessage.value = 'Error de conexión';
            }
        };

        return { email, password, errorMessage, handleLogin };
    },
};
</script>