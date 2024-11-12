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
import { errorMessages } from "vue/compiler-sfc";
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import "../Styles/loginStyle.css";
import axios from "axios";
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
            try{
                const respuesta= await axios.get('https://672f6ea666e42ceaf15db204.mockapi.io/users/users',{
                    params: {
                        email: this.email,
                        password: this.password
                        
                    }
                    
                });
                console.log(respuesta)
                const user = respuesta.data.find(u=> u.email === this.email && u.password === this.password);
                if (user) {
                    this.$router.push('/SeatReservation');

                } else {
                    this.errorMessage='Usuario o password incorrecto';
                }
            } catch (error){
                this.errorMessage = 'Error de conexión';
            }
            
        }
    }
}
</script>

