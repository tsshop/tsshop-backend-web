<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item label="" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入支付名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="thoroughfareName">
        <el-input
          v-model="queryParams.thoroughfareName"
          placeholder="请输入通道名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="支付id" prop="payId">
        <el-input
          v-model="queryParams.payId"
          placeholder="请输入支付id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付类型描述" prop="remark">
        <el-input
          v-model="queryParams.remark"
          placeholder="请输入支付类型描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付参数" prop="param">
        <el-input
          v-model="queryParams.param"
          placeholder="请输入支付参数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['pay:config:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['pay:config:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['pay:config:remove']"
          >删除</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:config:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="configList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" width="120" />
      <el-table-column label="支付logo" align="center" prop="logo" width="120">
        <template slot-scope="scope">
          <image-preview :src="scope.row.logo" :width="50" :height="50" width="120" />
        </template>
      </el-table-column>
      <el-table-column label="支付名称" align="center" prop="name" width="120" />
      <el-table-column
        label="通道名称"
        align="center"
        prop="thoroughfareName"
        width="120"
      />
      <el-table-column label="支付id" align="center" prop="payId" width="120" />
      <el-table-column label="支付类型描述" align="center" prop="remark">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pay_to_type" :value="scope.row.remark" />
        </template>
      </el-table-column>
      <el-table-column label="支付参数" align="center" prop="param" />
      <el-table-column label="是否启用" align="center" prop="isUse" width="120">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isUse ? 'success' : 'info'">{{
            scope.row.isUse ? "已启用" : "未启用"
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="140"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:config:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:config:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改支付配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="支付logo" prop="logo">
          <!-- <el-input v-model="form.logo" placeholder="请输入支付logo" /> -->
          <image-upload v-model="form.logo" :limit="1" />
        </el-form-item>
        <el-form-item label="支付名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入支付名称" />
        </el-form-item>
        <el-form-item label="通道名称" prop="thoroughfareName">
          <el-input v-model="form.thoroughfareName" placeholder="请输入通道名称" />
        </el-form-item>
        <el-form-item label="支付id" prop="payId">
          <el-input v-model="form.payId" placeholder="请输入支付id" />
        </el-form-item>
        <el-form-item label="支付类型描述" prop="remark">
          <!-- <el-input v-model="form.remark" placeholder="请输入支付类型描述" /> -->
          <el-select v-model="form.remark">
            <el-option
              v-for="dict in dict.type.pay_to_type"
              :value="dict.value"
              :label="dict.label"
              :key="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="payId">
          <el-switch v-model="form.isUse"></el-switch>
        </el-form-item>
        <el-form-item label="支付参数" prop="param">
          <el-input
            type="textarea"
            rows="3"
            v-model="form.param"
            placeholder="请输入支付参数"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listConfig,
  getConfig,
  delConfig,
  addConfig,
  updateConfig,
} from "@/api/pay/config";

export default {
  name: "Config",
  dicts: ["pay_to_type"],
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
      // 支付配置表格数据
      configList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        logo: null,
        name: null,
        thoroughfareName: null,
        payId: null,
        remark: null,
        param: null,
        isUse: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询支付配置列表 */
    getList() {
      this.loading = true;
      listConfig(this.queryParams).then((response) => {
        this.configList = response.rows;
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
        logo: null,
        name: null,
        thoroughfareName: null,
        payId: null,
        remark: null,
        param: null,
        isUse: true,
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加支付配置";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getConfig(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改支付配置";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateConfig(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addConfig(this.form).then((response) => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除支付配置编号为"' + ids + '"的数据项？')
        .then(function () {
          return delConfig(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess("删除成功");
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "pay/config/export",
        {
          ...this.queryParams,
        },
        `config_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
