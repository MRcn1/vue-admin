<!--
<template>  
    <div class='navLeft'>
        <el-col :span="3.5">
            <el-menu
            default-active="0"
            class="el-menu-vertical-demo"
            :default-openeds="openeds"
            active-text-color='#20a0ff'
            :unique-opened='true'
            background-color='#324057'
            text-color='#cff'
            >
                <el-submenu :index="num+''" v-for="(item,num) in classify" :key="num">
                    <template slot="title">
                        <span>{{item}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item :index="num+'-'+ind" v-for="(value,ind) in newchildren" :key="ind" :class="value.path==$route.path?'active':''" @click="toPath(value.path)" v-if="item==value.meta.top">{{value.name}}</el-menu-item>
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
            routes:null,
            classify:null,
            newchildren:null,
            openeds:['0'],
            name:'',
        }   
    },
    components: {

    },
    created(){
        this.selsev()
    },
    methods: {
        selsev(){
            let classify = []
            let newchildren = []
            this.$router.options.routes.filter(res=>{
                if(res.name==this.$route.matched[0].name){
                    res.children.filter(val=>{
                        if(val.path!=''){
                            classify.push(val.meta.top)
                            newchildren.push(val)
                        }
                    })
                }
            })
            this.classify = [...new Set(classify)];
            this.newchildren = [...new Set(newchildren)];
            
            console.log(this.$route.matched[0].name,this.name)
            if(this.name!=this.$route.matched[0].name){
                this.openeds=['0']
                this.name = this.$route.matched[0].name
            }else{
                this.name = this.$route.matched[0].name
            }

            
        },
        toPath(path){
            this.$router.push({path:path})
        }
    },
    watch:{
        $route(to,from){
            this.selsev()
        }
    }
 }
</script>

<style scoped lang='less'>
.navLeft{
    background-color: #324057;
}
.navLeft .el-menu-vertical-demo{
    min-width: 300px;
    border-right: none;
}
.active{
    color: #20a0ff
}
</style>

<style  lang='less'>
.navLeft{
    .el-menu-item-group{
        background-color: #1f2d3d!important;
    }
}
</style>
-->

<template>
    <div class="navLeft">
        <el-col :span="3.5">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#324057"
            text-color="#cff"
            active-text-color="#20a0ff">
            <el-submenu index="1">
                <template slot="title">
                    <span>导航一</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
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

       }
   },
   components: {

   },
   created(){

   },
   methods: {

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
    }
}

 
</style>
