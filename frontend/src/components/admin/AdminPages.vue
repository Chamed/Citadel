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
.admin-pages{
    color: #DCDCDC;
}
.tabs{
    background-color: #464646;
}
.nav-tabs .nav-link.active{
    background-color: #323232;
    color: #DCDCDC;
    border: none;
  
}
.nav-tabs .nav-link,
.nav-tabs .nav-link:hover{
    color: #DCDCDC;
    border: none;
  
}
.card-header-tabs{
    padding: none;
}
.tab-pane{
    background-color: #323232;
}
.card-header{
    padding-bottom: 10px;
}
.b-table, p, td, tr{
    color: #DCDCDC;
}
tr:hover{
    background-color: #464646;
}
thead:hover{
    background-color: #323232;
}
.ql-picker-label, .ql-list{
    color: #DCDCDC !important;
}
.page-item.active .page-link{
    background-color: #479457;
    border-color: #479457;
}
.ql-editor{
    background-color: #464646;
    border-bottom: solid 5px #479457;
}
.form-control, .form-control:focus, .form-control::placeholder, .custom-select{
    background-color: #6B6B6B;     
    color: #dcdcdc !important;
}
input, select{
    color: #dcdcdc !important;
}
</style>
