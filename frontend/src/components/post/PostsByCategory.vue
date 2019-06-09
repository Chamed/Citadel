<template>
    <div class="posts-by-category">
        <PageTitle icon="fa fa-folder-o"
            :main="category.name" sub="Categoria" />
        <ul>
            <li v-for="post in posts" :key="post.id">
                <PostItem :post="post" />
            </li>
        </ul>
        <div class="load-more">
            <button v-if="loadMore"
                class="btn btn-lg btn-outline-primary"
                @click="getPosts">Carregar Mais Artigos</button>
        </div>
    </div>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '../template/PageTitle'
import PostItem from './PostItem'

export default {
    name: 'PostsByCategory',
    components: { PageTitle, PostItem },
    data: function() {
        return {
            category: {},
            posts: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory() {
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(res => this.category = res.data)
        },
        getPosts() {
            const url = `${baseApiUrl}/categories/${this.category.id}/posts?page=${this.page}`
            axios(url).then(res => {
                this.posts = this.posts.concat(res.data)
                this.page++

                if(res.data.length === 0) this.loadMore = false
            })
        }
    },
    watch: {
        $route(to) {
            this.category.id = to.params.id
            this.posts = []
            this.page = 1
            this.loadMore = true

            this.getCategory()
            this.getPosts()
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getPosts()
    }
}
</script>

<style>
    .posts-by-category{
         color: #dcdcdc;
    }
    .posts-by-category ul {
        list-style-type: none;
        padding: 0px;
    }

    .posts-by-category .load-more {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;
    }
    .btn-outline-primary{
        background-color: #479457;
        color: #dcdcdc;
        border: none;
    }
    .btn-outline-primary:hover{
        background-color: #396634;
        color: #dcdcdc;
        border: none;
    }
</style>