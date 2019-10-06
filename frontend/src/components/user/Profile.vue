<template>
    <div class="container">
    <div class="profile-info">
            <Gravatar :email="user.email" alt="User"/>
            <h3 style="margin: 0px 0px 30px 10px; font-weight: bolder">{{user.name}}</h3>
            <hr>
        </div>
        <div style="display:flex;">
            <div class="friendship" style="margin-right: 20px">
                <span v-b-modal.followers style="cursor:pointer;">Seguidores<i style="color:#479457;font-size: 1rem; margin-left: 5px;" class="fa fa-chevron-right"></i><span> {{followers.length}}</span></span>
                <hr>
                <span v-b-modal.following style="cursor:pointer;">Seguindo<i style="color:#479457; font-size: 1rem;margin-left: 5px;" class="fa fa-chevron-right"></i><span> {{following.length}}</span></span>
            </div>   
            <div v-b-modal.bio class="bio" style="cursor:pointer">
                <PageTitle icon="fa fa-id-badge" main="Bio"
                    sub="Um pouco sobre mim..."/>
                <p style="font-size: 1.4rem; text-overflow: ellipsis; overflow: hidden;">
                    {{bio}}
                </p>
            </div>
             <div class="rating">
                <PageTitle icon="fa fa-star" main="Avaliação"
                sub=""/>
                    <p>
                        <span style="margin-left: 100px; font-size: 2rem">{{grade.toFixed(1)}}</span><span style="margin-left: 10px"><i class="fa fa-star rated"></i></span>
                    </p>
            </div>
        </div>
        <div>
            <b-modal scrollable hide-footer=true id="followers" title="Seguidores">
                <li class="friendship-modal" v-for="follower in followers" :key="follower.email">
                    <router-link :to="{ name: 'publicProfile', params: { id: follower.id } }">
                        <Gravatar :email="follower.email" alt="User"/>
                            <span style="font-size: 20px; margin: 15px 0px 0px 10px">{{ follower.name }}</span>
                    </router-link>
                    <hr>
                </li>
            </b-modal>
            <b-modal @ok="saveBio" scrollable id="bio" title="Bio">
                <textarea @change="attBio" v-model="user.bio" id="bio">
                </textarea>
            </b-modal>
            <b-modal scrollable hide-footer=true id="following" title="Seguindo">
                <li class="friendship-modal" v-for="following in following" :key="following.email">
                   <router-link :to="{ name: 'publicProfile', params: { id: following.id } }">
                        <Gravatar :email="following.email" alt="User"/>
                            <span style="font-size: 20px; margin: 15px 0px 0px 10px">{{ following.name }}</span>
                    </router-link>
                    <hr>
                </li>
            </b-modal>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
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
            following:{},
            coverImg: '',
            grade: 0,
            bio: '',
            textBio:''
        }
    },
    mounted() {
        axios.get(`${baseApiUrl}/friendship/${'idFollower'}/${this.user.id}`).then(res => this.following = res.data.data)
        axios.get(`${baseApiUrl}/friendship/${'idFollowing'}/${this.user.id}`).then(res => this.followers = res.data.data)
        axios.get(`${baseApiUrl}/users/${this.user.id}`).then(res => this.bio = res.data.bio);

        let grades = []
        axios.get(`${baseApiUrl}/rating?id=${this.user.id}`)
            .then(res => {
                for(let i = 0; i < res.data.data.length; i++){
                    grades.push(res.data.data[i].grade) 
                }
                this.grade = grades.length > 0 ? (grades.reduce((a, b) => a + b, 0) / grades.length) : 0
            }
        )
    },  
    methods:{
        saveBio(){
            axios.get(`${baseApiUrl}/users/${this.user.id}`).then(res => {
                let user = res.data
                user.bio = this.textBio
                user.confirmPassword = user.password
                user.update = true        
                axios.put(`${baseApiUrl}/users/${this.user.id}`, user).then(res => {
                    axios.get(`${baseApiUrl}/users/${this.user.id}`).then(res => this.bio = res.data.bio);
                });
            });
        },
        attBio(){
            this.textBio = event.target.value
        }
    }
}
</script>

<style>
#bio{
    background: #323232;
    border: none;
    resize: none;
    width: 100%;
    height: 100%;
    vertical-align:top;
    font-size: 15px;
    color: #dcdcdc;
}
.friendship-modal{
    list-style-type: none;
}
.friendship-modal a{
    text-decoration: none;
    color: #dcdcdc;
    cursor: pointer;
}
.friendship-modal img{
    border: solid 2px #fff;
    border-radius: 50%;
    height: 40px;
    cursor: pointer;
}
.profile-info{
    background-size: 800px 214px;
    background-image: url("https://optclean.com.br/wp-content/uploads/2017/03/filme-capa-para-twitter-bruce-lee.jpg");
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
    min-width: 400px;
    border-bottom: solid 5px #479457;
    font-size: 1.8rem;
    overflow: visible;
}
.rating{
    margin-top: 20px;
    margin-left: 15px;
    display:flex;
    flex-direction: column;
    color: #dcdcdc;
    background-color: #323232;
    padding: 15px;
    border-radius: 15px;
    min-width: 300px;
    border-bottom: solid 5px #479457;
    font-size: 1.8rem;
    overflow: visible;
}
.bio h1{
    font-size: 1.8rem;
}
.modal-dialog-scrollable .modal-header{
    background-color: #323232;
    border-bottom: solid 5px #479457;
    color: #dcdcdc;
}
.modal-header .close{
    color: #F45B69; 
}
.modal-dialog-scrollable .modal-body{
    background-color: #444;
}
.modal-dialog-scrollable .modal-content {
    background-color: transparent;
}
</style>