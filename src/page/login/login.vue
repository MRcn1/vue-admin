<template>
    <div class="login">
                <div class="name">elm后台管理系统</div>
                <div class="box">
                    <el-form :model="loginform" :rules="rules"  ref="loginForm">
                        <el-form-item prop="username">
                            <el-input v-model="loginform.username" placeholder="用户名"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="loginform.password" placeholder="密码"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type='primary' @click="login" :loading="loading">登录</el-button>
                        </el-form-item>
                        <el-form-item>
                            <p class="tip">温馨提示：</p>
                            <p class="tip">未登录过的新用户，自动注册</p>
                            <p class="tip">注册过的用户可凭账号密码登录</p>
                        </el-form-item>
                    </el-form>
                </div>
    </div>
</template>

<script>
import { login, info } from "../../api/admin";
import { baseImgPath } from "@/config/env";
export default {
  data() {
    return {
      loading: false,
      loginform: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {},
  created() {},
  methods: {
    login() {
      this.loading = true;
      let data = {
        user_name: this.loginform.username,
        password: this.loginform.password
      };
      login(data).then(res => {
        if (res.status == 1) {
          this.$message.success(res.success);
          this.loading = false;
          info().then(res => {
            sessionStorage.avatar = baseImgPath + res.data.avatar;
            this.$router.push({ path: "/layout" });
          });
        } else {
          this.loading = false;
        }
      });
    },
  },
    // beforeRouteLeave (to, from, next) {
    //     if(from.name == 'login' && to.name=='home'){
    //         this.$router.go(0)
    //     }
    //     next()
    // }
};
</script>

<style scoped lang='less'>
@import "../../style/mixin.less";
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #324057;
  .name {
    width: 100%;
    font-size: 30px;
    color: #fff;
    position: absolute;
    top: 27%;
    text-align: center;
  }
  .box {
    .wh(368px,282px);
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    position: absolute;
    top: 55%;
    left: 50%;
    margin: -180px 0 0 -170px;
    padding: 30px;
    .el-form {
      width: 100%;
      .el-button {
        width: 100%;
      }
    }
    .tip {
      color: #ff0000;
      font-size: 12px;
      text-align: center;
      height: 17px;
    }
  }
}
</style>
