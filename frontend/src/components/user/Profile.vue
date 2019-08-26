<template>
    <div class="container">
        <div class="profile-info">
            <Gravatar :email="user.email" alt="User"/>
            <h3>{{user.name}}</h3>
            <hr>
        </div>   
    </div>
</template>

<script>
// import { baseApiUrl, showError } from '@/global'
 import { mapState } from 'vuex'
// import axios from 'axios'
import Gravatar from 'vue-gravatar'

export default {
    name: 'Profile',
    components: { Gravatar },
    computed: mapState(['user']),
}
</script>

<style>
.profile-info{
    display: flex;
    color: #dcdcdc;
    background-color: #323232;
    padding: 15px;
    border-radius: 15px;
    max-width: 500px;
}
.profile-info img{
    border: solid 2px #fff;
    border-radius: 50%;
}

</style>