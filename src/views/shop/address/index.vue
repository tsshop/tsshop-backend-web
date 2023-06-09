<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="收货地址ID" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入收货地址ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货人姓名" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入收货人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货电话" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入收货电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省ID" prop="province">
        <el-input
          v-model="queryParams.province"
          placeholder="请输入省ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市ID" prop="city">
        <el-input
          v-model="queryParams.city"
          placeholder="请输入市ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区ID" prop="area">
        <el-input
          v-model="queryParams.area"
          placeholder="请输入区ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否已删除 " prop="deleted">
        <el-input
          v-model="queryParams.deleted"
          placeholder="请输入是否已删除 "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
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
      <el-form-item label="是否默认收货地址" prop="defaultCargo">
        <el-input
          v-model="queryParams.defaultCargo"
          placeholder="请输入是否默认收货地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省名" prop="provinceName">
        <el-input
          v-model="queryParams.provinceName"
          placeholder="请输入省名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="城市名" prop="cityName">
        <el-input
          v-model="queryParams.cityName"
          placeholder="请输入城市名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="区名" prop="areaName">
        <el-input
          v-model="queryParams.areaName"
          placeholder="请输入区名"
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
          v-hasPermi="['shop:address:add']"
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
          v-hasPermi="['shop:address:edit']"
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
          v-hasPermi="['shop:address:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:address:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="addressList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="收货地址ID" align="center" prop="id" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="收货人姓名" align="center" prop="name" />
      <el-table-column label="收货电话" align="center" prop="phone" />
      <el-table-column label="省ID" align="center" prop="province" />
      <el-table-column label="市ID" align="center" prop="city" />
      <el-table-column label="区ID" align="center" prop="area" />
      <el-table-column label="详细地址" align="center" prop="detailAddr" />
      <el-table-column label="是否已删除 " align="center" prop="deleted" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否默认收货地址" align="center" prop="defaultCargo" />
      <el-table-column label="省名" align="center" prop="provinceName" />
      <el-table-column label="城市名" align="center" prop="cityName" />
      <el-table-column label="区名" align="center" prop="areaName" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:address:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:address:remove']"
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

    <!-- 添加或修改用户收货地址对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="收货人姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="收货电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入收货电话" />
        </el-form-item>
        <el-form-item label="省ID" prop="province">
          <el-input v-model="form.province" placeholder="请输入省ID" />
        </el-form-item>
        <el-form-item label="市ID" prop="city">
          <el-input v-model="form.city" placeholder="请输入市ID" />
        </el-form-item>
        <el-form-item label="区ID" prop="area">
          <el-input v-model="form.area" placeholder="请输入区ID" />
        </el-form-item>
        <el-form-item label="详细地址" prop="detailAddr">
          <el-input v-model="form.detailAddr" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="是否已删除 " prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否已删除 " />
        </el-form-item>
        <el-form-item label="是否默认收货地址" prop="defaultCargo">
          <el-input v-model="form.defaultCargo" placeholder="请输入是否默认收货地址" />
        </el-form-item>
        <el-form-item label="省名" prop="provinceName">
          <el-input v-model="form.provinceName" placeholder="请输入省名" />
        </el-form-item>
        <el-form-item label="城市名" prop="cityName">
          <el-input v-model="form.cityName" placeholder="请输入城市名" />
        </el-form-item>
        <el-form-item label="区名" prop="areaName">
          <el-input v-model="form.areaName" placeholder="请输入区名" />
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
import { listAddress, getAddress, delAddress, addAddress, updateAddress } from "@/api/shop/address";

export default {
  name: "Address",
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
      // 用户收货地址表格数据
      addressList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        userId: null,
        name: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        detailAddr: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        defaultCargo: null,
        provinceName: null,
        cityName: null,
        areaName: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" }
        ],
        name: [
          { required: true, message: "收货人姓名不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "收货电话不能为空", trigger: "blur" }
        ],
        province: [
          { required: true, message: "省ID不能为空", trigger: "blur" }
        ],
        city: [
          { required: true, message: "市ID不能为空", trigger: "blur" }
        ],
        area: [
          { required: true, message: "区ID不能为空", trigger: "blur" }
        ],
        detailAddr: [
          { required: true, message: "详细地址不能为空", trigger: "blur" }
        ],
        defaultCargo: [
          { required: true, message: "是否默认收货地址不能为空", trigger: "blur" }
        ],
        provinceName: [
          { required: true, message: "省名不能为空", trigger: "blur" }
        ],
        cityName: [
          { required: true, message: "城市名不能为空", trigger: "blur" }
        ],
        areaName: [
          { required: true, message: "区名不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户收货地址列表 */
    getList() {
      this.loading = true;
      listAddress(this.queryParams).then(response => {
        this.addressList = response.rows;
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
        name: null,
        phone: null,
        province: null,
        city: null,
        area: null,
        detailAddr: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        defaultCargo: null,
        provinceName: null,
        cityName: null,
        areaName: null
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户收货地址";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getAddress(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户收货地址";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateAddress(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addAddress(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户收货地址编号为"' + ids + '"的数据项？').then(function() {
        return delAddress(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/address/export', {
        ...this.queryParams
      }, `address_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
