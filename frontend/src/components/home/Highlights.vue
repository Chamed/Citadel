<template>
    <carousel>
        <PostItem v-for="post in posts" :key="post.id" :post="post" /> 
    </carousel>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '@/components/template/PageTitle'
import PostItem from '@/components/post/PostItem'
import carousel from 'vue-owl-carousel'


export default {
    name: 'Highlights',
    components: { PageTitle, PostItem, carousel},
    data: function() {
        return {
            category: {},
            posts: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getPosts() {
            const url = `${baseApiUrl}/posts`
            axios.get(url).then(res => {
                this.posts = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        }
    },
    mounted() {
        this.getPosts()
    }
}

</script>

<style>

</style>