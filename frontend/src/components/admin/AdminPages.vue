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

form .form-control, form .custom-select, form .ql-editor {
    background: #323232;
    color: #ffffff;
}

form .ql-snow.ql-toolbar button.ql-active .ql-stroke,
form .ql-snow.ql-toolbar button:hover .ql-stroke {
    stroke: #479457;
}

form .ql-editor.ql-blank:before {
    color: #999;
}

form .form-control:focus {
    background-color: #6B6B6B;
    color: #fff;
    outline: none;
    box-shadow: none;
    border: 1px solid #479457;
}

form .custom-select:focus:focus {
    box-shadow: none;
    border: 1px solid #479457;
}

.form-control[readonly]{
    background-color: #6B6B6B;
    color: #fff;
}
.form-control::placeholder{
    color: #303030;
}


::-webkit-input-placeholder {
    color: #999999 !important;
}

:-moz-placeholder { /* Firefox 18- */
    color: #999999 !important;
}

::-moz-placeholder { /* Firefox 19+ */
    color: #999999 !important;
}

:-ms-input-placeholder {
    color: #999999 !important;
}
</style>
