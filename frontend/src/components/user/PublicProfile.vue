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
import { baseApiUrl } from '@/global'
import axios from 'axios'
import Gravatar from 'vue-gravatar'

export default {
    name: 'PublicProfile',
    components: { Gravatar },
     data: function() {
        return {
            user: {}
        }
    },
    mounted() {
        const url = `${baseApiUrl}/users/${this.$route.params.id}`
        axios.get(url).then(res => this.user = res.data)
    },
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