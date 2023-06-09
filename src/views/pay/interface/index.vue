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
      <el-form-item label="" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="支付提供方" prop="payProvider">
        <el-input
          v-model="queryParams.payProvider"
          placeholder="请输入支付提供方"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="支持的方式" prop="payTypes">
        <el-input
          v-model="queryParams.payTypes"
          placeholder="请输入支持的方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="isUse">
        <!-- <el-input
          v-model="queryParams.isUse"
          placeholder="请输入是否启用"
          clearable
          @keyup.enter.native="handleQuery"
        /> -->
        <el-select
          clearable
          v-model="queryParams.isUse"
          placeholder="请选择启用状态"
        >
          <el-option :value="false" label="未启用"></el-option>
          <el-option :value="true" label="已启用"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          clearable
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime">
        <el-date-picker
          clearable
          v-model="queryParams.updateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择更新时间"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
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
          v-hasPermi="['pay:interface:add']"
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
          v-hasPermi="['pay:interface:edit']"
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
          v-hasPermi="['pay:interface:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:interface:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="interfaceList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="名称" align="center" prop="name" />
      <!-- <el-table-column label="支付提供方" align="center" prop="payProvider" />
      <el-table-column
        label="配置模板"
        align="center"
        prop="configTemplate"
        show-overflow-tooltip
      />
      <el-table-column label="支持的方式" align="center" prop="payTypes" /> -->
      <el-table-column label="是否启用" align="center" prop="isUse">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.isUse == 0 ? 'info' : 'success'">{{
            scope.row.isUse == 0 ? "未启用" : "已启用"
          }}</el-tag> -->
          <div class="flex flex-y-center flex-x-y">
            <span style="margin-right: 6px">{{
              scope.row.isUse ? "已启用" : "未启用"
            }}</span>
            <el-switch
              @change="changeClose(scope.row, 'isUse')"
              size="mini"
              v-model="scope.row.isUse"
              :active-value="true"
              :inactive-value="false"
            ></el-switch>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['pay:interface:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:interface:remove']"
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

    <!-- 添加或修改支付接口对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="1200px"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="支付提供方" prop="payProvider">
          <!-- <el-input v-model="form.payProvider" placeholder="请输入支付提供方" /> -->
          <el-select v-model="form.payProvider" placeholder="请选择类型">
            <el-option
              v-for="(item, index) in typeList1"
              :key="index"
              :value="item.value"
              :label="item.label"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop="isUse">
          <!-- <el-input v-model="form.isUse" placeholder="请输入是否启用" /> -->
          <el-radio-group v-model="form.isUse" :disabled="form.id != null">
            <el-radio :label="false">未启用</el-radio>
            <el-radio :label="true">已启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="配置模板" prop="configTemplate">
          <!-- <el-input
            v-model="form.configTemplate"
            type="textarea"
            placeholder="请输入内容"
          /> -->
          <FormEdit
            v-model="form.configTemplate"
            v-if="open"
            ref="FormEdit"
          ></FormEdit>
        </el-form-item>

        <el-form-item label="支持的方式" prop="">
          <!-- <el-input v-model="form.payTypes" placeholder="请输入支持的方式" /> -->
          <el-checkbox-group v-model="form.payTypes1">
            <el-checkbox
              v-for="(item, index) in payList"
              :key="index"
              :label="item.type"
              >{{ item.typeName }}</el-checkbox
            >
          </el-checkbox-group>
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
  listInterface,
  getInterface,
  delInterface,
  addInterface,
  updateInterface,
  closeInterface,
} from "@/api/pay/interface";

import FormEdit from "../../../components/FormEdit/index.vue";

export default {
  name: "Interface",
  components: {
    FormEdit,
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
      // 支付接口表格数据
      interfaceList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        payProvider: null,
        configTemplate: null,
        payTypes: null,
        isUse: null,
        createTime: null,
        updateTime: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        payProvider: [
          { required: true, message: "支付提供方不能为空", trigger: "blur" },
        ],
        // configTemplate: [
        //   { required: true, message: "配置模板不能为空", trigger: "blur" },
        // ],
        isUse: [
          { required: true, message: "是否启用不能为空", trigger: "blur" },
        ],
      },
      typeList1: [],
      payList: [],
    };
  },
  created() {
    this.getList();
    this.getOtherInfo();
  },
  methods: {
    getOtherInfo() {
      this.request({
        url: "/pay/interface/getType",
      }).then((res) => {
        if (res.code != 200) return;
        this.typeList1 = Object.keys(res.data).map((val) => {
          return {
            value: val,
            label: res.data[val],
          };
        });
      });

      this.request({
        url: `pay/type/list?pageNum=1&pageSize=100`,
      }).then((res) => {
        if (res.code != 200) return;
        this.payList = res.rows;
      });
    },
    /** 查询支付接口列表 */
    getList() {
      this.loading = true;
      listInterface(this.queryParams).then((response) => {
        this.interfaceList = response.rows;
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
        name: null,
        payProvider: null,
        configTemplate: null,
        payTypes: "",
        payTypes1: [],
        isUse: true,
        createTime: null,
        updateTime: null,
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
      this.title = "添加支付接口";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getInterface(id).then((response) => {
        try {
          response.data.payTypes1 = JSON.parse(response.data.payTypes);
        } catch (e) {
          response.data.payTypes1 = [];
        }
        this.form = response.data;
        this.open = true;
        this.title = "修改支付接口";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.form.configTemplate = JSON.stringify(this.$refs.FormEdit.list);
      this.form.payTypes = JSON.stringify(this.form.payTypes1);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateInterface(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInterface(this.form).then((response) => {
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
        .confirm('是否确认删除支付接口编号为"' + ids + '"的数据项？')
        .then(function () {
          return delInterface(ids);
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
        "pay/interface/export",
        {
          ...this.queryParams,
        },
        `interface_${new Date().getTime()}.xlsx`
      );
    },
    // 开启关闭
    changeClose(row, key) {
      closeInterface({
        id: row.id,
        isUse: row.isUse,
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
        } else {
          row.isUse = !row.isUse;
        }
      });
    },
  },
};
</script>
