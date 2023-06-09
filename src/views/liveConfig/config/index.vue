<template>
  <div class="app-container-box">
    <div class="app-container">
      <div class="fs-26 mt-20" style="margin-bottom:50px;">提现设置</div>

    <!-- 添加或修改店铺提现配置对话框 -->
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="最小提现金额" prop="minWithdrawAmt">
        <!-- <el-input v-model="form.minWithdrawAmt" style="width:220px;" placeholder="请输入最小提现金额" /> -->
        <div style="display: flex; align-items: center">
          <el-input v-model="form.minWithdrawAmt" style="width:220px;" placeholder="请输入最小提现金额" />
          <i class="el-icon-warning-outline"
            style="font-size: 18px; color: #fea585;margin-right: 10px; margin-left: 5px;"></i>
          <div style="color:#999999;">0表示不限制</div>
        </div>
      </el-form-item>
      <el-form-item label="最大提现金额" prop="maxWithdrawAmt">
        <div style="display: flex; align-items: center">
          <el-input v-model="form.maxWithdrawAmt" style="width:220px;" placeholder="请输入最大提现金额" />
          <i class="el-icon-warning-outline"
            style="font-size: 18px; color: #fea585;margin-right: 10px; margin-left: 5px;"></i>
          <div style="color:#999999;">0表示不限制</div>
        </div>
        <!-- <el-input v-model="form.maxWithdrawAmt"  style="width:220px;" placeholder="请输入最大提现金额" /> -->
      </el-form-item>
      <el-form-item label="提现金额" prop="allowableWithdrawal">
        <el-radio-group v-model="form.allowableWithdrawal">
          <el-radio :label="true">需为整数</el-radio>
          <el-radio :label="false">无限制</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="余额提现" prop="allowableDecimal">
        <el-radio-group v-model="form.allowableDecimal">
          <el-radio :label="true">允许提现</el-radio>
          <el-radio :label="false">不允许提现</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="提现周期" prop="withdrawPeriod">
        <div class="flex flex-y-center">
          <el-radio-group v-model="form.withdrawPeriod">
            <div class="flex flex-y-center">
              <el-radio :label="0">每天</el-radio>
              <el-radio :label="1">每周</el-radio>
              <el-radio :label="2">每月</el-radio>
              
              
            </div>
          </el-radio-group>
          <el-form-item prop="withdrawNum">
            <div class="flex flex-y-center ml-10">
              <el-input type="text" size="mini" v-model="form.withdrawNum" style="width:50px;"/>
              <div class="ml-5">次</div>
              <i class="el-icon-warning-outline" style="font-size: 18px; color: #fea585;margin-right: 10px; margin-left: 5px;"></i>
              <div style="color:#999999;">0表示不限制</div>
            </div>
          </el-form-item>
          
        </div>
        
      </el-form-item>
      <el-form-item label="手续费" prop="withdrawRate">
        <div style="display: flex; align-items: center">
          <el-input
            v-model="form.withdrawRate"
            style="width: 120px"
            placeholder="请输入手续费"
          />
          <div style="margin-right: 10px; margin-left: 5px">%</div>
          <i
            class="el-icon-warning-outline"
            style="font-size: 18px; color: #fea585"
          ></i>
          <div style="color:#999999;">提现金额的百分比</div>
        </div>
      </el-form-item>
    </el-form>
    <el-button style="margin-top:60px;" type="primary" v-hasPermi="['appConfig:cashout:edit']" @click="submitForm">保存</el-button>
    </div>
    
  </div>
</template>

<script>
import { cashOutInfo, cashOutEdit } from "../../../api/system/cashOut";

export default {
  name: "Config",
  data() {
    return {
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        minWithdrawAmt: [{ required: true, message: '请输入最小提现金额', trigger: 'blur' }],
        maxWithdrawAmt: [{ required: true, message: '请输入最大提现金额', trigger: 'blur' }],
        allowableWithdrawal: [{ required: true, message: '请选择是否允许提现', trigger: 'change' }],
        allowableDecimal: [{ required: true, message: '请选择是否允许整数', trigger: 'change' }],
        withdrawPeriod: [{ required: true, message: '请选择提现周期', trigger: 'change' }],
        withdrawNum: [{ required: true, message: '请输入提现次数', trigger: 'blur' }],
        withdrawRate: [{ required: true, message: '请输入提现费率', trigger: 'blur' }],
      }
    };
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      cashOutInfo().then(res => {
          if(res.code !== 200) return
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
          cashOutEdit(this.form).then(response => {
            if(response.code !== 200) return this.$modal.msgError(response.msg)
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
