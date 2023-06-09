<template>
    <div class="app-container-box">
      <div class="app-container">
        <div class="fs-26 mt-20" style="margin-bottom:50px;">小程序设置</div>
  
      <!-- 添加或修改店铺提现配置对话框 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        
        <el-form-item label="appid" prop="appid">
            <el-input v-model="form.appid" style="width:360px;" placeholder="请输入appid" />
        </el-form-item>
        <el-form-item label="appSecret" prop="appSecret">
            <el-input v-model="form.appSecret" style="width:360px;" placeholder="请输入appSecret" />
        </el-form-item>
      </el-form>
      <el-button style="margin-top:60px;" type="primary" v-hasPermi="['appConfig:lite:eidt']" @click="submitForm">保存</el-button>
      </div>
      
    </div>
  </template>
  
  <script>
  import { wechatInfo, wechatEdit } from "../../../api/system/wechatSetting";
  
  export default {
    name: "Config",
    data() {
      return {
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          appid: [{ required: true, message: '请输入appId', trigger: 'blur' }],
            appSecret: [{ required: true, message: '请输入appSecret', trigger: 'blur' }],
        }
      };
    },
    created() {
        this.getInfo()
    },
    methods: {
      getInfo() {
        wechatInfo().then(res => {
            if (res.code !== 200) return this.$modal.msgError(res.msg)
            this.form = {
                ...this.form,
                ...res.data
            }
        })
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            wechatEdit(this.form).then(res => {
                if (res.code !== 200) return this.$modal.msgError(res.msg)
                this.$modal.msgSuccess("修改成功");
            });
          }
        });
      },
    }
  };
  </script>
  <style lang="scss" scoped>
  .app-container-box {
    background-color: #f3f4f6;
    height: calc(100vh - 128px);
  }
  .app-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    height: 100%;
  }
  </style>
  