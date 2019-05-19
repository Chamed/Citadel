<template>
    <div class="admin-pages">
        <PageTitle icon="fa fa-cogs" main="Administração do Sistema"
        sub="Cadastros e Moderação"/>

        <div class="admin-pages-tabs">
            <b-card no-body>
                <b-tabs card>
                    <b-tab title="Posts" active>
                        <PostAdmin />
                    </b-tab>
                    <b-tab title="Categorias">
                        <CategoryAdmin />
                    </b-tab>
                    <b-tab title="Usuários">
                        <UserAdmin />
                    </b-tab>
                </b-tabs>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageTitle from '@/components/template/PageTitle'
import UserAdmin from '@/components/admin/UserAdmin'
import PostAdmin from '@/components/admin/PostAdmin'
import CategoryAdmin from '@/components/admin/CategoryAdmin'

export default {
    name: 'AdminPages',
    components: { PageTitle, PostAdmin, UserAdmin, CategoryAdmin}
}
</script>

<style>

</style>
