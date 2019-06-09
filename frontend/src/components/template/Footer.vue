<template>
    <footer class = "footer">
        <span>Copyright <strong>Christian Medeiros</strong> © 2019 </span>
    </footer>
</template>

<script>
export default {
    name : 'Footer'
}
</script>

<style>
    .footer{
        grid-area: footer;
        background-color:  #323232;
        color: #ffffff;

        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
         
    }
</style>