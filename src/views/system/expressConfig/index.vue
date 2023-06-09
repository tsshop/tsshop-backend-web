<template>
    <div class="app-container-box">
      <div class="app-container">
        <div class="fs-26 mt-20" style="margin-bottom:50px;">快递设置(快递鸟)</div>
  
      <!-- 添加或修改店铺提现配置对话框 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        
        <el-form-item label="appId" prop="appId">
            <el-input v-model="form.appId" style="width:360px;" placeholder="请输入appId" />
        </el-form-item>
        <el-form-item label="appKey" prop="appKey">
            <el-input v-model="form.appKey" style="width:360px;" placeholder="请输入appKey" />
        </el-form-item>
        <el-form-item label="enable" prop="enable">
            <el-radio-group v-model="form.enable">
                <el-radio label="true">开启</el-radio>
                <el-radio label="false">关闭</el-radio>
              </el-radio-group>
        </el-form-item>
        <el-form-item label="reqUrl" prop="reqUrl">
            <el-input v-model="form.reqUrl" style="width:360px;" placeholder="请输入reqUrl" />
        </el-form-item>
      </el-form>
      <el-button style="margin-top:60px;" type="primary" v-hasPermi="['appConfig:kdniao:edit']" @click="submitForm">保存</el-button>
      </div>
      
    </div>
  </template>
  
  <script>
  import { expressConfigInfo, expressConfigEdit } from "../../../api/system/expressConfig";
  
  export default {
    name: "Config",
    data() {
      return {
        // 表单参数
        form: {},
        // 表单校验
        rules: {
            appId: [{ required: true, message: '请输入appId', trigger: 'blur' }],
            appKey: [{ required: true, message: '请输入appKey', trigger: 'blur' }],
            enable: [{ required: true, message: '请选择enable', trigger: 'change' }],
            reqUrl: [{ required: true, message: '请输入reqUrl', trigger: 'blur' }],
        }
      };
    },
    created() {
        this.getInfo()
    },
    methods: {
      
      getInfo() {
        expressConfigInfo().then(res => {
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
              expressConfigEdit(this.form).then(res => {
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
  