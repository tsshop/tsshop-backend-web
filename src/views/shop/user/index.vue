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
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入昵称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
      <el-form-item label="" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
     
      <el-form-item label="" prop="deleted">
        <el-select
          v-model="queryParams.deleted"
          placeholder="请选择封禁状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.user_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="注册时间开始日期"
          end-placeholder="注册时间结束日期"
        ></el-date-picker>
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
          v-hasPermi="['shop:user:add']"
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
          v-hasPermi="['shop:user:edit']"
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
          v-hasPermi="['shop:user:remove']"
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
          v-hasPermi="['shop:user:export']"
          >导出</el-button
        > -->
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="userList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户ID" align="center" prop="id" width="80"/>
      <el-table-column label="昵称" align="center" prop="name" />
      <el-table-column label="头像" align="center" prop="avatarUrl" >
        <template slot-scope="scope">
          <image-preview :src="scope.row.avatarUrl" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center" prop="gender" >
         <template slot-scope="scope">
         {{scope.row.gender == 2?'女':scope.row.gender == 1?'男':'未知'}}
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center" prop="phone" />
      <!-- <el-table-column label="密码" align="center" prop="password" /> -->
      <!-- <el-table-column label="明文密码" align="center" prop="visiblePassword" /> -->
      <el-table-column
        label="封禁状态"
        align="center"
        prop="deleted"
      >
        <template slot-scope="scope">
          <dict-tag :options="dict.type.user_status" :value="scope.row.deleted" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <!-- <el-table-column label="${comment}" align="center" prop="openid" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="120">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:user:edit']"
            >修改</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:user:remove']"
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

    <!-- 添加或修改用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="1000px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="昵称" prop="name">
          <el-input v-model="form.name" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="头像" prop="avatarUrl">
          <image-upload v-model="form.avatarUrl" :limit="1"/>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <!-- <el-input v-model="form.gender" placeholder="请输入性别：0：未知 1-男，2：女" /> -->
          <el-select v-model="form.gender">
            <el-option value="0" label="未知"></el-option>
            <el-option value="1" label="男"></el-option>
            <el-option value="2" label="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <!-- <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="明文密码" prop="visiblePassword">
          <el-input v-model="form.visiblePassword" placeholder="请输入明文密码" />
        </el-form-item> -->
        <el-form-item label="封禁状态" prop="deleted">
          <el-select
            v-model="form.deleted"
            placeholder="请选择封禁状态"
          >
            <el-option
              v-for="dict in dict.type.user_status"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item> -->
        <!-- <el-form-item label="${comment}" prop="openid">
          <el-input v-model="form.openid" placeholder="请输入${comment}" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser } from "@/api/shop/user";

export default {
  name: "User",
  dicts: ["user_status"],
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
      // 用户表格数据
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // $comment时间范围
      daterangeCreateTime: [],
      // $comment时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        name: null,
        avatarUrl: null,
        gender: null,
        phone: null,
        password: null,
        visiblePassword: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        remark: null,
        openid: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [{ required: true, message: "昵称不能为空", trigger: "blur" }],
        avatarUrl: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        phone: [{ required: true, message: "手机号不能为空", trigger: "blur" }],
        deleted: [
          {
            required: true,
            message: "封禁状态不能为空",
            trigger: "change",
          },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户列表 */
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
      listUser(this.queryParams).then((response) => {
        this.userList = response.rows;
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
        avatarUrl: null,
        gender: null,
        phone: null,
        password: null,
        visiblePassword: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        remark: null,
        openid: null,
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
      this.title = "添加用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getUser(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateUser(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then((response) => {
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
        .confirm('是否确认删除用户编号为"' + ids + '"的数据项？')
        .then(function () {
          return delUser(ids);
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
        "shop/user/export",
        {
          ...this.queryParams,
        },
        `user_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
