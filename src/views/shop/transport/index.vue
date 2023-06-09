<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="运费模板id" prop="transportId">
        <el-input
          v-model="queryParams.transportId"
          placeholder="请输入运费模板id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运费模板名称" prop="transName">
        <el-input
          v-model="queryParams.transName"
          placeholder="请输入运费模板名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间">
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
      <el-form-item label="店铺id" prop="shopId">
        <el-input
          v-model="queryParams.shopId"
          placeholder="请输入店铺id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否包邮 0:不包邮 1:包邮" prop="isFreeFee">
        <el-input
          v-model="queryParams.isFreeFee"
          placeholder="请输入是否包邮 0:不包邮 1:包邮"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否含有包邮条件 0 否 1是" prop="hasFreeCondition">
        <el-input
          v-model="queryParams.hasFreeCondition"
          placeholder="请输入是否含有包邮条件 0 否 1是"
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
          v-hasPermi="['shop:transport:add']"
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
          v-hasPermi="['shop:transport:edit']"
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
          v-hasPermi="['shop:transport:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:transport:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transportList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="运费模板id" align="center" prop="transportId" />
      <el-table-column label="运费模板名称" align="center" prop="transName" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="店铺id" align="center" prop="shopId" />
      <el-table-column label="收费方式" align="center" prop="chargeType" />
      <el-table-column label="是否包邮 0:不包邮 1:包邮" align="center" prop="isFreeFee" />
      <el-table-column label="是否含有包邮条件 0 否 1是" align="center" prop="hasFreeCondition" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:transport:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:transport:remove']"
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

    <!-- 添加或修改运费模板对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运费模板名称" prop="transName">
          <el-input v-model="form.transName" placeholder="请输入运费模板名称" />
        </el-form-item>
        <el-form-item label="店铺id" prop="shopId">
          <el-input v-model="form.shopId" placeholder="请输入店铺id" />
        </el-form-item>
        <el-form-item label="是否包邮 0:不包邮 1:包邮" prop="isFreeFee">
          <el-input v-model="form.isFreeFee" placeholder="请输入是否包邮 0:不包邮 1:包邮" />
        </el-form-item>
        <el-form-item label="是否含有包邮条件 0 否 1是" prop="hasFreeCondition">
          <el-input v-model="form.hasFreeCondition" placeholder="请输入是否含有包邮条件 0 否 1是" />
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
import { listTransport, getTransport, delTransport, addTransport, updateTransport } from "@/api/shop/transport";

export default {
  name: "Transport",
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
      // 运费模板表格数据
      transportList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否含有包邮条件 0 否 1是时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        transportId: null,
        transName: null,
        createTime: null,
        shopId: null,
        chargeType: null,
        isFreeFee: null,
        hasFreeCondition: null
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
    /** 查询运费模板列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] = this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listTransport(this.queryParams).then(response => {
        this.transportList = response.rows;
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
        transportId: null,
        transName: null,
        createTime: null,
        shopId: null,
        chargeType: null,
        isFreeFee: null,
        hasFreeCondition: null
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
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.transportId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加运费模板";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const transportId = row.transportId || this.ids
      getTransport(transportId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改运费模板";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.transportId != null) {
            updateTransport(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransport(this.form).then(response => {
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
      const transportIds = row.transportId || this.ids;
      this.$modal.confirm('是否确认删除运费模板编号为"' + transportIds + '"的数据项？').then(function() {
        return delTransport(transportIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/transport/export', {
        ...this.queryParams
      }, `transport_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
