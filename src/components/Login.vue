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
        </div>
    </div>
</template>

<script>
import "../Styles/loginStyle.css";
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            console.log('Email:', this.email);
            console.log('Password:', this.password);
        }
    }
}
</script>

