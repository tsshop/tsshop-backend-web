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
          placeholder="请输入支付通道"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="接口id" prop="interfaceId">
        <el-input
          v-model="queryParams.interfaceId"
          placeholder="请输入接口id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="interfaceName">
        <el-input
          v-model="queryParams.interfaceName"
          placeholder="请输入接口支付通道"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="payProvider">
        <el-input
          v-model="queryParams.payProvider"
          placeholder="请输入支付提供方"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="支持的方式" prop="payTypes">
        <el-input
          v-model="queryParams.payTypes"
          placeholder="请输入支持的方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="isUse">
        <el-select
          clearable
          v-model="queryParams.isUse"
          placeholder="请选择启用状态"
        >
          <el-option :value="false" label="未启用"></el-option>
          <el-option :value="true" label="已启用"></el-option>
        </el-select>
      </el-form-item>
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
          v-hasPermi="['pay:thoroughfare:add']"
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
          v-hasPermi="['pay:thoroughfare:edit']"
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
          v-hasPermi="['pay:thoroughfare:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['pay:thoroughfare:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="thoroughfareList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="支付通道" align="center" prop="name" />
      <!-- <el-table-column label="接口id" align="center" prop="interfaceId" />
      <el-table-column label="接口支付通道" align="center" prop="interfaceName" />
      <el-table-column label="支付提供方" align="center" prop="payProvider" /> -->
      <!-- <el-table-column label="配置" align="center" prop="config" show-overflow-tooltip/> -->
      <!-- <el-table-column label="支持的方式" align="center" prop="payTypes" /> -->
      <el-table-column label="是否启用" align="center" prop="isUse">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.isUse == 0 ? 'info' : 'success'">{{
            scope.row.isUse == 0 ? "未启用" : "已启用"
          }}</el-tag> -->
          <div class="" style="display:flex;justify-content: center;align-items: center;">
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
      <el-table-column label="支持提现" align="center" prop="isUse">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.isUse == 0 ? 'info' : 'success'">{{
            scope.row.isUse == 0 ? "未启用" : "已启用"
          }}</el-tag> -->
          <div class="" style="display:flex;justify-content: center;align-items: center;">
            <span style="margin-right: 6px">{{
              scope.row.isUse ? "已支持" : "不支持"
            }}</span>
            <el-switch
              @change="changeWithdrawalsClose(scope.row, 'supportWithdrawals')"
              size="mini"
              v-model="scope.row.supportWithdrawals"
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
            v-hasPermi="['pay:thoroughfare:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['pay:thoroughfare:remove']"
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

    <!-- 添加或修改支付通道对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="1200px"
      append-to-body
      class="from-dialog-p"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="200px">
        <el-form-item label="支付通道" prop="name">
          <el-input
            v-model="form.name"
            placeholder="请输入支付通道"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="支付接口" prop="interfaceId">
          <!-- <el-input v-model="form.interfaceId" placeholder="请输入接口id" /> -->
          <el-select
            v-if="!form.id"
            @change="changeInsterFace"
            v-model="form.interfaceId"
            placeholder="请选择支付接口"
          >
            <el-option
              v-for="(item, index) in interFaceList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
          <div v-else class="shou">
            {{
              form.payInterface && form.payInterface.name
                ? form.payInterface.name
                : ""
            }}
          </div>
        </el-form-item>
        <el-form-item label="是否启用" prop="isUse">
          <el-radio-group v-model="form.isUse" :disabled="form.id != null">
            <el-radio :label="false">未启用</el-radio>
            <el-radio :label="true">已启用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否支持提现" prop="supportWithdrawals">
          <el-radio-group v-model="form.supportWithdrawals" :disabled="form.id != null">
            <el-radio :label="false">不支持</el-radio>
            <el-radio :label="true">支持</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<el-form-item label="接口支付通道" prop="interfaceName">
          <el-input v-model="form.interfaceName" placeholder="请输入接口支付通道" />
        </el-form-item>
        <el-form-item label="支付提供方" prop="payProvider">
          <el-input v-model="form.payProvider" placeholder="请输入支付提供方" />
        </el-form-item> -->
        <el-form-item
          label="支持的方式"
          prop=""
          v-if="getPayTypes && getPayTypes.length > 0"
        >
          <!-- <el-input v-model="form.payTypes" placeholder="请输入支持的方式" /> -->
          <el-checkbox-group
            v-model="form.payTypes1"
            :disabled="form.id && form.isUse"
          >
            <el-checkbox
              v-for="(item, index) in getPayTypes"
              :key="index"
              :label="item.type"
              >{{ item.typeName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="" prop="" style="margin-top: 30px">
          <!-- <el-input
            v-model="form.config"
            type="textarea"
            placeholder="请输入内容"
          /> -->
          <div style="width: 500px; margin-left: -200px">
            <InitForm
              :disabled="form.id && form.isUse"
              v-if="open"
              ref="InitForm"
              :parseStr="parseStr"
              :oldForm="oldForm"
            ></InitForm>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="submitFormBefore"
          :disabled="form.id && form.isUse"
          >确 定</el-button
        >
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listThoroughfare,
  getThoroughfare,
  delThoroughfare,
  addThoroughfare,
  updateThoroughfare,
  closeThoroughfare,
  closeWithdrawals
} from "@/api/pay/thoroughfare";

import InitForm from "@/components/InitForm/index";

export default {
  name: "Thoroughfare",
  components: {
    InitForm,
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
      // 支付通道表格数据
      thoroughfareList: [],
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
        interfaceId: null,
        interfaceName: null,
        payProvider: null,
        config: null,
        payTypes: null,
        isUse: null,
      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "支付通道不能为空", trigger: "blur" },
        ],
        interfaceId: [
          { required: true, message: "接口id不能为空", trigger: "blur" },
        ],
        // interfaceName: [
        //   { required: true, message: "接口支付通道不能为空", trigger: "blur" },
        // ],
        // payProvider: [
        //   { required: true, message: "支付提供方不能为空", trigger: "blur" },
        // ],
        config: [{ required: true, message: "配置不能为空", trigger: "blur" }],
        // payTypes: [
        //   { required: true, message: "支持的方式不能为空", trigger: "blur" },
        // ],
        isUse: [
          { required: true, message: "是否启用不能为空", trigger: "blur" },
        ],
        supportWithdrawals: [
          { required: true, message: "是否支持提现不能为空", trigger: "blur" },
        ],
      },
      interFaceList: [], //支付接口
      payList: [], //支付方式
      oldForm: {},
    };
  },
  computed: {
    parseStr() {
      if (this.form && this.form.id) {
        return this.form.payInterface.configTemplate;
      }
      if (this.form && this.form.interfaceId) {
        let arr = this.interFaceList.filter(
          (val) => val.id == this.form.interfaceId
        );
        if (arr.length == 1) {
          return arr[0].configTemplate;
        }
        return "[]";
      }
      return "[]";
    },
    getPayTypes() {
      let arr = this.interFaceList.filter(
        (val) => val.id == this.form.interfaceId
      );
      if (this.form.interfaceId && arr.length == 1) {
        if (arr[0].payTypes) {
          let payTypes = JSON.parse(arr[0].payTypes);
          return this.payList.filter((val) => payTypes.indexOf(val.type) > -1);
        }
        return [];
      }
      return [];
    },
  },
  created() {
    this.getList();
    this.getOtherInfo();
  },
  methods: {
    changeWithdrawalsClose(row, key) {
      closeWithdrawals({
        id: row.id,
        supportWithdrawals: row.supportWithdrawals,
      }).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "操作成功",
            type: "success",
          });
        } else {
          row.supportWithdrawals = !row.supportWithdrawals;
        }
      });
    },
    changeInsterFace(e) {
      if (e) {
        let inter = this.interFaceList.filter((val) => val.id == e);
        this.oldForm = {};
        this.form.payTypes = "[]";
        this.form.payTypes1 = [];
        this.form.config = "[]";
        this.form.interfaceName = inter[0].name;
        this.form.payProvider = inter[0].payProvider;
      }
    },
    getOtherInfo() {
      //支付接口
      this.request({
        url: "/pay/interface/list?pageNum=1&pageSize=100&isUse=true",
      }).then((res) => {
        if (res.code != 200) return;
        this.interFaceList = res.rows;
      });

      this.request({
        url: `pay/type/list?pageNum=1&pageSize=100`,
      }).then((res) => {
        if (res.code != 200) return;
        this.payList = res.rows;
      });
    },
    /** 查询支付通道列表 */
    getList() {
      this.loading = true;
      listThoroughfare(this.queryParams).then((response) => {
        this.thoroughfareList = response.rows;
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
        interfaceId: null,
        interfaceName: null,
        payProvider: null,
        config: null,
        payTypes: null,
        payTypes1: [],
        isUse: true,
        supportWithdrawals: false,
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
      this.oldForm = {};
      this.open = true;
      this.title = "添加支付通道";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getThoroughfare(id).then((response) => {
        try {
          response.data.payTypes1 = JSON.parse(response.data.payTypes);
          if (response.data.config) {
            this.oldForm = JSON.parse(response.data.config);
          }
        } catch (e) {
          response.data.payTypes1 = [];
        }
        this.form = response.data;
        this.open = true;
        this.title = "修改支付通道";
      });
    },
    /** 提交按钮 */
    submitFormBefore() {
      this.$refs.InitForm.$refs.form.validate((val) => {
        if (val) {
          //保存
          this.form.config = JSON.stringify(this.$refs.InitForm.form);
          this.submitForm();
        }
      });
    },
    submitForm() {
      // this.form.configTemplate = JSON.stringify(this.$refs.FormEdit.list);
      this.form.payTypes = JSON.stringify(this.form.payTypes1);
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateThoroughfare(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addThoroughfare(this.form).then((response) => {
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
        .confirm('是否确认删除支付通道编号为"' + ids + '"的数据项？')
        .then(function () {
          return delThoroughfare(ids);
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
        "pay/thoroughfare/export",
        {
          ...this.queryParams,
        },
        `thoroughfare_${new Date().getTime()}.xlsx`
      );
    },
    // 开启关闭
    changeClose(row, key) {
      closeThoroughfare({
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
<style >
.from-dialog-p .el-dialog__body {
  padding-left: 40px !important;
}
</style>
