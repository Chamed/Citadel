<template>
    <Carousel :nav="false" :responsive="{600:{items:1,nav:false},800:{items:2,nav:false}}" :autoplayTimeout="4000" :items="2" :loop="true" :autoplay="true">
        <div class="post-item highlight">
            <router-link :to="{ name: 'postById', params: { id: this.posts[0].id } }">
                <div class="post-item-image d-none d-sm-block">
                    <img v-if="this.posts[0].imageUrl"
                        :src="this.posts[0].imageUrl"
                        height="150" width="150" alt="Post">
                    <img v-else
                        src="@/assets/post.png"
                        height="150" width="150" alt="Post">
                </div>
                <div class="post-item-info">
                    <h2>{{ this.posts[0].name }}</h2>
                    <p>{{ this.posts[0].description }}</p>
                </div>
            </router-link>
        </div>
        <div class="post-item highlight">
            <router-link :to="{ name: 'postById', params: { id: this.posts[1].id } }">
                <div class="post-item-image d-none d-sm-block">
                    <img v-if="this.posts[1].imageUrl"
                        :src="this.posts[1].imageUrl"
                        height="150 !important" width="150 !important" alt="Post">
                    <img v-else
                        src="@/assets/post.png"
                        height="150" width="150" alt="Post">
                </div>
                <div class="post-item-info">
                    <h2>{{ this.posts[1].name }}</h2>
                    <p>{{ this.posts[1].description }}</p>
                </div>
            </router-link>
        </div>
        <div class="post-item highlight">
            <router-link :to="{ name: 'postById', params: { id: this.posts[2].id } }">
                <div class="post-item-image d-none d-sm-block">
                    <img v-if=" this.posts[2].imageUrl"
                        :src=" this.posts[2].imageUrl"
                        height="150" width="150" alt="Post">
                    <img v-else
                        src="@/assets/post.png"
                        height="150" width="150" alt="Post">
                </div>
                <div class="post-item-info">
                    <h2>{{  this.posts[2].name }}</h2>
                    <p>{{  this.posts[2].description }}</p>
                </div>
            </router-link>
        </div>
        <div class="post-item highlight">
            <router-link :to="{ name: 'postById', params: { id:  this.posts[3].id } }">
                <div class="post-item-image d-none d-sm-block">
                    <img v-if="this.posts[3].imageUrl"
                        :src="this.posts[3].imageUrl"
                        height="150" width="150" alt="Post">
                    <img v-else
                        src="@/assets/post.png"
                        height="150" width="150" alt="Post">
                </div>
                <div class="post-item-info">
                    <h2>{{ this.posts[3].name }}</h2>
                    <p>{{ this.posts[3].description }}</p>
                </div>
            </router-link>
        </div>
        <div class="post-item highlight">
            <router-link :to="{ name: 'postById', params: { id: this.posts[4].id } }">
                <div class="post-item-image d-none d-sm-block">
                    <img v-if="this.posts[4].imageUrl"
                        :src="this.posts[4].imageUrl"
                        height="150" width="150" alt="Post">
                    <img v-else
                        src="@/assets/post.png"
                        height="150" width="150" alt="Post">
                </div>
                <div class="post-item-info">
                    <h2>{{ this.posts[4].name }}</h2>
                    <p>{{ this.posts[4].description }}</p>
                </div>
            </router-link>
        </div>
        <div class="post-item highlight">
            <router-link :to="{ name: 'postById', params: { id: this.posts[5].id } }">
                <div class="post-item-image d-none d-sm-block">
                    <img v-if="this.posts[5].imageUrl"
                        :src="this.posts[5].imageUrl"
                        height="150" width="150" alt="Post">
                    <img v-else
                        src="@/assets/post.png"
                        height="150" width="150" alt="Post">
                </div>
                <div class="post-item-info">
                    <h2>{{ this.posts[5].name }}</h2>
                    <p>{{ this.posts[5].description }}</p>
                </div>
            </router-link>
        </div>
    </Carousel>
</template>

<script>
import { baseApiUrl } from '@/global'
import axios from 'axios'
import PageTitle from '@/components/template/PageTitle'
import PostItem from '@/components/post/PostItem'
import Carousel from 'vue-owl-carousel'


export default {
    name: 'Highlights',
    components: { PageTitle, PostItem, Carousel},
    data: function() {
        return {
            posts: []
        }
    },
    methods: {
        getPosts() {
            const url = `${baseApiUrl}/posts`
            axios.get(url).then(res => {
                this.posts = res.data.data
                console.log(this.posts)
            })
        }
    },
    mounted() {
        this.getPosts()
    },
}

</script>

<style>
.owl-carousel .owl-item img {
    display: block;
    width: 150px; 
}
.highlight{
    margin: 0px 20px 0px 0px;
    border-radius: 10px;
    padding-left: 10px;
}
.owl.owl-carousel.owl-theme .owl-nav {
    margin-top: 0;
    position: absolute;
    width: 100%;
    top: 44%;
    left: 0;
}

.owl-theme .owl-nav [class*='owl-'] {
    position: absolute;
    font-size: 15px;
    color: #000;
    background: #479457;
    top: 35%;
    opacity: 0.6;
    line-height: 1;
    margin: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    padding: 10px 13px !important;
}

.owl-prev {
    left: 0;
}

.owl-next {
    right: 0;
}

.owl-theme.owl-carousel .owl-nav [class*="owl-"]:hover {
    background: #479457;
    opacity: 1;
    color: #000;
    text-decoration: none;
}
.owl-theme .owl-dots .owl-dot.active span, .owl-theme .owl-dots .owl-dot:hover span{
    background: #479457;
}
</style>