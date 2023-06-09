<template>
  <div class="app-container-box">
    <div class="box">
      <div class="line-tab flex flex-y-center">
        <div style="margin-left:30px;" class="tab-active" @click="changeLineType(0)">
          <div>短信设置（云极）</div>
          <div :class="{ line: lineType === 0 }" :style="{ backgroundColor: settings.theme }"></div>
        </div>
        <div style="margin-left:30px;" class="tab-active" @click="changeLineType(1)">
          <div>短信设置（阿里大于）</div>
          <div :class="{ line: lineType === 1 }" :style="{ backgroundColor: settings.theme }"></div>
        </div>
      </div>
      <div class="app-container">
        <!-- 添加或修改店铺提现配置对话框 -->
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="短信提醒" prop="openStatus">
            <el-radio-group v-model="form.openStatus">
              <el-radio :label="true">开启</el-radio>
              <el-radio :label="false">关闭</el-radio>
              <!-- <el-radio :label="2">微信钱包</el-radio> -->
            </el-radio-group>
          </el-form-item>
          <div v-if="lineType === 0">
            <el-form-item label="accessKeyAPI" prop="accessKey">
              <el-input v-model="form.accessKey" style="width:360px;" placeholder="请输入accessKey" />
            </el-form-item>
            <el-form-item label="accessSecretAPI" prop="accessSecret">
              <el-input v-model="form.accessSecret" style="width:360px;" placeholder="请输入accessSecretAPI" />
            </el-form-item>
            <el-form-item label="signCode" prop="signCode">
              <el-input v-model="form.signCode" style="width:360px;" placeholder="请输入signCode" />
            </el-form-item>
            <el-form-item label="templateCode" prop="templateCode">
              <el-input v-model="form.templateCode" style="width:360px;" placeholder="请输入templateCode" />
            </el-form-item>
            <el-form-item label="classificationSecret" prop="classificationSecret">
              <el-input v-model="form.classificationSecret" style="width:360px;" placeholder="请输入classificationSecret" />
            </el-form-item>
          </div>
          <div v-if="lineType === 1">
            <el-form-item label="accessKeyId" prop="accessKeyId">
              <el-input v-model="form.accessKeyId" style="width:360px;" placeholder="请输入accessKeyId" />
            </el-form-item>
            <el-form-item label="accessKeySecret" prop="accessKeySecret">
              <el-input v-model="form.accessKeySecret" style="width:360px;" placeholder="请输入accessKeySecret" />
            </el-form-item>
            <el-form-item label="signName" prop="signName">
              <el-input v-model="form.signName" style="width:360px;" placeholder="请输入signName" />
            </el-form-item>
            <el-form-item label="templateCode" prop="templateCode">
              <el-input v-model="form.templateCode" style="width:360px;" placeholder="请输入templateCode" />
            </el-form-item>
          </div>
        </el-form>
        <el-button style="margin-top:60px;" type="primary" v-hasPermi="['appConfig:message:edit']" @click="submitForm">保存</el-button>
      </div>
    </div>


  </div>
</template>
  
<script>
import { mapState } from 'vuex'
import { messageConfigInfo, messageConfigEdit, aliMessageConfigInfo, aliMessageConfigEdit } from "../../../api/system/message";

export default {
  name: "Config",
  data() {
    return {
      lineType: 0,
      apis: [
        {
          api: messageConfigInfo,
          edit: messageConfigEdit
        },
        {
          api: aliMessageConfigInfo,
          edit: aliMessageConfigEdit
        },
      ],
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        accessKey: [{ required: true, message: '请输入accessKeyAPI', trigger: 'blur' }],
        accessSecret: [{ required: true, message: '请输入accessSecretAPI', trigger: 'blur' }],
        signCode: [{ required: true, message: '请输入signCode', trigger: 'blur' }],
        templateCode: [{ required: true, message: '请输入templateCode', trigger: 'blur' }],
        classificationSecret: [{ required: true, message: '请输入reqUrl', trigger: 'blur' }],
        openStatus: [{ required: true, message: '请选择openStatus', trigger: 'change' }],

        accessKeyId: [{ required: true, message: '请输入accessKeyId', trigger: 'blur' }],
        accessKeySecret: [{ required: true, message: '请输入accessKeySecret', trigger: 'blur' }],
        signName: [{ required: true, message: '请输入signName', trigger: 'blur' }],
        templateCode: [{ required: true, message: '请输入templateCode', trigger: 'blur' }],
      }
    };
  },
  created() {
    this.getInfo()
  },
  computed: {
    ...mapState(['settings']),
    currentApi() {
      return this.apis[this.lineType]
    },
  },
  methods: {
    changeLineType(index) {
      this.lineType = index
      this.getInfo()
    },
    getInfo() {
      this.currentApi.api().then(res => {
        if(res.code !== 200) return this.$modal.msgError(res.msg)
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
          this.currentApi.edit(this.form).then(res => {
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

.line-tab {
  border-bottom: 1px solid #f3f6f9;
  height: 60px;
  font-size: 24px;
}

.tab-active {
  position: relative;
  cursor: pointer;

  .line {
    width: 100%;
    height: 3px;
    border-radius: 3px;
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.box {
  background-color: #fff;
  border-radius: 10px;
  height: 100%;
}

.app-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}</style>
  