<template>
    <div class='layout'>
        <div class="app-main">
            <nav-left></nav-left>
            <main-content></main-content>
        </div>
    </div>
</template>

<script>
    import navLeft from "./components/navLeft"
    import mainContent from "./components/mainContent"
    export default {
        data() {
            return {
                
            }
        },
        components: {
            navLeft,
            mainContent
        },
        created() {},
        methods: {}
    
    };
</script>

<style scoped lang='less'>
.layout{
    height: 100%;
}
.app-main{
    display: flex;
    height:100%; 
    .mainContent{
        width: 100%;
        background-color: #fafafa;
    }
}
</style>
