<template>
    <div class="container">
        <div class="post-by-id">
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
import Like from '@/components/post/Like'

export default {
    name: 'PostById',
    components: { PageTitle, Comment, Like },
    data: function() {
        return {
            post: {}
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
        }
    }       
}
</script>

<style>
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
