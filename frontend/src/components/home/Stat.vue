<template>
    <div class="stat">
        <div class="stat-icon">
            <i :class="icon" :style="style"></i>
        </div>
        <div class="stat-info">
            <span class="stat-title"> {{ title }} </span>
            <span class="stat-value"> {{ value }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Stat',
    props: ['title', 'value', 'icon', 'color'],
    computed: {
        style(){
            return "color: " + (this.color || "#000")
        }
    }
}
</script>

<style>
    .stat{
        flex: 1;
        display: flex;
        margin-right: 20px;
        margin-bottom: 20px;
        background-color: #323232;
        padding: 20px;
        border: 0.5px solid #616161;
        border-bottom: 5px solid #479457;
    }
    .stat-icon{
        display: flex;
        align-items: center;
    }
    .stat-icon i{
        font-size: 5rem;
    }
    .stat-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }
    .stat-title{
        font-size: 1.2rem;
    }
    .stat-value{
        font-size: 3rem;
    }
</style>
