<template>
    <div class="navLeft">
        <el-col :span="3.5">
            <div v-if="$route.matched[1]" class="home" @click="active" :class="{active:$route.matched[1].name=='home'}">
                <i class="el-icon-location-outline"></i>
                <span class="hon">首页</span>
            </div>
            <el-menu
            v-if="$route.matched[1]"
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#cff"
            :default-openeds='defaultActive'
            :active-text-color="$route.matched[1].name=='home'?'#cff':'#20a0ff'"
            >
            <el-submenu :index="index+''" v-for="(item, index) in parse" :key="index" v-if="item">
                <template slot="title">
                    <i class="el-icon-document" v-if="index==1"></i>
                    <i class="el-icon-plus" v-if="index==2"></i>
                    <i class="el-icon-star-off" v-if="index==3"></i>
                    <i class="el-icon-edit" v-if="index==4"></i>
                    <i class="el-icon-setting" v-if="index==5"></i>
                    <i class="el-icon-warning" v-if="index==6"></i>
                    <span>{{item}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item  :class="{isActive:$route.matched[1].name == value.name?true:false}" v-for="(value, num) in child" :key="num" :index="index+'-'+num" v-if="value.meta.att==item" @click="torouter(value.path)">{{value.meta.title}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
    </div>
</template>

<script>
 export default {
   data () {
        return {
            parse:[],
            child:[],
            defaultActive:[],
       }
   },
   components: {

   },
   created(){
       this.getData()
       if(this.$route.matched[1].meta.att){
           this.parse.forEach((res,index)=>{
               if(res==this.$route.matched[1].meta.att){
                   this.defaultActive = [index+'']
               }
           })
       }
   },
   methods: {
       getData(){
           let arr = []
           this.$router.options.routes[2].children.forEach(res => {
               if(res.path!=''){
                   arr.push(res.meta.att)
                   this.child.push(res)
               }
           });
           this.parse = Array.from(new Set(arr))
       },
       torouter(path){
           this.$router.push({path:path})
       },
        active(){
            this.$router.push({path:'/home'})
        }
   },
 }
</script>

<style scoped lang='less'>
.navLeft{
    min-width: 290px;
    background-color: #324057;
    overflow: hidden;
    .el-menu-vertical-demo{
        min-width: 300px;
        .el-menu-item:hover{
            background-color: #48576a!important;
        }
        
    }
    .el-menu-item{
        background-color: #0b3436!important;
    }
    .isActive{
        color: rgb(32, 160, 255)!important;
    }
    .home{
        height: 60px;
        line-height: 60px;
        color: #cff;
        padding-left: 25px;
        font-size: 15px;
        cursor: pointer;
        .hon{
            margin-left: 10px;
        }
    }
    .home:hover{
        background-color: #48576a;
    }
    .active{
        color: rgb(32, 160, 255)
    }
}
</style>


<style lang='less'>
.navLeft{
    .el-menu-item-group__title{
        height: 0;
        padding:0;
    }
    .el-submenu__title:hover{
        background-color: #48576a!important;
    }
}
</style>

