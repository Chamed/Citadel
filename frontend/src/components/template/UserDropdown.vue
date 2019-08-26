<template>
    <div class="user-dropdown">
        <div class="user-button">
            <span class="d-none d-sm-block">{{user.name}}</span>
            <div class="user-dropdown-img">
                <Gravatar :email="user.email" alt="User"/>
            </div>
            <i class="fa fa-angle-down"></i>
        </div>
        <div class="user-dropdown-content">
            <router-link to="/admin" v-if="user.admin" title="Administração">
                <i class="fa fa-cogs"></i>
                <span>Administração</span>
            </router-link>
            <router-link to="/profile" title="Perfil">
              <i class="fa fa-user"></i>
                <span>Perfil</span>
            </router-link>
             <a href @click.prevent="logout" title="Sair">
                 <i class="fa fa-sign-out"></i>
                 <span>Sair</span>
             </a>
        </div>
    </div>
</template>

<script>
import { userKey } from '@/global'
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

export default {
    name: 'UserDropdown',
    components: { Gravatar },
    computed: mapState(['user']),
    methods: {
        logout() {
            localStorage.removeItem(userKey)
            this.$store.commit('setUser', null)
            this.$router.push({ name: 'auth'})
        }
    }
}
</script>

<style>
    .user-dropdown{
        position: relative;
        height: 100%;
    }
    .user-button{
        display: flex;
        align-items: center;
        color: #DCDCDC;
        font-weight: 100;
        height: 100%;
        padding: 0px 30px;
    }
    .user-button:hover{
        display: flex;
        align-items: center;
        color: #fff ;
        font-weight: 100;
        height: 100%;
        padding: 0px 30px;
    }
    .user-dropdown:hover{
        background-color: rgba(0, 0 ,0 ,0.2);
    }
    .user-dropdown-img{
        margin: 0px 10px;
    }
    .user-dropdown-img > img{
        max-height: 37px;
        border-radius: 5px;
    }
    .user-dropdown-content{
        position: absolute;
        right: 0px;
        background-color: #424242;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        padding: 10px;
        z-index: 20;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }
    .user-dropdown:hover .user-dropdown-content{
        visibility: visible;
        opacity: 1;
    }
    .user-dropdown-content a{
        text-decoration: none;
        color: #DCDCDC;
        padding: 10px;
    }
    .user-dropdown-content a:hover{
        text-decoration: none;
        color: #DCDCDC;
        background-color: #323232;

    }
    .user-dropdown-content i {
        margin-right: 5px;
    }
</style>
