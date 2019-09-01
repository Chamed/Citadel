<template>
    <div class="container">
        <div class="profile-info">
            <Gravatar :email="user.email" alt="User"/>
            <h3 style="margin: 0px 0px 30px 10px; font-weight: bolder">{{user.name}}</h3>
            <hr>
        </div>
        <div style="display:flex;">
            <div class="friendship" style="margin-right: 20px">
                <span>Seguidores<i style="color:#479457;font-size: 1rem; margin-left: 5px;" class="fa fa-chevron-right"></i><span> {{followers}}</span></span>
                <hr>
                <span>Seguindo<i style="color:#479457; font-size: 1rem;margin-left: 5px;" class="fa fa-chevron-right"></i><span> {{following}}</span></span>
            </div>   
            <div class="bio">
                 <PageTitle icon="fa fa-id-badge" main="Bio"
                    sub="Um pouco sobre mim..."/>
            </div>
        </div>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'
import Gravatar from 'vue-gravatar'
import PageTitle from '@/components/template/PageTitle'


export default {
    name: 'Profile',
    components: { Gravatar, PageTitle},
    computed: mapState(['user']),
     data: function() {
        return {
            followers:{},
            following:{}
        }
    },
    mounted() {
        axios.get(`${baseApiUrl}/friendship/${'idFollower'}/${this.user.id}`).then(res => this.following = res.data.data.length)
        axios.get(`${baseApiUrl}/friendship/${'idFollowing'}/${this.user.id}`).then(res => this.followers = res.data.data.length)

    },
}
</script>

<style>
.profile-info{
    background-image: url("https://www.oficinadanet.com.br/imagens/post/9638/off-button-facebook-cover.jpg");
    background-size: 900px 214px;
    display: flex;
    align-items: flex-end;
    color: #dcdcdc;
    background-color: #323232;
    padding: 15px;
    border-radius: 15px;
    max-width: 1000px;
    border-bottom: solid 7px #479457;
}
.profile-info img{
    margin-top: 100px;
    border: solid 2px #fff;
    border-radius: 50%;
}
.friendship {
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    color: #dcdcdc;
    background-color: #323232;
    padding: 15px;
    border-radius: 15px;
    min-width: 200px;
    border-bottom: solid 5px #479457;
    font-size: 1.3rem;
}
.bio{
    margin-top: 20px;
    display:flex;
    flex-direction: column;
    color: #dcdcdc;
    background-color: #323232;
    padding: 15px;
    border-radius: 15px;
    min-width: 300px;
    border-bottom: solid 5px #479457;
    font-size: 1.8rem;
}
.bio h1{
    font-size: 1.8rem;
}

</style>