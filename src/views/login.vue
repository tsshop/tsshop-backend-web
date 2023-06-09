<template>
  <div class="login">
    <img src="../assets/images/banner-1.png" style="width:815px;height:550px;margin-right:90px;" alt="">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      label-position="left"
      label-width="0px"
      class="login-form"
    >
      <!-- <img src="../assets/images/logo2.png" alt="" style="width: 187px; height: 46px" />    -->
      <h3 class="title text-center">TSSHOP后台管理系统</h3>
      <div class="title-2 text-center">welcome to management system</div>
      <el-form-item prop="username">
        <el-input
          class="input-box"
          v-model="loginForm.username"
          type="text"
          auto-complete="prefix"
          placeholder="请输入您的账号"
        >
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon mt-20" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          class="input-box"
          v-model="loginForm.password"
          type="password"
          auto-complete="prefix"
          placeholder="请输入您的密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon mt-20" />
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          class="input-box"
          v-model="loginForm.code"
          auto-complete="off"
          placeholder="请输入验证码"
          style="width: 63%"
          @keyup.enter.native="handleLogin"
        >
          <!-- <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon" /> -->
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" @click="getCode" />
        </div>
      </el-form-item>
      <!-- <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox> -->
      <el-form-item style="width: 100%">
        <el-button
          class="login-btn-1"
          :loading="loading"
          round
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="http://www.beian.miit.gov.cn" target="_blank">{{
        $store.state.settings.caseNumber
      }}</a>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";

export default {
  name: "Login",
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [{ required: true, trigger: "blur", message: "请输入您的账号" }],
        password: [{ required: true, trigger: "blur", message: "请输入您的密码" }],
        code: [{ required: true, trigger: "change", message: "请输入验证码" }],
      },
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      // 注册开关
      register: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password: password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), { expires: 30 });
            Cookies.set("rememberMe", this.loginForm.rememberMe, { expires: 30 });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/banner.png");
  background-size: cover;
}
@media (min-width: 1200px) {
  .login {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 100%;
    // background-image: url("../assets/images/bg.jpg");
    background-size: cover;
  }
  .login-form {
    background: rgba(255, 255, 255, 0);
    margin-right: 18%;
  }
}
.title {
  margin: 30px auto 0px auto;
  color: #333;
  font-size: 24px;
}
.title-2 {
  margin: 6px auto 30px auto;
  color: #999999;
  font-size: 14px;
}

.login-form {
  border-radius: 6px;
  background: rgba(255, 255, 255);
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  display: inline-block;
  height: 38px;
  float: right;
  margin-top: 20px;
  overflow: hidden;
  img {
    cursor: pointer;
    vertical-align: middle;
    width: 100%;
    height: 100%;
    transform: scale(1.2);
    opacity: 0.7;
  }
}
.login-btn-1 {
  border-radius: 40px;
  background: #3CC785 !important;
  border: none;
  margin-top: 10px;
  height: 40px !important;
}
.login-btn-1::hover {
  background: #3CC785;
}
.input-box input {
  border:none;
  border-radius: 0;
  border-bottom: 1px solid #D4D4D4;
  margin-top: 20px;
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
