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

<style scoped>
.auth-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.auth-inner {
    width: 400px;
    background: #ffffff;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.small-input {
    width: 100%;
    max-width: 300px;
}
</style>
