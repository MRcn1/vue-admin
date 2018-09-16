<template>
  <div class='shopList'>
    <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="name"
      label="店铺名称"
      width="300">
    </el-table-column>
    <el-table-column
      prop="address"
      label="店铺地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="description"
      label="店铺介绍"
      width="300">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="300">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button type="text" size="small">添加食品</el-button>
        <el-button type="danger" size="mini">删除</el-button>
      </template>
    </el-table-column>
   </el-table>

<el-dialog title="修改店铺信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="店铺名称" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off" ></el-input>
    </el-form-item>

    <el-form-item label="详细地址" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
      <div>当前城市：{{city}}</div>
    </el-form-item>

    <el-form-item label="店铺介绍" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="联系电话" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="店铺分类" :label-width="formLabelWidth">
      <el-cascader
       :options="options"
       v-model="selectedOptions"
       @change="handleChange">
      </el-cascader>
  </el-form-item>
     <el-form-item label="店铺图片" :label-width="formLabelWidth">
     <el-upload
       class="avatar-uploader"
       action="https://jsonplaceholder.typicode.com/posts/"
       :show-file-list="false"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
       <img v-if="imageUrl" :src="imageUrl" class="avatar">
       <i v-else class="el-icon-plus avatar-uploader-icon"></i>
     </el-upload>
   </el-form-item> 
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
 </div>
</el-dialog>
  </div>
</template>

<script>
import { merchants } from "@/api/admin2";
export default {
  data() {
    return {
      tableData: [],
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px",
      city: "惠州",
      options: [
        {
          value: "yiguoliaoli",
          label: "异国料理",
          children: [
            {
              value: "rihanliaoli",
              label: "日韩料理"
            },
            {
              value: "xican",
              label: "西餐"
            },
            {
              value: "pisayimian",
              label: "披萨意面"
            },
            {
              value: "东南亚",
              label: "西餐"
            }
          ]
        },
        {
          value: "kuaicanbiandang",
          label: "快餐便当",
          children: [
            {
              value: "jiancan",
              label: "简餐"
            },
            {
              value: "gaijiaofan",
              label: "盖浇饭"
            },
            {
              value: "misimianguan",
              label: "米丝面馆"
            },
            {
              value: "baozizhoudian",
              label: "包子粥店"
            }
          ]
        }
      ],
      imageUrl: ""
    };
  },
  components: {},
  created() {
    let vm = this;
    let data = {
      latitude: 23.11075,
      longitude: 114.416786,
      limit: 20
    };
    merchants(data).then(res => {
      console.log(res);
      vm.tableData = res;
    });
  },
  methods: {
    handleClick(row) {
      var vm = this;
      console.log(row);
      vm.dialogFormVisible = true;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  activated() {
    let vm = this;
    let data = {
      latitude: 23.11075,
      longitude: 114.416786,
      limit: 20
    };
    merchants(data).then(res => {
      console.log(res);
      vm.tableData = res;
    });
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
</style>
