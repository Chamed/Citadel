<template>
    <div class="container">
        <div class="profile-info">
            <Gravatar :email="host.email" alt="User"/>
            <h3>{{host.name}}</h3>
            <hr>
        </div>   
         <div style="display:flex;">
            <div class="friendship" style="margin-right: 20px">
                <span>Seguidores<i style="color:#479457;font-size: 1rem; margin-left: 5px;" class="fa fa-chevron-right"></i><span> {{following}}</span></span>
                <hr>
                <span>Seguindo<i style="color:#479457; font-size: 1rem;margin-left: 5px;" class="fa fa-chevron-right"></i><span> {{followers}} </span></span>
            </div>   
            <div class="bio">
                 <PageTitle icon="fa fa-id-badge" main="Bio"
                    sub="Um pouco sobre mim..."/>
            </div>
        </div>
        <b-button v-if="!isFollowing" id="follow-button" variant="success" @click="followUnfollow"> Seguir </b-button>
        <b-button v-if="isFollowing" id="follow-button" variant="success" @click="followUnfollow"> Deixar de seguir </b-button>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'
import Gravatar from 'vue-gravatar'
import PageTitle from '@/components/template/PageTitle'


export default {
    name: 'PublicProfile',
    components: { Gravatar, PageTitle },
    computed: mapState(['user']),
     data: function() {
        return {
            friendship: {},
            host:{},
            isFollowing: '',
            followers:{},
            following:{}
        }
    },
    async mounted() {
        await axios.get(`${baseApiUrl}/users/${this.$route.params.id}`).then(res => this.host = res.data)
        axios.get(`${baseApiUrl}/friendship?idFollower=${this.user.id}&idFollowing=${this.host.id}`).then(res => this.isFollowing = res.data.data.length == 0 ? false: true)
        axios.get(`${baseApiUrl}/friendship/${'idFollower'}/${this.host.id}`).then(res => this.followers = res.data.data.length)
        axios.get(`${baseApiUrl}/friendship/${'idFollowing'}/${this.host.id}`).then(res => this.following = res.data.data.length)

    },
    methods:{
        followUnfollow(){
            const url = window.location.pathname
            this.userId = parseInt(url.replace(/\D/g,''));

            if(!this.isFollowing){
                this.friendship.idFollower = this.user.id
                this.friendship.idFollowing = this.userId

                axios.post(`${baseApiUrl}/friendship`, this.friendship)
                    .then(() => {
                        this.isFollowing = true
                            axios.get(`${baseApiUrl}/friendship/${'idFollower'}/${this.host.id}`).then(res => this.followers = res.data.data.length)
                            axios.get(`${baseApiUrl}/friendship/${'idFollowing'}/${this.host.id}`).then(res => this.following = res.data.data.length)
                    })
                    .catch(showError)
            } else if(this.isFollowing){
                 axios.delete(`${baseApiUrl}/friendship?idFollower=${this.user.id}&idFollowing=${this.host.id}`)
                .then(() => {
                    this.isFollowing = false
                        axios.get(`${baseApiUrl}/friendship/${'idFollower'}/${this.host.id}`).then(res => this.followers = res.data.data.length)
                        axios.get(`${baseApiUrl}/friendship/${'idFollowing'}/${this.host.id}`).then(res => this.following = res.data.data.length)
                })
                .catch(showError)
            }
        },  
    }
}
</script>

<style>
    #follow-button{
        margin-top: 10px;
        width: 200px;
    }
</style>