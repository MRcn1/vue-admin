<template>
    <div id="app">
        <keep-alive v-if="true">
            <router-view></router-view>
        </keep-alive>
        <router-view v-else></router-view>
    </div>
</template>

<script>
export default {
    name: 'App',
    components:{
        
    }
}
</script>

<style>
html,body,#app {height: 100%;}
</style>
