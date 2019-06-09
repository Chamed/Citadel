<template>
    <div class="post-admin">
        <b-form>
            <input id="post-id" type="hidden" v-model="post.id" />
            <b-form-group label="Nome:" label-for="post-name">
                <b-form-input id="post-name" type="text"
                    v-model="post.name" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe o Nome do Post..." />
            </b-form-group>
            <b-form-group label="Descrição" label-for="post-description">
                <b-form-input id="post-description" type="text"
                    v-model="post.description" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a descrição do Post..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Imagem (URL):" label-for="post-imageUrl">
                <b-form-input id="post-imageUrl" type="text"
                    v-model="post.imageUrl" required
                    :readonly="mode === 'remove'"
                    placeholder="Informe a URL da Imagem..." />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Categoria:" label-for="post-categoryId">
                <b-form-select id="post-categoryId"
                    :options="categories" v-model="post.categoryId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'" 
                label="Autor:" label-for="post-userId">
                <b-form-select id="post-userId"
                    :options="users" v-model="post.userId" />
            </b-form-group>
            <b-form-group v-if="mode === 'save'"
                label="Conteúdo" label-for="post-content">
                <VueEditor v-model="post.content" 
                    placeholder="Informe o Conteúdo do Post..." />
            </b-form-group>
            <b-button variant="success" v-if="mode === 'save'"
                @click="save">Salvar</b-button>
            <b-button variant="danger" v-if="mode === 'remove'"
                @click="remove">Excluir</b-button>
            <b-button class="ml-2" @click="reset">Cancelar</b-button>
        </b-form>
        <hr>
        <b-table hover striped :items="posts" :fields="fields">
            <template slot="actions" slot-scope="data">
                <b-button variant="warning" @click="loadpost(data.item)" class="mr-2">
                    <i class="fa fa-pencil"></i>
                </b-button>
                <b-button variant="danger" @click="loadpost(data.item, 'remove')">
                    <i class="fa fa-trash"></i>
                </b-button>
            </template>
        </b-table>
        <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor"
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'PostAdmin',
    components: { VueEditor },
    data: function() {
        return {
            mode: 'save',
            post: {},
            posts: [],
            categories: [],
            users: [],
            page: 1,
            limit: 0,
            count: 0,
            fields: [
                { key: 'id', label: 'Código', sortable: true },
                { key: 'name', label: 'Nome', sortable: true },
                { key: 'description', label: 'Descrição', sortable: true },
                { key: 'actions', label: 'Ações' }
            ]
        }
    },
    methods: {
        loadPost() {
            const url = `${baseApiUrl}/posts?page=${this.page}`
            axios.get(url).then(res => {
                this.posts = res.data.data
                this.count = res.data.count
                this.limit = res.data.limit
            })
        },
        reset() {
            this.mode = 'save'
            this.post = {}
            this.loadPost()
        },
        save() {
            const method = this.post.id ? 'put' : 'post'
            const id = this.post.id ? `/${this.post.id}` : ''
            axios[method](`${baseApiUrl}/posts${id}`, this.post)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        remove() {
            const id = this.post.id
            axios.delete(`${baseApiUrl}/posts/${id}`)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.reset()
                })
                .catch(showError)
        },
        loadpost(post, mode = 'save') {
            this.mode = mode
            axios.get(`${baseApiUrl}/posts/${post.id}`)
                .then(res => this.post = res.data)
        },
        loadCategories() {
            const url = `${baseApiUrl}/categories`
            axios.get(url).then(res => {
                this.categories = res.data.map(category => {
                    return { value: category.id, text: category.path }
                })
            })
        },
        loadUsers() {
            const url = `${baseApiUrl}/users`
            axios.get(url).then(res => {
                this.users = res.data.map(user => {
                    return { value: user.id, text: `${user.name} - ${user.email}` }
                })
            })
        }
    },
    watch: {
        page() {
            this.loadPost()
        }
    },
    mounted() {
        this.loadUsers()
        this.loadCategories()
        this.loadPost()
    }
}
</script>

<style>

</style>