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
      <el-form-item label="平台类型" prop="id">
        <el-select v-model="queryParams.type" placeholder="请选择平台类型" clearable>
          <el-option :value="1" label="安卓"></el-option>
          <el-option :value="2" label="ios"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="版本编号" prop="verionNo">
        <el-input
          v-model="queryParams.verionNo"
          placeholder="请输入版本编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          clearable
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间"
        >
        </el-date-picker>
      </el-form-item> -->
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
      <!-- <el-form-item label="发布时间">
        <el-date-picker
          v-model="daterangeReleaseTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
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
          v-hasPermi="['im:edition:add']"
          >新增</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['im:edition:edit']"
          >修改</el-button
        >
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['im:edition:remove']"
          >删除</el-button
        >
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['im:edition:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="editionList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="left" />
      <el-table-column label="id" align="left" prop="id" width="80" />
      <el-table-column label="版本编号" align="left" prop="verionNo" width="120" />
      <el-table-column label="平台类型" align="left" prop="type" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.type == 1 ? "安卓" : "ios" }}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="创建时间" align="left" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="更新时间" align="left" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="发布状态" align="left" prop="status" width="160">
        <template slot-scope="scope">
          <el-tag
            :type="
              scope.row.status == 1
                ? 'success'
                : scope.row.status == 2
                ? 'default'
                : 'danger'
            "
          >
            <span>{{
              scope.row.status == 1
                ? "已发布"
                : scope.row.status == 2
                ? "待发布"
                : "已下架"
            }}</span>
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="left" prop="releaseTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.releaseTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="下载链接" align="left" prop="url" />
      <el-table-column label="版本迭代说明" align="left" prop="remark" />
      <el-table-column
        label="操作"
        align="left"
        width="160"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['im:edition:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['im:edition:remove']"
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

    <!-- 添加或修改版本控制对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="平台类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择平台类型" clearable>
            <el-option :value="1" label="安卓"></el-option>
            <el-option :value="2" label="ios"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="版本编号" prop="verionNo">
          <el-input v-model="form.verionNo" placeholder="请输入版本编号" />
        </el-form-item>
        <el-form-item label="下载链接" prop="url">
          <el-input v-model="form.url" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="版本迭代说明" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="发布状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择发布状态" clearable>
            <el-option :value="1" label="已发布"></el-option>
            <el-option :value="2" label="待发布"></el-option>
            <el-option :value="3" label="已下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发布时间" prop="releaseTime">
          <el-date-picker
            clearable
            v-model="form.releaseTime"
            type="datetime"
            value-format="yyyy-MM-dd hh:mm:ss"
            placeholder="请选择发布时间"
          >
          </el-date-picker>
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
  listEdition,
  getEdition,
  delEdition,
  addEdition,
  updateEdition,
} from "@/api/shop/edition";

export default {
  name: "Edition",
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
      // 版本控制表格数据
      editionList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 发布时间时间范围
      daterangeUpdateTime: [],
      // 发布时间时间范围
      daterangeReleaseTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        verionNo: null,
        type: null,
        url: null,
        createTime: null,
        updateTime: null,
        remark: null,
        status: null,
        releaseTime: null,
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
    /** 查询版本控制列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeUpdateTime && "" != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] = this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      if (null != this.daterangeReleaseTime && "" != this.daterangeReleaseTime) {
        this.queryParams.params["beginReleaseTime"] = this.daterangeReleaseTime[0];
        this.queryParams.params["endReleaseTime"] = this.daterangeReleaseTime[1];
      }
      listEdition(this.queryParams).then((response) => {
        this.editionList = response.rows;
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
        verionNo: null,
        type: null,
        url: null,
        createTime: null,
        updateTime: null,
        remark: null,
        status: null,
        releaseTime: null,
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
      this.daterangeUpdateTime = [];
      this.daterangeReleaseTime = [];
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
      this.title = "添加版本控制";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getEdition(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改版本控制";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateEdition(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addEdition(this.form).then((response) => {
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
        .confirm('是否确认删除版本控制编号为"' + ids + '"的数据项？')
        .then(function () {
          return delEdition(ids);
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
        "im/edition/export",
        {
          ...this.queryParams,
        },
        `edition_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
