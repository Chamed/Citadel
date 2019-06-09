<template>
    <div class="content">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "Content"
};
</script>

<style>
.content {
    grid-area: content;
    background-color: #1E1E1E;
    padding: 20px; 
}
</style>
