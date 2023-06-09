<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="130px">
      <!-- <el-form-item label="主键" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入主键"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入申请人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="managerName">
        <el-input
          v-model="queryParams.managerName"
          placeholder="请输入申请人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="managerPhone">
        <el-input
          v-model="queryParams.managerPhone"
          placeholder="请输入联系电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="managerIdCard">
        <el-input
          v-model="queryParams.managerIdCard"
          placeholder="请输入身份证号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="auditStatus">
        <el-select
          clearable
          v-model="queryParams.auditStatus"
          placeholder="请选择审核状态"
        >
          <el-option :value="0" label="未审核"></el-option>
          <el-option :value="1" label="通过"></el-option>
          <el-option :value="2" label="未通过"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="liveStoreType">
        <el-select
          clearable
          v-model="queryParams.liveStoreType"
          placeholder="请选择订单状态"
        >
          <el-option :value="0" label="个人"></el-option>
          <el-option :value="1" label="商户"></el-option>
          <!-- <el-option :value="2" label="已退款"></el-option> -->
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="企业名称" prop="enterpriseName">
        <el-input
          v-model="queryParams.enterpriseName"
          placeholder="请输入企业名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="企业统一信用代码" prop="enterpriseCreditCode">
        <el-input
          v-model="queryParams.enterpriseCreditCode"
          placeholder="请输入企业统一信用代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="更新时间">
        <el-date-picker
          v-model="daterangeUpdateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:apply:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:apply:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:apply:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:apply:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row> -->

    <el-table v-loading="loading" :data="applyList" >
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="申请人id" align="center" prop="userId" />
      <el-table-column label="申请人" align="center" prop="managerName" />
      <el-table-column label="联系电话" align="center" prop="managerPhone" />
      <el-table-column label="身份证号" align="center" prop="managerIdCard" />
      <el-table-column label="申请类型" align="center" prop="liveStoreType" >
        <template slot-scope="{row}">
          <div>
            <el-tag :type="['success','warning'][row.liveStoreType]">{{ ['个人','商户'][row.liveStoreType] }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" prop="auditStatus" >
        <template slot-scope="{row}">
          <div>
            <el-tag :type="['success','warning','danger'][row.auditStatus]">{{ ['未审核','通过','未通过'][row.auditStatus] }}</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="备注" show-overflow-tooltip="" align="center" prop="remark" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button
            size="mini"
            type="text"
            v-if="row.auditStatus == 0"
            @click="handleUpdate(row,'edit')"
            v-hasPermi="['system:apply:edit']"
          >审核</el-button>
          <el-button
            size="mini"
            type="text"
            v-else
            @click="handleUpdate(row,'look')"
            v-hasPermi="['system:apply:remove']"
          >查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改直播小店申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="申请类型：" prop="liveStoreType">
          <el-input v-model="['个人','商户'][form.liveStoreType]" disabled placeholder="请输入申请类型" />
        </el-form-item>
        <el-form-item label="负责人/经营者姓名：" prop="managerName">
          <el-input v-model="form.managerName" disabled placeholder="请输入负责人/经营者姓名" />
        </el-form-item>
        <el-form-item label="负责人/经营者手机号：" prop="managerPhone">
          <el-input v-model="form.managerPhone" disabled placeholder="请输入负责人/经营者手机号" />
        </el-form-item>
        <el-form-item label="负责人/经营者身份证号：" prop="managerIdCard">
          <el-input v-model="form.managerIdCard" disabled placeholder="请输入负责人/经营者身份证号" />
        </el-form-item>
        <el-form-item label="身份证正反面面照片：" prop="idCardObverse">
          <div style="display:flex;">
            <el-image 
              style="width:160px;height:90px;border-radius:10px;margin-right:10px"
              :src="form.idCardObverse"
              :preview-src-list="[form.idCardObverse]">
            </el-image>
            <el-image 
              style="width:160px;height:90px;border-radius:10px;"
              :src="form.idCardReverse"
              :preview-src-list="[form.idCardReverse]">
            </el-image>
          </div>
        </el-form-item>
        <!-- 0个人 1商户 -->
        <div v-if="form.liveStoreType === 1">
          <el-form-item label="营业执照：" prop="businessLicense">
            <el-image 
                style="width:160px;height:90px;border-radius:10px;"
                :src="form.businessLicense"
                :preview-src-list="[form.businessLicense]">
              </el-image>
          </el-form-item>
          <el-form-item label="企业名称："  prop="enterpriseName">
            <el-input v-model="form.enterpriseName" disabled placeholder="请输入企业名称" />
          </el-form-item>
          <el-form-item label="企业统一信用代码："  prop="enterpriseCreditCode">
            <el-input v-model="form.enterpriseCreditCode" disabled placeholder="请输入企业统一信用代码" />
          </el-form-item>
        </div>
        <el-form-item label="审核结果：">
          <el-radio-group v-model="form.auditStatus" :disabled="this.type!== 'edit'">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注：" prop="remark" >
          <el-input type="textarea" :disabled="this.type!== 'edit'" v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="this.type === 'edit'">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listApply, getApply, delApply, addApply, updateApply } from "@/api/liveStore/apply";

export default {
  name: "Apply",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 直播小店申请表格数据
      applyList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 企业统一信用代码时间范围
      daterangeCreateTime: [],
      // 企业统一信用代码时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        userId: null,
        managerName: null,
        managerPhone: null,
        managerIdCard: null,
        liveStoreType: null,
        auditStatus: null,
        enterpriseName: null,
        enterpriseCreditCode: null,
        createTime: null,
        updateTime: null,
         orderByColumn: "id desc",
      },
      type:'edit',
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    if(this.$route.query.auditStatus) {
      this.queryParams.auditStatus = Number(this.$route.query.auditStatus)
    }
    this.getList();
  },
  methods: {
    /** 查询直播小店申请列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      if (null != this.daterangeUpdateTime && '' != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] = this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      listApply(this.queryParams).then(response => {
        this.applyList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        managerName: null,
        managerPhone: null,
        managerIdCard: null,
        liveStoreType: null,
        auditStatus: null,
        remark: null,
        idCardObverse: null,
        idCardReverse: null,
        businessLicense: null,
        enterpriseName: null,
        enterpriseCreditCode: null,
        createTime: null,
        updateTime: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeCreateTime = [];
      this.daterangeUpdateTime = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加直播小店申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row,type) {
      this.reset();
      const id = row.id || this.ids
      getApply(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = (type === 'edit' ? '审核' : '查看') + "直播小店申请";
        this.type = type
      });
    },
    /** 提交按钮 */
    submitForm() {
      if(this.form.auditStatus === 2 && !this.form.remark) return this.$modal.msgError("拒绝须填写备注");
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateApply(this.form).then(response => {
            this.$modal.msgSuccess("修改成功");
            this.open = false;
            this.getList();
          });
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除直播小店申请编号为"' + ids + '"的数据项？').then(function() {
        return delApply(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('system/apply/export', {
        ...this.queryParams
      }, `apply_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
