<template>
    <div class='shopList'>
        <el-table
        :data="tableData"
        :header-cell-style="{background:'#eef1f6'}"
        style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="店铺名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="店铺介绍">
                            <span>{{ props.row.description }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="联系电话">
                            <span>{{ props.row.phone }}</span>
                        </el-form-item>
                        <el-form-item label="评分">
                            <span>{{ props.row.rating }}</span>
                        </el-form-item>
                        <el-form-item label="销售量">
                            <span>{{ props.row.recent_order_num }}</span>
                        </el-form-item>
                        <el-form-item label="分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
            label="店铺名称"
            prop="name"
            idth="300">
            </el-table-column>
            <el-table-column
            label="店铺地址"
            prop="address"
            idth="300">
            </el-table-column>
            <el-table-column
            label="店铺介绍"
            prop="description"
            idth="300">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="300">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button type="text" size="small">添加食品</el-button>
                    <el-button type="danger" size="mini" @click="handledelic(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog width="50%" title="修改店铺信息" :visible.sync="dialogFormVisible">
            <el-form ref="params" :model="params" label-width="80px">

                <el-form-item label="店铺名称">
                    <el-input v-model="params.name" ></el-input>
                </el-form-item>

                <el-form-item label="详细地址">
                    <el-input v-model="params.address"></el-input>
                    <div>当前城市：{{citys.name}}</div>
                </el-form-item>

                <el-form-item label="店铺介绍">
                    <el-input v-model="params.description"></el-input>
                </el-form-item>

                <el-form-item label="联系电话">
                    <el-input v-model="params.phone"></el-input>
                </el-form-item>

                <el-form-item label="店铺分类">
                    <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        :props='props'
                        >
                    </el-cascader>
                </el-form-item>

                <el-form-item label="店铺图片">
                    <el-upload
                    class="avatar-uploader"
                    :action="baseUrl + '/v1/addimg/shop'"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                        <img v-if="params.image_path" :src="baseImgPath+params.image_path" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item> 
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible=false">取 消</el-button>
                <el-button type="primary" @click="save()">确 定</el-button>
            </div>
        </el-dialog>

        <div class="pagination" style="display:flex;justify-content:center;margin:30px 0;">
            <p style="padding:5px">共 {{total}} 条</p>
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
import { restaurants, cities,restaurantsCount,category,updateshop,restaurant} from "@/api/admin";
import {baseUrl,baseImgPath} from "@/config/env"
export default {
    data() {
        return {
            baseUrl,
            baseImgPath,
            currentPage: 1,
            total: 0,
            citys: "",
            dialogFormVisible: false,
            tableData: [],
            params: {},
            options:[],
            props:{
                value:'name',
                label:'name',
                children:'sub_categories'
            },
            selectedOptions:'',
            page:1

        };
    },
    components: {

    },
    created() {
        this.city();
    },
    methods: {
        city() {
            let data = {
                type: "guess"
            };
            cities(data).then(res => {
                this.citys = res;
                this.getData(20,1);
                this.restaurantsCounts()
            });
        },
        getData(a,b) {
            this.page = b
            let data = {
                latitude: this.citys.latitude,
                longitude: this.citys.longitude,
                limit: a,
                offset: (b - 1) * 20
            };
            restaurants(data).then(res => {
                this.tableData = res;
            });
        },
        restaurantsCounts(){
            restaurantsCount().then(res=>{
                if(res.status==1){
                    this.total = res.count
                    this.num = res.count
                }
            })
        },
        handleClick(row) {
            this.dialogFormVisible = true
            this.params = {...row}
            this.selectedOptions = row.category.split('/')

            category().then(res=>{
                this.options = res
            })
        },
        handledelic(id) {
            this.$message.error('亲，你的权限不足')
        },
        change(val){
            this.getData(20,val)
        },
        handleAvatarSuccess(res,file){
            if(res.status==1){
                this.params.image_path = res.image_path
            }else{
                this.$message.error('上传图片失败！');
            }
        },
        beforeAvatarUpload(file){
            const img = (file.type=="image/png") || (file.type=="image/jpeg")
            const size = file.size / 1024 / 1024 <2
            if(!img){
                this.$message.error('上传头像图片只能是 JPG和PNG 格式!');
            }else if(!size){
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return img&&size
        },
        save(){
            let data = {
                id:this.params.id,
                name:this.params.name,
                address:this.params.address,
                description:this.params.description,
                phone:this.params.phone,
                image_path:this.params.image_path,
                category:this.selectedOptions.join('/'),
            }
            updateshop(data).then(res=>{
                if(res.status==1){
                    this.$message.success(res.success)
                    this.getData(20,this.page)
                }
                this.dialogFormVisible = false
            })
        },
    }
};
</script>

<style scoped lang='less'>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
