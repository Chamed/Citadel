<template>
    <div>
        <b-form>
            <b-form-textarea class="comment" id="comment-content" type="text"
                v-model="comment.comment" required 
                placeholder="Digite seu comentário..."
                rows="3"
                max-rows="6">
            </b-form-textarea>
            <b-button id="comment-button" variant="success" @click="save"> Comentar</b-button>
        </b-form>
         <div class="comments">
            <div v-for="comment in comments" :key="comment.id">
                <div class="comment-item">
                    <div class="avatar-button">
                        <div class="avatar-name">
                            <Gravatar :email="comment.email" alt="User"/>
                            <span>
                                {{ comment.author }}
                            </span>
                        </div>
                        <span>
                            <strong class="grey">{{comment.createdAt | moment("LLLL")}}</strong>
                        </span>
                        <b-button v-if="comment.email == user.email || user.admin" variant="danger"
                                  @click="remove(comment.id)"> Excluir</b-button>
                    </div>
                    <hr>
                    <div class="comment-content">
                        <p>{{ comment.comment }}</p>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import { baseApiUrl, showError } from '@/global'
import { mapState } from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import Gravatar from 'vue-gravatar'
const moment = require('moment')
require('moment/locale/pt-br')

Vue.use(require('vue-moment'),{
    moment
});


export default {
    name: 'Comment',
    data: function() {
        return {
            comment: {},
            comments: [],
        }
    },
    components: { Gravatar },
    computed: mapState(['user']),
    methods:{
        save() {
            const url = window.location.pathname
            this.postId = url.replace(/\D/g,'');
            this.comment.userId = this.user.id
            this.comment.postId = this.postId
            this.comment.createdAt = new Date()
            axios.post(`${baseApiUrl}/comments`, this.comment)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.reset()
                this.getComments()
            })
            .catch(showError)
        },
        reset() {
            this.comment = {}
        },
         remove(comment) {
            axios.delete(`${baseApiUrl}/comments?id=${comment}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.getComments()
                })
                .catch(showError)
        },
        getComments() {
            const url = window.location.pathname
            this.postId = url.replace(/\D/g,'');
            axios.get(`${baseApiUrl}/comments?id=${this.postId}`)
                .then(res => {
                    this.comments = res.data.data
                })
        },
    },
    mounted() {
        this.getComments()
    },
}
</script>

<style>
    .comment{
        overflow-y: hidden !important;
    }
    .comments{
        margin-top:20px;
    }
    .comment-item{
        margin-bottom: 20px;
        background-color: #323232;
        padding: 0px 20px;
        border-radius: 10px;
        border-bottom: 5px solid #479457;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
        
    }

    .comment-item span{
        color: #fff;
    }

     .comment-item img{
        border-radius: 50%;
        margin: 15px;
    }

    .comment-item hr{
        background-color: #777;
    }

    .grey{
        color:#666;
    }
    .btn-success, .btn-primary {
        background-color: #479457;
        border-color: #479457;
    }
    .btn-success:hover,.btn-primary:hover {
 
        color: #fff;
        background-color: #376547;
        border-color: #376547;
        transition: 0.2s ease-in;
    }
    #comment-button{
        margin-top: 10px;
        width: 100%;
    }

    .avatar-button {
        display: flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        -webkit-align-items: center;
        align-items: center;
    }
</style>