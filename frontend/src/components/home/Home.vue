<template>
    <div class="home">
        <PageTitle icon="fa fa-university" main="Bem vindo"
            sub="Com você nossa comunidade é mais forte" />
        <div class="stats">
            <Stat title="Categorias" :value="stat.categories"
                icon="fa fa-folder" color="#F45B69"/>
            <Stat title="Postagens" :value="stat.posts"
                icon="fa fa-file" color="#84B369"/>
            <Stat title="Usuários" :value="stat.users"
                icon="fa fa-user" color="#028090"/>
        </div>
        <hr>
        <Highlights/>
        <PostUser/>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle';
import PostUser from '@/components/user/PostUser'
import Stat from '@/components/home/Stat'
import Highlights from '@/components/home/Highlights'
import axios from 'axios'
import { baseApiUrl} from '@/global'

export default {
    name: 'Home',
    components: { PageTitle, Stat, PostUser, Highlights},
    data: function() {
        return {
            stat: {}
        }
    },
    methods: {
        getStats() {
            axios.get(`${baseApiUrl}/stats`).then(res => this.stat = res.data)
        }
    },
    mounted(){
        this.getStats()
    }
}
</script>

<style>
    .stats{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .home{
        color: #DCDCDC;
    }
</style>
