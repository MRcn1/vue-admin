<template>
   <div class='userList'>
       <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{background:'#eef1f6'}"
        >
        <el-table-column
        type="index"
        width="200">
        </el-table-column>
        <el-table-column
            prop="registe_time"
            label="注册日期"
            width="250"
            align="center">
        </el-table-column>
        <el-table-column
            prop="username"
            label="姓名"
            width="250"
            align="center">
        </el-table-column>
        <el-table-column
            prop="city"
            label="注册地址"
            align="center">
        </el-table-column>
        </el-table>

        <div class="pagination" style="display:flex;justify-content:center;margin:30px 0;">
            <p style="padding:5px">共 {{num}} 条</p>
            <el-pagination
            background
            layout="prev, pager, next"
            @current-change='change'
            :page-size='20'
            :current-page='currentPage'
            :total="total">
            </el-pagination>
        </div>
   </div>
</template>

<script>
import {list,count} from '@/api/admin'
export default {
    data () {
        return {
            tableData:[],
            total:'',
            currentPage:1,
            num:''
        }
    },
    components: {
        
    },
    created(){
        this.getData(20,this.currentPage-1)
        this.getcount()
    },
    methods: {
        getData(n,page){
            let data = {
                limit:n,
                offset:page*n,
            }
            list(data).then(res=>{
                this.tableData = res
            })
        },
        getcount(){
            count().then(res=>{
                if(res.status==1){
                    this.total = res.count
                    this.num = res.count
                }
            })
        },
        change(val){
            this.getData(20,val-1)
        }
    },
 }
</script>

<style scoped lang='less'>
.aa{
    display: flex;
    justify-content: center;
    
}
 
</style>
