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
      <el-form-item label="" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="dvyName">
        <el-input
          v-model="queryParams.dvyName"
          placeholder="请输入物流公司名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="公司主页" prop="companyHomeUrl">
        <el-input
          v-model="queryParams.companyHomeUrl"
          placeholder="请输入公司主页"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="建立时间">
        <el-date-picker
          v-model="daterangeRecTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="修改时间">
        <el-date-picker
          v-model="daterangeModifyTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="快递鸟编码" prop="expressBird">
        <el-input
          v-model="queryParams.expressBird"
          placeholder="请输入快递鸟编码"
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
          v-hasPermi="['shop:delivery:add']"
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
          v-hasPermi="['shop:delivery:edit']"
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
          v-hasPermi="['shop:delivery:remove']"
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
          v-hasPermi="['shop:delivery:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="deliveryList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="left" />
      <el-table-column label="ID" align="left" prop="id" width="80" />
      <el-table-column label="物流公司名称" align="left" prop="dvyName" width="200" />
      <el-table-column label="快递鸟编码" align="left" prop="expressBird" width="200" />
      <el-table-column label="建立时间" align="left" prop="recTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.recTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="公司主页" align="left" prop="companyHomeUrl" />

      <!-- <el-table-column label="修改时间" align="left" prop="modifyTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.modifyTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="物流查询接口" align="left" prop="queryUrl" />
      <el-table-column
        label="操作"
        align="left"
        class-name="small-padding fixed-width"
        width="140"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:delivery:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:delivery:remove']"
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

    <!-- 添加或修改物流公司对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="物流公司名称" prop="dvyName">
          <el-input v-model="form.dvyName" placeholder="请输入物流公司名称" />
        </el-form-item>
        <el-form-item label="快递鸟编码" prop="expressBird">
          <el-input v-model="form.expressBird" placeholder="请输入快递鸟编码" />
        </el-form-item>
        <el-form-item label="公司主页" prop="companyHomeUrl">
          <el-input
            v-model="form.companyHomeUrl"
            type="textarea"
            placeholder="请输入公司主页"
          />
        </el-form-item>
        <el-form-item label="物流查询接口" prop="queryUrl">
          <el-input v-model="form.queryUrl" type="textarea" placeholder="请输入内容" />
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
  listDelivery,
  getDelivery,
  delDelivery,
  addDelivery,
  updateDelivery,
} from "@/api/shop/delivery";

export default {
  name: "Delivery",
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
      // 物流公司表格数据
      deliveryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 快递鸟编码时间范围
      daterangeRecTime: [],
      // 快递鸟编码时间范围
      daterangeModifyTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        dvyName: null,
        companyHomeUrl: null,
        recTime: null,
        modifyTime: null,
        queryUrl: null,
        expressBird: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dvyName: [{ required: true, message: "物流公司名称不能为空", trigger: "blur" }],
        // companyHomeUrl: [
        //   { required: true, message: "公司主页不能为空", trigger: "blur" }
        // ],
        expressBird: [{ required: true, message: "快递鸟编码不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询物流公司列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeRecTime && "" != this.daterangeRecTime) {
        this.queryParams.params["beginRecTime"] = this.daterangeRecTime[0];
        this.queryParams.params["endRecTime"] = this.daterangeRecTime[1];
      }
      if (null != this.daterangeModifyTime && "" != this.daterangeModifyTime) {
        this.queryParams.params["beginModifyTime"] = this.daterangeModifyTime[0];
        this.queryParams.params["endModifyTime"] = this.daterangeModifyTime[1];
      }
      listDelivery(this.queryParams).then((response) => {
        this.deliveryList = response.rows;
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
        dvyName: null,
        companyHomeUrl: null,
        recTime: null,
        modifyTime: null,
        queryUrl: null,
        expressBird: null,
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
      this.daterangeRecTime = [];
      this.daterangeModifyTime = [];
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
      this.title = "添加物流公司";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getDelivery(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改物流公司";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateDelivery(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDelivery(this.form).then((response) => {
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
        .confirm('是否确认删除物流公司编号为"' + ids + '"的数据项？')
        .then(function () {
          return delDelivery(ids);
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
        "shop/delivery/export",
        {
          ...this.queryParams,
        },
        `delivery_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
