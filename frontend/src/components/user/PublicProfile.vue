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
                    <p>
                    {{host.bio}}
                    </p>
            </div>
             <div @click="onModalOpen" v-b-modal.grade class="rating">
                <PageTitle icon="fa fa-star" main="Avaliação"
                sub=""/>
                 <p>
                    <span style="margin-left: 100px; font-size: 2rem">{{grade.toFixed(1)}}</span><span style="margin-left: 10px"><i class="fa fa-star rated"></i></span>
                </p>
            </div>
        </div>
        <b-button v-if="!isFollowing" id="follow-button" variant="success" @click="followUnfollow"> Seguir </b-button>
        <b-button v-if="isFollowing" id="follow-button" variant="success" @click="followUnfollow"> Deixar de seguir </b-button>

        <b-modal scrollable hide-footer=true id="grade" title="Avaliação">
            <div class="rating-div">
                <span @click="rate" style="cursor:pointer; margin-right: 10px"><i id="1" class="fa fa-star"></i></span>
                <span @click="rate" style="cursor:pointer; margin-right: 10px"><i id="2" class="fa fa-star"></i></span>
                <span @click="rate" style="cursor:pointer; margin-right: 10px"><i id="3" class="fa fa-star"></i></span>
                <span @click="rate" style="cursor:pointer; margin-right: 10px"><i id="4" class="fa fa-star"></i></span>
                <span @click="rate" style="cursor:pointer; margin-right: 10px"><i id="5" class="fa fa-star"></i></span>
            </div>
        </b-modal>
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
            following:{},
            rates: [],
            rated: {},
            grade: 0
        }
    },
    async mounted() {
        await axios.get(`${baseApiUrl}/users/${this.$route.params.id}`).then(res => this.host = res.data)
        axios.get(`${baseApiUrl}/friendship?idFollower=${this.user.id}&idFollowing=${this.host.id}`).then(res => this.isFollowing = res.data.data.length == 0 ? false: true)
        axios.get(`${baseApiUrl}/friendship/${'idFollower'}/${this.host.id}`).then(res => this.followers = res.data.data.length)
        axios.get(`${baseApiUrl}/friendship/${'idFollowing'}/${this.host.id}`).then(res => this.following = res.data.data.length)
        let grades = []
        axios.get(`${baseApiUrl}/rating?id=${this.host.id}`)
            .then(res => {
                for(let i = 0; i < res.data.data.length; i++){
                    this.rates.push(res.data.data[i])
                    grades.push(res.data.data[i].grade) 
                }
                this.grade = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length) : 0
                this.rated = this.rates ? this.rates.filter(rate => rate.userId == this.user.id): null
            }
        )

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
        onModalOpen(){
            let rated = this.rated ? this.rated[0].grade : null
            setTimeout(function() {
                for(let i = rated; i >= 1; i --){
                        document.getElementById(i).classList.add('rated')
                    }
                }, rated, 100)
        },
        rate(){
            const ownerId = parseInt(window.location.pathname.replace(/\D/g,''));
            const userId = this.user.id

            const grade = event.target.id
            const rate = {ownerId, userId, grade}
            if(this.rated[0]){
                let grades = []
                axios.post(`${baseApiUrl}/rating?id=${this.rated[0].id}`, rate)
                    .then(() => {
                        document.getElementById(1).classList.remove('rated')
                        document.getElementById(2).classList.remove('rated')
                        document.getElementById(3).classList.remove('rated')
                        document.getElementById(4).classList.remove('rated')
                        document.getElementById(5).classList.remove('rated')
                        for(let i = grade; i >= 1; i --){
                            document.getElementById(i).classList.add('rated')
                        }
                          axios.get(`${baseApiUrl}/rating?id=${this.host.id}`)
                            .then(res => {
                                for(let i = 0; i < res.data.data.length; i++){
                                    this.rates = []
                                    this.rates.push(res.data.data[i])
                                    grades.push(res.data.data[i].grade) 
                                }
                                this.rated = this.rates ? this.rates.filter(rate => rate.userId == this.user.id): null
                                this.grade = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length) : 0
                                this.rated = this.rates ? this.rates.filter(rate => rate.userId == this.user.id): null
                            }
                        )
                    })
                .catch(showError)
            } else {
                let grades = []
                axios.post(`${baseApiUrl}/rating`, rate)
                    .then(() => {
                        for(let i = grade; i >= 1; i --){
                            document.getElementById(i).classList.add('rated')
                        }
                          axios.get(`${baseApiUrl}/rating?id=${this.host.id}`)
                            .then(res => {
                                for(let i = 0; i < res.data.data.length; i++){
                                    this.rates = []
                                    this.rates.push(res.data.data[i])
                                    grades.push(res.data.data[i].grade) 
                                }
                                this.rated = this.rates ? this.rates.filter(rate => rate.userId == this.user.id): null
                                this.grade = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length) : 0
                                this.rated = this.rates ? this.rates.filter(rate => rate.userId == this.user.id): null
                            }
                        )
                    })
                .catch(showError)
            }
        }
    }
}
</script>

<style>
    #follow-button{
        margin-top: 10px;
        width: 200px;
    }
    .rating-div{
        font-size: 50px;
        margin-left: 100px;
    }
    .rated{
        color: #C6AD0F;
    }
</style>