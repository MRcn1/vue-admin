<template>
    <div class="navLeft">
        <el-col :span="3.5">
            <el-menu
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#cff"
            :default-openeds='defaultActive'
            active-text-color="#20a0ff">
            <el-submenu :index="index+''" v-for="(item, index) in parse" :key="index">
                <template slot="title">
                    <i class="el-icon-document" v-if="index==0"></i>
                    <i class="el-icon-plus" v-if="index==1"></i>
                    <i class="el-icon-star-off" v-if="index==2"></i>
                    <i class="el-icon-edit" v-if="index==3"></i>
                    <i class="el-icon-setting" v-if="index==4"></i>
                    <i class="el-icon-warning" v-if="index==5"></i>
                    <span>{{item}}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item :class="{isActive:$route.matched[1].name == value.name?true:false}" v-for="(value, num) in child" :key="num" :index="index+'-'+num" v-if="value.meta.att==item" @click="torouter(value.path)">{{value.meta.title}}</el-menu-item>
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
            defaultActive:['0'],
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

