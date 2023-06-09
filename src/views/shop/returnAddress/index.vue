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
          placeholder="请输入姓名"
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
          v-hasPermi="['shop:returnAddress:add']"
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
          v-hasPermi="['shop:returnAddress:edit']"
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
          v-hasPermi="['shop:returnAddress:remove']"
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
          v-hasPermi="['shop:returnAddress:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="returnAddressList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="left" />
      <el-table-column label="ID" align="left" prop="id" width="80" />
      <el-table-column label="姓名" align="left" prop="name" width="140" />
      <el-table-column label="电话" align="left" prop="phone" width="140" />
      <el-table-column label="省ID" align="left" prop="province" width="120" />
      <el-table-column label="市ID" align="left" prop="city" width="120" />
      <el-table-column label="区ID" align="left" prop="area" width="120" />
      <el-table-column label="详细地址" align="left" prop="detailAddr" />
      <!-- <el-table-column label="是否已删除 " align="left" prop="deleted" /> -->
      <!-- <el-table-column label="是否默认收货地址" align="left" prop="defaultCargo" /> -->
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
            v-hasPermi="['shop:returnAddress:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:returnAddress:remove']"
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

    <!-- 添加或修改用户收货地址对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>

        <el-form-item label="收货地址" prop="province">
          <el-cascader
            v-model="address_arr"
            @change="address_change"
            style="width: 300px"
            :options="menuList"
            :props="menuListTreeProps"
            node-key="areaId"
            ref="menuListTree"
            show-checkbox
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="详细地址" prop="detailAddr">
          <el-input
            v-model="form.detailAddr"
            placeholder="请输入详细地址"
            type="textarea"
            :rows="4"
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
  listReturnAddress,
  getReturnAddress,
  delReturnAddress,
  addReturnAddress,
  updateReturnAddress,
} from "@/api/shop/returnAddress";

export default {
  name: "ReturnAddress",
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
      returnAddressList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否默认收货地址时间范围
      daterangeCreateTime: [],
      // 是否默认收货地址时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
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
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "收货人姓名不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "收货电话不能为空", trigger: "blur" }],
        province: [{ required: true, message: "收货不能为空", trigger: "blur" }],
        city: [{ required: true, message: "收货不能为空", trigger: "blur" }],
        area: [{ required: true, message: "收货不能为空", trigger: "blur" }],
        detailAddr: [{ required: true, message: "详细地址不能为空", trigger: "blur" }],
        // createTime: [{ required: true, message: "创建时间不能为空", trigger: "blur" }],
        // defaultCargo: [
        //   { required: true, message: "是否默认收货地址不能为空", trigger: "blur" },
        // ],
      },
      address_arr: [0, 0, 0],
      menuList: [],
      menuListTreeProps: {
        label: "areaName",
        children: "children",
        multiple: false,
        value: "areaId",
      },
    };
  },
  created() {
    this.getList();
    this.get_menuList();
  },
  methods: {
    get_menuList() {
      this.request({
        url: "/shop/area/list",
        method: "get",
        params: {
          pageNum: 1,
          pageSize: 10000000,
        },
      })
        .then((res) => {
          this.menuList = this.handleTree(res.rows, "areaId", "parentId");
          // localStorage.setItem('menuList', this.menuList);
        })
        .then(() => {
          // this.visible = true
          // this.disabledNodes(cityList, allSelectCityList)
          // this.$nextTick(() => {
          //   this.$refs['dataForm'].resetFields()
          //   this.$refs.menuListTree.setCheckedNodes(cityList)
          // })
        });
    },
    address_change(e) {
      console.log("e", e);
      if (e && e.length == 3) {
        this.form.province = e[0];
        this.form.city = e[1];
        this.form.area = e[2];
      }
    },
    /** 查询用户收货地址列表 */
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
      listReturnAddress(this.queryParams).then((response) => {
        this.returnAddressList = response.rows;
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
        phone: null,
        province: null,
        city: null,
        area: null,
        detailAddr: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        defaultCargo: null,
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
      this.title = "添加用户收货地址";
      this.$nextTick(() => {
        // this.address_arr = [
        //   form.province,
        //   form.city,
        //   form.area
        // ];
        this.address_arr = null;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getReturnAddress(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户收货地址";
        setTimeout(() => {
          this.$nextTick(() => {
            this.address_arr = [this.form.province, this.form.city, this.form.area];
            // this.address_arr = null;
          });
        }, 300);
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateReturnAddress(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReturnAddress(this.form).then((response) => {
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
        .confirm('是否确认删除用户收货地址编号为"' + ids + '"的数据项？')
        .then(function () {
          return delReturnAddress(ids);
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
        "shop/returnAddress/export",
        {
          ...this.queryParams,
        },
        `returnAddress_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
