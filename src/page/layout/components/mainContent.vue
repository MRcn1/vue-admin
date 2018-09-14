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
                            <li @click="dropout">退出</li>
                        </ul>
                    </div>
                    <div slot="reference" class="red">
                        <img src="@/assets/img/user.jpg" alt="" width="100%">
                    </div>
                    </el-popover>
                </el-breadcrumb>
            </div>

            <div class="content">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
       </div>
   </div>
</template>

<script>
import {singout} from '@/api/admin'
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
        },
        dropout(){
            singout().then(res=>{
                if(res.status==1){
                    this.$message.success(res.success)
                    this.$router.push({path:'/'})
                }
            })
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
    overflow: auto;
    .el-breadcrumb{
        height: 60px;
        background-color: #eff2f7;
        line-height: 60px;
        padding-left: 20px;
        position: relative;
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
    .content{
        padding: 20px;
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
        width: 120%;
        padding: 10px;
        margin-left: -12px;
    }
    li:hover{
        cursor: pointer;
        background-color: #eff2f7;
    }
}
.el-popover{
    padding: 0;
}
</style>

