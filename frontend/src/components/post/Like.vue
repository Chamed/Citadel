<template>
    <div>
        <i @click="likeDislike" id="like" class="fa fa-thumbs-up like"></i><span class='likes-span'>{{this.likes.length}} Usuários curtiram essa postagem </span>
    </div>
</template>

<script>
import { baseApiUrl, showError} from '@/global'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'Like',
    computed: mapState(['user']),
    data: function() {
        return {
            likes: [],
            isLiked: false,
            like: {}
        }
    },
    mounted: function(){
        const url = window.location.pathname
        this.postId = url.replace(/\D/g,'');

        axios.get(`${baseApiUrl}/likes?id=${this.postId}`)
            .then(res => {
                for(let i = 0; i < res.data.data.length; i++){
                    this.likes.push(res.data.data[i].userId)
                }
                this.isLiked = this.likes.filter(id => id == this.user.id)

                this.isLiked.length != 0 ? 
                    document.getElementById('like').classList.add('liked'):
                    document.getElementById('like').classList.remove('liked')
            }
        )
    },
    methods:{
        likeDislike(){
            const url = window.location.pathname
            this.postId = url.replace(/\D/g,'');

            if(!document.getElementById('like').classList.contains('liked')){
                document.getElementById('like').classList.add('liked')
                this.like.userId = this.user.id
                this.like.postId = this.postId

                axios.post(`${baseApiUrl}/likes`, this.like)
                    .then(() => {
                        this.getLikes()
                    })
                    .catch(showError)
            } else if (document.getElementById('like').classList.contains('liked')){
                document.getElementById('like').classList.remove('liked')
                axios.delete(`${baseApiUrl}/likes?id=${this.user.id}&postId=${this.postId}`)
                .then(() => {
                    this.getLikes()
                })
                .catch(showError)
            }
        },
        getLikes(){
            axios.get(`${baseApiUrl}/likes?id=${this.postId}`)
                .then(res => {
                    this.likes = []
                    for(let i = 0; i < res.data.data.length; i++){
                    this.likes.push(res.data.data[i].userId)
                    }
                }
            )
        }
    }       
}
</script>

<style>
    .like{
        color: #dcdcdc;
        font-size: 30px;
        cursor: pointer;
        margin-bottom: 15px;
    }
    .liked{
        color: #479457;
        transition: 0.1s ease-out;
    }
    .likes-span {
        color: #dcdcdc;
        margin-left: 10px;
    }
</style>
