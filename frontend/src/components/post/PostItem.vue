<template>
    <div class="post-item">
        <router-link :to="{ name: 'postById', params: { id: post.id } }">
            <div class="post-item-image d-none d-sm-block">
                <img v-if="post.imageUrl"
                    :src="post.imageUrl"
                    height="150" width="150" alt="Post">
                <img v-else
                    src="@/assets/post.png"
                    height="150" width="150" alt="Post">
            </div>
            <div class="post-item-info">
                <h2>{{ post.name }}</h2>
                <p>{{ post.description }}</p>
                <span class="post-item-author">
                    <strong>Autor: </strong>{{ post.author }}
                </span>
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'PostItem',
    props: ['post']
}
</script>

<style>
    .post-item {
        margin-bottom: 20px;
        background-color: #323232;
        padding: 20px;
        border-bottom: 5px solid #479457;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);
    }

    .post-item a {
        display: flex;
        align-items: flex-start;
        text-decoration: none;
        color: #dcdcdc;
    }

    .post-item-info h2 {
        font-size: 1.7rem;
    }

    .post-item-image {
        padding-right: 20px;
        margin-right: 20px;
        border-right: 1px solid #AAA;
    }

    .post-item-image img {
        border-radius: 5px;
    }

    .post-item-info {
        display: flex;
        align-self: stretch;
        flex-direction: column;
    }

    .post-item-info p {
        flex: 1;
        color: #555;
        font-size: 1.1rem;
    }
</style>
