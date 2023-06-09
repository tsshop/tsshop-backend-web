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
          placeholder="请输入id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="秒杀开始时间" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择秒杀开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="秒杀结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择秒杀结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="修改截至时间" prop="updateEndTime">
        <el-date-picker clearable
          v-model="queryParams.updateEndTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择修改截至时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="是否关闭" prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入是否关闭"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="创建时间" prop="createTime">
        <el-date-picker clearable
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker clearable
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择更新时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="时间间隔" prop="timeInterval">
        <el-input
          v-model="queryParams.timeInterval"
          placeholder="请输入时间间隔"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择秒杀状态" clearable>
          <el-option
            v-for="dict in dict.type.seckill_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
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
          v-hasPermi="['shop:seckill:add']"
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
          v-hasPermi="['shop:seckill:edit']"
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
          v-hasPermi="['shop:seckill:remove']"
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
          v-hasPermi="['shop:seckill:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="seckillList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" width="80" />

      <el-table-column label="活动标题" align="center" prop="title" />
      <!-- <el-table-column label="是否关闭" align="center" prop="isDel" /> -->

      <!-- <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="时间间隔" align="center" prop="timeInterval" /> -->
      <el-table-column label="活动状态" align="center" prop="status" width="200">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.seckill_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="秒杀开始时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="秒杀结束时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="修改截至时间"
        align="center"
        prop="updateEndTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateEndTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="120"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:seckill:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:seckill:remove']"
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

    <!-- 添加或修改秒杀活动对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      :close-on-click-modal="false"
      width="1400px"
      append-to-body
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="120px"
        style="display: flex; flex-wrap: wrap"
        label-position="left"
      >
        <el-form-item label="活动标题" prop="title" style="width: 100%">
          <el-input
            v-model="form.title"
            type="textarea"
            placeholder="请输入内容"
            style="width: 400"
            :rows="3"
          />
        </el-form-item>
        <el-form-item label="秒杀开始时间" prop="startTime" style="width: 50%">
          <el-date-picker
            clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择秒杀开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="秒杀结束时间" prop="endTime" style="width: 50%">
          <el-date-picker
            clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择秒杀结束时间"
          >
          </el-date-picker>
        </el-form-item> -->
        <el-form-item label="修改截至时间" prop="updateEndTime" style="width: 50%">
          <el-date-picker
            clearable
            v-model="form.updateEndTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="请选择修改截至时间"
          >
          </el-date-picker>
        </el-form-item>

        <!-- <el-form-item label="是否关闭" prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入是否关闭" />
        </el-form-item> -->
        <!-- <el-form-item label="时间间隔" prop="timeInterval">
          <el-input v-model="form.timeInterval" placeholder="请输入时间间隔" />
        </el-form-item> -->
        <el-form-item label="活动状态" prop="status" style="width: 50%">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in dict.type.seckill_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>

        <div style="width: 100%" v-if="open">
          <seckill v-model="form"></seckill>
        </div>
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
  listSeckill,
  getSeckill,
  delSeckill,
  addSeckill,
  updateSeckill,
} from "@/api/shop/seckill";

import seckill from "@/components/Goods/seckill";

export default {
  name: "Seckill",
  dicts: ["seckill_status"],
  components: {
    seckill,
  },
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
      // 秒杀活动表格数据
      seckillList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        startTime: null,
        endTime: null,
        updateEndTime: null,
        title: null,
        isDel: null,
        createTime: null,
        updateTime: null,
        timeInterval: null,
        status: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        startTime: [{ required: true, message: "开始时间不能为空", trigger: "blur" }],
        // endTime: [{ required: true, message: "结束时间不能为空", trigger: "blur" }],
        updateEndTime: [
          { required: true, message: "修改截至时间不能为空", trigger: "blur" },
        ],
        status: [{ required: true, message: "状态不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询秒杀活动列表 */
    getList() {
      this.loading = true;
      listSeckill(this.queryParams).then((response) => {
        this.seckillList = response.rows;
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
        startTime: null,
        endTime: null,
        updateEndTime: null,
        title: null,
        isDel: null,
        createTime: null,
        updateTime: null,
        timeInterval: null,
        status: 0,
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
      this.title = "添加秒杀活动";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getSeckill(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改秒杀活动";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateSeckill(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addSeckill(this.form).then((response) => {
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
        .confirm('是否确认删除秒杀活动编号为"' + ids + '"的数据项？')
        .then(function () {
          return delSeckill(ids);
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
        "shop/seckill/export",
        {
          ...this.queryParams,
        },
        `seckill_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
