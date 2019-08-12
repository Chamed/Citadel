<template>
    <div class="auth-content">
        <div class="auth-modal">
            <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login'}} </div>
            <hr>

            <input class="strong-color" v-if="showSignup" v-model="user.name" type="text" placeholder="Nome">
            <input class="strong-color" v-model="user.email" name="email" type="text" placeholder="E-mail">
            <input class="strong-color" v-model="user.password" name="password" type="password" placeholder="Senha">
            <input class="strong-color" v-if="showSignup" v-model="user.confirmPassword" type="password" placeholder="Confirme a sua senha">

            <button class="button-login-register" v-if="showSignup" @click="signup">Registrar</button>
            <button class="button-login-register" v-else @click="signin">Entrar</button>

            <a href @click.prevent="showSignup = !showSignup">
                <span v-if="showSignup">Já é cadastrado? Efetue o Login</span>
                 <span v-else>Registre-se aqui</span>
            </a>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError, userKey} from '@/global'
import axios from 'axios'

export default {
    name: "Auth",
    data: function(){
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                    this.$store.commit('setUser', res.data)
                    localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
                .catch(showError)
        },
        signup(){
            axios.post(`${baseApiUrl}/signup`, this.user)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.user = {}
                this.showSignup = false
            })
            .catch((showError))
        }
    }
}
</script>

<style>

     .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #323232;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        border-bottom: solid 5px #479457;
        border-radius: 10px 10px 0px 0px;

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
        color: #dcdcdc;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
        text-decoration: none;
        color: #dcdcdc;
    }
     .auth-modal a:hover {
        margin-top: 35px;
        text-decoration: none;
        color: #a5a4a4;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
    .button-login-register{
        background-color: #479457 !important;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
    }
    .button-login-register:hover{
        background-color: #327a40 !important;
        border: none;
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
    }
    .strong-color{
        color: #272727 !important;
    }
</style>
