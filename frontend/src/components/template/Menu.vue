<template>
    <aside class = "menu" v-show="isMenuVisible">
        <div class="menu-filter">
            <i class="fa fa-search fa-lg"></i>
            <input type="text" placeholder="O que esta procurando?" v-model="treeFilter" class="filter-field">
        </div>
        <Tree :data="treeData" :options="treeOptions" :filter= "treeFilter" ref="tree"/>
    </aside>
</template>

<script>
import { mapState } from 'vuex'
import Tree from 'liquor-tree'
import { baseApiUrl } from '@/global'
import axios from 'axios'

export default {
    name: 'menu',
    components: { Tree },
    computed: mapState(['isMenuVisible']),
    data: function(){
        return {
            treeFilter: '',
            treeData: this.getTreeData(),
            treeOptions: {
                propertyNames: { 'text' : 'name' },
                filter: {
                    emptyText: "Categoria não foi encontrada"
                }
            }
        }
    },
    methods: {
        getTreeData(){
            const url = `${baseApiUrl}/categories/tree`
            return axios.get(url).then(res => res.data)
        },
        onNodeSelect(node) {
            this.$router.push({
                name: 'postByCategory',
                params: { id: node.id }
            })
        }
    },
    mounted() {
        this.$refs.tree.$on('node:selected', this.onNodeSelect)
    }
}
</script>

<style>
    .menu{
        grid-area: menu;
        background: linear-gradient(to right, #424242, #313030f5);
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;    
    }

    .menu a,
    .menu a:hover{
        color: #DCDCDC;
        text-decoration: none;
    }

    .menu .tree-node.selected > .tree-content,
    .menu .tree-node .tree-content:hover{
        background-color: #323232;
    }
    .tree-arrow.has-child:after{
        border: 1.5px solid #fff;
        position: absolute;
        border-left: 0;
        border-top: 0;
        left: 9px;
        top: 50%;
        height: 9px;
        width: 9px;
        transform: rotate(-45deg) translateY(-50%) translateX(0);
        transition: transform .25s;
        transform-origin: center;
    }
    .menu .menu-filter {
        display: flex;
        justify-content: center;
        align-items: center;

        margin: 20px;
        padding-bottom: 8px;
        border-bottom: solid 1px #aaa;   
    }
    .menu .menu-filter i{
        color: #dcdcdc;
        margin-right: 10px;
    }
    .menu input{
        color: #dcdcdc;
        font-size: 1.3rem;
        border: none;
        outline: none;
        width: 100%;
        background: transparent;
    }
    .tree-filter-empty{
        color: #dcdcdc;
        margin-left: 20px;
        font-size: 1.3rem;
    }
</style>
