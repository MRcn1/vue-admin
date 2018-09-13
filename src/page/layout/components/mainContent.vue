<template>
   <div class='mainContent'>
       <div class="contentBox">
            <div class="breadcrumb">
                <el-breadcrumb separator="/">    
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>{{att}}</el-breadcrumb-item>
                    <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
                    <el-popover
                    placement="top"
                    trigger="hover">
                    <div style="text-align: center" class="popo">
                        <ul>
                            <li>首页</li>
                            <li>退出</li>
                        </ul>
                    </div>
                    <div slot="reference" class="red">
                        <img src="@/assets/img/user.jpg" alt="" width="100%">
                    </div>
                    </el-popover>
                </el-breadcrumb>
            </div>

            <keep-alive>
                <transition name="fade" mode="out-in">
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </transition>
            </keep-alive>
            <transition name="fade" mode="out-in">
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </transition>
       </div>
   </div>
</template>

<script>
export default {
    data () {
        return {
            att:'',
            title:'',
        }
    },
    components: {

    },
    created(){
        this.rou()
    },
    methods: {
        rou(){
            this.att = this.$route.matched[1].meta.att
            this.title = this.$route.matched[1].meta.title
        }
    },
    watch:{
        $route(){
            this.rou()
        }
    }
 }
</script>

<style scoped lang='less'>
.contentBox{
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-shadow: 1px 1px 1px 1px #ccc;
    .el-breadcrumb{
        height: 60px;
        background-color: #eff2f7;
        line-height: 60px;
        padding-left: 20px;
        .red{
            width: 40px;
            height: 40px;
            float: right;
            overflow: hidden;
            position: absolute;
            border-radius: 20px;
            right: 60px;
            top: 10px;
            img{
                vertical-align:top
            }
        }
        .content{
            padding: 30px;
        }
    }
}
.fade-enter-active, .fade-leave-active{
    transition:all 0.2s ease-in
}
.fade-enter, .fade-leave-to{
    opacity:0
}
.el-popover{
    li{
        width: 100%;
        padding: 10px;
    }
    li:hover{
        cursor: pointer;
    }
}
</style>

