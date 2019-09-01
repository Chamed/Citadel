<template>
    <div class="container">
        <div class="post-by-id">
            <div style="display: flex;">
            <router-link v-if="this.user.id == post.userId" :to="{ name: 'profile', params: {id: post.userId}}">
                <Gravatar id='user-pic' style="cursor: pointer; border: solid 2px #fff;border-radius: 50%;" :email="post.email" alt="User"/>
            </router-link>
            <router-link v-if="this.user.id != post.userId" :to="{ name: 'publicProfile', params: {id: post.userId}}">
                <Gravatar id='user-pic' style="cursor: pointer; border: solid 2px #fff;border-radius: 50%;" :email="post.email" alt="User"/>
            </router-link>
                <h4 style=" margin: 5px 0px 0px 5px">{{post.author}} </h4>
                <span style="margin: 10px 0px 0px 5px; color: #666"> <i  style="color:#479457" class="fa fa-chevron-right"></i>{{post.category}}</span>
            </div>   
                <hr style="color: #666;">
            <PageTitle icon="fa fa-file-o" :main="post.name" :sub="post.description" />
            <div class="post-content" v-html="post.content"></div>
        </div>
        <Like />
        <Comment />
    </div>
</template>

<script>
import 'highlightjs/styles/dracula.css'
import hljs from 'highlightjs/highlight.pack.js'
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import Comment from '@/components/comments/Comment'
import Gravatar from 'vue-gravatar'
import { mapState } from 'vuex'
import Like from '@/components/post/Like'

export default {
    name: 'PostById',
    components: { PageTitle, Comment, Like, Gravatar },
    computed: mapState(['user']),
    data: function() {
        return {
            post: {},
        }
    },
    mounted() {
        const url = `${baseApiUrl}/posts/${this.$route.params.id}`
        axios.get(url).then(res => this.post = res.data) 
    },
    updated() {
        document.querySelectorAll('.post-content pre.ql-syntax').forEach(e => {
            hljs.highlightBlock(e)
        })
    },
    methods:{
        likeDislike(){
            document.getElementById('like').classList.toggle('liked')
        },   
    } 
}
</script>

<style>
    img#user-pic {
        height: 50px;
    }
    .post-by-id {
        color: #dcdcdc;
    }   
    .post-content {
        border-radius: 25px;
        margin-bottom: 20px;
        background-color: #323232;
        padding: 20px;
        border-bottom: 5px solid #479457;
    }

    .post-content pre {
        padding: 20px;
        border-radius: 8px;
        font-size: 1.2rem;
        background-color: #1e1e1e;
        color: #FFF;
    }

    .post-content img {
        max-width: 100%;
    }

    .post-content :last-child {
        margin-bottom: 0px;
    }
    .like{
        color: #dcdcdc;
        font-size: 30px;
        cursor: pointer;
        margin-bottom: 15px;
    }
    .liked{
        color: #479457
    }
</style>
