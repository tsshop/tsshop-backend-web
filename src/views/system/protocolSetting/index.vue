<template>
    <div class="app-container-box">
      <div class="app-container">
        
  
      <!-- 添加或修改店铺提现配置对话框 -->
      <el-form ref="form" :model="form" :rules="rules" label-width="120px" style="width:100%">
        <div class="edit-item mb-20">
          <div class="fs-22 text-center" style="margin-bottom:20px;">服务协议</div>
          <el-form-item label="协议名称" prop="serviceTitle">
              <el-input v-model="form.serviceTitle" style="" placeholder="请输入协议名称" />
          </el-form-item>
          <div class="pl-40">
            <editor v-model="form.serviceAgreement" :min-height="200" />
          </div>
        </div>

        <div class="edit-item mb-20">
          <div class="fs-22 text-center" style="margin-bottom:20px;">隐私协议</div>
          <el-form-item label="协议名称" prop="privacyTitle">
              <el-input v-model="form.privacyTitle" style="" placeholder="请输入协议名称" />
          </el-form-item>
          <div class="pl-40">
            <editor v-model="form.privacyAgreement" :min-height="200" />
          </div>
        </div>

        <div class="edit-item mb-20">
          <div class="fs-22 text-center" style="margin-bottom:20px;">支付协议</div>
          <el-form-item label="协议名称" prop="payTitle">
              <el-input v-model="form.payTitle" style="" placeholder="请输入协议名称" />
          </el-form-item>
          <div class="pl-40">
            <editor v-model="form.payAgreement" :min-height="200" />
          </div>
        </div>
      </el-form>
        <el-button style="margin-top:60px;" type="primary" v-hasPermi="['appConfig:agreement:edit']" @click="submitForm">保存</el-button>
      </div>
      
    </div>
  </template>
  
  <script>
  import Editor from '@/components/Editor/index'
  import { protocolInfo, protocolEdit } from "../../../api/system/protocolSetting";
  
  export default {
    components:{ Editor },
    name: "Config",
    data() {
      return {
        // 表单参数
        form: {},
        // 表单校验
        rules: {
        }
      };
    },
    created() {
        this.getInfo()
    },
    methods: {
      onChange(row,key) {
        this.form[key] = row.html
      },
      getInfo() {
        protocolInfo().then(res => {
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
            protocolEdit(this.form).then(res => {
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
    background-color: #f2f3f5;
  }
  .app-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: #f2f3f5;
    border-radius: 10px;
  }
  .edit-item {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    width: 100%;
  }
  </style>
  