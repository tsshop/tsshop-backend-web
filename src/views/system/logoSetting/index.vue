<template>
    <div class="app-container-box">
      <div class="app-container">
        <div class="fs-26 mt-20" style="margin-bottom:50px;">系统设置</div>
  
      <!-- 添加或修改店铺提现配置对话框 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="系统名称" prop="appName">
          <el-input v-model="form.appName" style="width:360px;" placeholder="请输入appKey" />
      </el-form-item>
        <el-form-item label="系统图标" prop="appIcon">
          <image-upload :limit="1" v-model="form.appIcon" />
        </el-form-item>
        <el-form-item label="默认头像" prop="defaultHeadPortrait">
          <image-upload :limit="1" v-model="form.defaultHeadPortrait" />
        </el-form-item>
        
      </el-form>
      <el-button style="margin-top:60px;" type="primary" v-hasPermi="['appConfig:app:edit']" @click="submitForm">保存</el-button>
      </div>
      
    </div>
  </template>
  
  <script>
  import { systemEdit } from "../../../api/system/logoSetting";
  export default {
    name: "Config",
    data() {
      return {
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          appName: [{ required: true, message: '请输入appId', trigger: 'blur' }],
          appIcon: [{ required: true, message: '请选择enable', trigger: 'change' }],
          defaultHeadPortrait: [{ required: true, message: '请选择enable', trigger: 'change' }],
        }
      };
    },
    created() {
        this.form = JSON.parse(JSON.stringify(this.$store.state.user.systemInfo1))
    },
    methods: {
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            systemEdit(this.form).then(res => {
              if (res.code !== 200) return this.$modal.msgError(res.msg)
              this.$modal.msgSuccess("修改成功");
              this.$store.commit('SET_SYSTEMINFO',this.form)
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
  