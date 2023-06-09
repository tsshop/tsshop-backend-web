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
          placeholder="请输入反馈ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="创建时间开始日期"
          end-placeholder="创建时间结束日期"
        ></el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="反馈类型" prop="type">
        <el-input
          v-model="queryParams.type"
          placeholder="请输入反馈类型"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
          <el-option
            v-for="dict in dict.type.feedback_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入电话"
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
          v-hasPermi="['shop:feedback:add']"
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
          v-hasPermi="['shop:feedback:edit']"
          >修改</el-button
        >
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['shop:feedback:remove']"
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
          v-hasPermi="['shop:feedback:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="feedbackList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="反馈ID" align="center" prop="id" width="80" />
      <el-table-column label="用户ID" align="center" prop="userId" width="80" />

      <!-- <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="昵称" align="center" prop="name" width="200"/>
      <el-table-column label="电话" align="center" prop="phone" width="120"/>

      <el-table-column label="反馈类型" align="center" prop="type" width="200" />
      <el-table-column label="图片" align="center" prop="image" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.image" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" width="120">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.feedback_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="反馈内容" align="center" prop="detail" />
      <el-table-column label="处理意见" align="center" prop="opinion" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        fixed="right"
        width="100"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:feedback:edit']"
            >修改</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:feedback:remove']"
            >删除</el-button
          > -->
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

    <!-- 添加或修改反馈对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form
        class="feekback"
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        label-position="left"
      >
        <el-form-item label="用户ID" prop="userId">
          <!-- <el-input v-model="form.userId" placeholder="请输入用户ID" /> -->
          <div>{{ form.userId }}</div>
        </el-form-item>
        <el-form-item label="反馈类型" prop="type">
          <!-- <el-input v-model="form.type" placeholder="请输入反馈类型" /> -->
          <div>{{ form.type }}</div>
        </el-form-item>

        <el-form-item label="反馈内容" prop="detail">
          <!-- <el-input v-model="form.detail" type="textarea" placeholder="请输入内容" /> -->
          <div>{{ form.detail }}</div>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <!-- <el-input v-model="form.name" placeholder="请输入姓名" /> -->
          <div>{{ form.name }}</div>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <!-- <el-input v-model="form.phone" placeholder="请输入电话" /> -->
          <div>{{ form.phone }}</div>
        </el-form-item>
        <el-form-item label="图片" prop="image">
          <image-preview :src="form.image" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in dict.type.feedback_status"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="处理意见" prop="opinion">
          <el-input v-model="form.opinion" type="textarea" :rows="6" placeholder="请输入内容" />
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
  listFeedback,
  getFeedback,
  delFeedback,
  addFeedback,
  updateFeedback,
} from "@/api/shop/feedback";

export default {
  name: "Feedback",
  dicts: ["feedback_status"],
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
      // 反馈表格数据
      feedbackList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 处理意见时间范围
      daterangeCreateTime: [],
      // 处理意见时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        userId: null,
        createTime: null,
        updateTime: null,
        type: null,
        detail: null,
        image: null,
        status: null,
        name: null,
        phone: null,
        opinion: null,
        orderByColumn: "id desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        // userId: [{ required: true, message: "用户ID不能为空", trigger: "blur" }],
        // createTime: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // detail: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        // image: [{ required: true, message: "图片不能为空", trigger: "blur" }],
        status: [
          {
            required: true,
            message: "状态不能为空",
            trigger: "change",
          },
        ],
        // name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
        // phone: [{ required: true, message: "电话不能为空", trigger: "blur" }],
        // opinion: [{ required: true, message: "处理意见不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询反馈列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && "" != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      if (null != this.daterangeUpdateTime && "" != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] = this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      listFeedback(this.queryParams).then((response) => {
        this.feedbackList = response.rows;
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
        createTime: null,
        updateTime: null,
        type: null,
        detail: null,
        image: null,
        status: null,
        name: null,
        phone: null,
        opinion: null,
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
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加反馈";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getFeedback(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改反馈";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateFeedback(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addFeedback(this.form).then((response) => {
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
        .confirm('是否确认删除反馈编号为"' + ids + '"的数据项？')
        .then(function () {
          return delFeedback(ids);
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
        "shop/feedback/export",
        {
          ...this.queryParams,
        },
        `feedback_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>

<style>
.feekback div {
  font-size: 14px;
  color: #888;
}
</style>
