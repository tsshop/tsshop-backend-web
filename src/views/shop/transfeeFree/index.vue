<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="指定条件包邮项id" prop="transfeeFreeId">
        <el-input
          v-model="queryParams.transfeeFreeId"
          placeholder="请输入指定条件包邮项id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运费模板id" prop="transportId">
        <el-input
          v-model="queryParams.transportId"
          placeholder="请输入运费模板id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="需满金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入需满金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="包邮x件/重量/体积" prop="piece">
        <el-input
          v-model="queryParams.piece"
          placeholder="请输入包邮x件/重量/体积"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
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
          v-hasPermi="['shop:transfeeFree:add']"
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
          v-hasPermi="['shop:transfeeFree:edit']"
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
          v-hasPermi="['shop:transfeeFree:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:transfeeFree:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transfeeFreeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="指定条件包邮项id" align="center" prop="transfeeFreeId" />
      <el-table-column label="运费模板id" align="center" prop="transportId" />
      <el-table-column label="包邮方式 " align="center" prop="freeType" />
      <el-table-column label="需满金额" align="center" prop="amount" />
      <el-table-column label="包邮x件/重量/体积" align="center" prop="piece" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:transfeeFree:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:transfeeFree:remove']"
          >删除</el-button>
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

    <!-- 添加或修改包邮金额对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运费模板id" prop="transportId">
          <el-input v-model="form.transportId" placeholder="请输入运费模板id" />
        </el-form-item>
        <el-form-item label="需满金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入需满金额" />
        </el-form-item>
        <el-form-item label="包邮x件/重量/体积" prop="piece">
          <el-input v-model="form.piece" placeholder="请输入包邮x件/重量/体积" />
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
import { listTransfeeFree, getTransfeeFree, delTransfeeFree, addTransfeeFree, updateTransfeeFree } from "@/api/shop/transfeeFree";

export default {
  name: "TransfeeFree",
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
      // 包邮金额表格数据
      transfeeFreeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        transfeeFreeId: null,
        transportId: null,
        freeType: null,
        amount: null,
        piece: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询包邮金额列表 */
    getList() {
      this.loading = true;
      listTransfeeFree(this.queryParams).then(response => {
        this.transfeeFreeList = response.rows;
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
        transfeeFreeId: null,
        transportId: null,
        freeType: null,
        amount: null,
        piece: null
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
      this.ids = selection.map(item => item.transfeeFreeId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加包邮金额";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const transfeeFreeId = row.transfeeFreeId || this.ids
      getTransfeeFree(transfeeFreeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改包邮金额";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.transfeeFreeId != null) {
            updateTransfeeFree(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransfeeFree(this.form).then(response => {
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
      const transfeeFreeIds = row.transfeeFreeId || this.ids;
      this.$modal.confirm('是否确认删除包邮金额编号为"' + transfeeFreeIds + '"的数据项？').then(function() {
        return delTransfeeFree(transfeeFreeIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/transfeeFree/export', {
        ...this.queryParams
      }, `transfeeFree_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
