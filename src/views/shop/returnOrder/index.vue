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
          placeholder="请输入ID"
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
      <el-form-item label="" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="outRefundNo">
        <el-input
          v-model="queryParams.outRefundNo"
          placeholder="请输入退款单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="真实退款金额" prop="reallyAmt">
        <el-input
          v-model="queryParams.reallyAmt"
          placeholder="请输入真实退款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单退款金额" prop="orderAmt">
        <el-input
          v-model="queryParams.orderAmt"
          placeholder="请输入订单退款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请退款金额" prop="returnAmt">
        <el-input
          v-model="queryParams.returnAmt"
          placeholder="请输入申请退款金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="" prop="returnType">
        <el-select
          v-model="queryParams.returnType"
          placeholder="请选择退款类型"
          clearable
        >
          <el-option
            v-for="dict in dict.type.return_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="申请退款文字描述" prop="returnDetail">
        <el-input
          v-model="queryParams.returnDetail"
          placeholder="请输入申请退款文字描述"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="退货地址" prop="addressId">
        <el-input
          v-model="queryParams.addressId"
          placeholder="请输入退货地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="1:发起退货" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择1:发起退货" clearable>
          <el-option
            v-for="dict in dict.type.return_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="物流名字" prop="expressName">
        <el-input
          v-model="queryParams.expressName"
          placeholder="请输入物流名字"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物流单号" prop="expressNo">
        <el-input
          v-model="queryParams.expressNo"
          placeholder="请输入物流单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="物流编码" prop="express">
        <el-input
          v-model="queryParams.express"
          placeholder="请输入物流编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
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

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['shop:returnOrder:add']"
          >新增</el-button
        >
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['shop:returnOrder:edit']"
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
          v-hasPermi="['shop:returnOrder:remove']"
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
          v-hasPermi="['shop:returnOrder:export']"
          >导出</el-button
        >
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="returnOrderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="left" />
      <el-table-column label="id" align="left" prop="id" width="80" />
      <el-table-column label="用户id" align="left" prop="userId" width="80" />
      <el-table-column label="订单号" align="left" prop="orderNo" width="180" />
      <el-table-column label="退单号" align="left" prop="outRefundNo" width="180" />
      <el-table-column label="已退金额" align="left" prop="reallyAmt" width="80" />
      <el-table-column label="订单金额" align="left" prop="orderAmt" width="80" />
      <el-table-column label="退款金额" align="left" prop="returnAmt" width="80" />
      <el-table-column label="退款理由" align="left" prop="returnReason" width="150" />
      <el-table-column label="图片描述" align="left" prop="returnImg" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.returnImg" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="退款类型" align="left" prop="returnType" width="140">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.return_type" :value="scope.row.returnType" />
        </template>
      </el-table-column>
      <el-table-column label="退款描述" align="left" prop="returnDetail" />
      <!-- <el-table-column label="退货地址" align="left" prop="addressId" /> -->
      <el-table-column label="退款进度" align="left" prop="status" width="130">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.return_status" :value="scope.row.status" />
        </template>
      </el-table-column>
      <!-- <el-table-column label="物流名字" align="left" prop="expressName" /> -->
      <!-- <el-table-column label="物流单号" align="left" prop="expressNo" /> -->
      <!-- <el-table-column label="物流编码" align="left" prop="express" /> -->
      <el-table-column label="创建时间" align="left" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="left" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拒绝理由" align="left" prop="refuseDetail" />
      <el-table-column label="操作" align="left" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="show_detail(scope.row)"
            v-hasPermi="['shop:returnOrder:edit']"
            >详情</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="show_detail(scope.row)"
            v-hasPermi="['shop:returnOrder:edit']"
            >处理</el-button
          >
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:returnOrder:remove']"
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

    <!-- 添加或修改退款对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="订单号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单号" />
        </el-form-item>
        <el-form-item label="真实退款金额" prop="reallyAmt">
          <el-input v-model="form.reallyAmt" placeholder="请输入真实退款金额" />
        </el-form-item>
        <el-form-item label="订单退款金额" prop="orderAmt">
          <el-input v-model="form.orderAmt" placeholder="请输入订单退款金额" />
        </el-form-item>
        <el-form-item label="申请退款金额" prop="returnAmt">
          <el-input v-model="form.returnAmt" placeholder="请输入申请退款金额" />
        </el-form-item>
        <el-form-item label="申请退款理由" prop="returnReason">
          <el-input
            v-model="form.returnReason"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="申请退款图片" prop="returnImg">
          <image-upload v-model="form.returnImg" />
        </el-form-item>
        <el-form-item label="申请退款类型 1：仅退款" prop="returnType">
          <el-select v-model="form.returnType" placeholder="请选择申请退款类型 1：仅退款">
            <el-option
              v-for="dict in dict.type.return_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请退款文字描述" prop="returnDetail">
          <el-input v-model="form.returnDetail" placeholder="请输入申请退款文字描述" />
        </el-form-item>
        <el-form-item label="退货地址" prop="addressId">
          <el-input v-model="form.addressId" placeholder="请输入退货地址" />
        </el-form-item>
        <el-form-item label="1:发起退货" prop="status">
          <el-select v-model="form.status" placeholder="请选择1:发起退货">
            <el-option
              v-for="dict in dict.type.return_status"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物流名字" prop="expressName">
          <el-input v-model="form.expressName" placeholder="请输入物流名字" />
        </el-form-item>
        <el-form-item label="物流单号" prop="expressNo">
          <el-input v-model="form.expressNo" placeholder="请输入物流单号" />
        </el-form-item>
        <el-form-item label="物流编码" prop="express">
          <el-input v-model="form.express" placeholder="请输入物流编码" />
        </el-form-item>
        <el-form-item label="拒绝理由" prop="refuseDetail">
          <el-input
            v-model="form.refuseDetail"
            type="textarea"
            placeholder="请输入内容"
          />
        </el-form-item>
        <el-form-item label="退单号" prop="outRefundNo">
          <el-input v-model="form.outRefundNo" placeholder="请输入退单号" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <refund @change="getList" ref="refund"></refund>
  </div>
</template>

<script>
import {
  listReturnOrder,
  getReturnOrder,
  delReturnOrder,
  addReturnOrder,
  updateReturnOrder,
} from "@/api/shop/returnOrder";
import refund from "@/components/refund/refund";

export default {
  name: "ReturnOrder",
  dicts: ["return_type", "return_status"],
  components: {
    refund,
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
      // 退款表格数据
      returnOrderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 退单号时间范围
      daterangeCreateTime: [],
      // 退单号时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        userId: null,
        orderNo: null,
        reallyAmt: null,
        orderAmt: null,
        returnAmt: null,
        returnReason: null,
        returnImg: null,
        returnType: null,
        returnDetail: null,
        addressId: null,
        status: null,
        expressName: null,
        expressNo: null,
        express: null,
        createTime: null,
        updateTime: null,
        refuseDetail: null,
        outRefundNo: null,
        orderByColumn: "id desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        returnType: [
          {
            required: true,
            message: "申请退款类型 1：仅退款不能为空",
            trigger: "change",
          },
        ],
        status: [{ required: true, message: "1:发起退货不能为空", trigger: "change" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询退款列表 */
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
      listReturnOrder(this.queryParams).then((response) => {
        this.returnOrderList = response.rows;
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
        orderNo: null,
        reallyAmt: null,
        orderAmt: null,
        returnAmt: null,
        returnReason: null,
        returnImg: null,
        returnType: null,
        returnDetail: null,
        addressId: null,
        status: null,
        expressName: null,
        expressNo: null,
        express: null,
        createTime: null,
        updateTime: null,
        refuseDetail: null,
        outRefundNo: null,
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
      this.title = "添加退款";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getReturnOrder(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改退款";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateReturnOrder(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addReturnOrder(this.form).then((response) => {
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
        .confirm('是否确认删除退款编号为"' + ids + '"的数据项？')
        .then(function () {
          return delReturnOrder(ids);
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
        "shop/returnOrder/export",
        {
          ...this.queryParams,
        },
        `returnOrder_${new Date().getTime()}.xlsx`
      );
    },
    /** 处理 */
    show_detail(row) {
      this.$refs.refund.open(row);
    },
  },
};
</script>
