<template>
    <aside class = "menu" v-show="isMenuVisible"></aside>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'menu',
    computed: mapState(['isMenuVisible'])
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, rgb(230, 230, 230), rgb(255, 255, 255));
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;    
    }
</style>
