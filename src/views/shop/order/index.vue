<template>
  <div class="app-container">
    <div class="card">
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
          placeholder="请输入订单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="orderNo">
        <el-input
          v-model="queryParams.orderNo"
          placeholder="请输入订单编号"
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
      <!-- <el-form-item label="单品ID" prop="skuId">
        <el-input
          v-model="queryParams.skuId"
          placeholder="请输入单品ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="商品ID" prop="goodsId">
        <el-input
          v-model="queryParams.goodsId"
          placeholder="请输入商品ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="收货地址ID" prop="addressId">
        <el-input
          v-model="queryParams.addressId"
          placeholder="请输入收货地址ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="总金额" prop="totalAmount">
        <el-input
          v-model="queryParams.totalAmount"
          placeholder="请输入总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="订单价格" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入订单价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="单价" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="购买数量" prop="quantity">
        <el-input
          v-model="queryParams.quantity"
          placeholder="请输入购买数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运费" prop="freight">
        <el-input
          v-model="queryParams.freight"
          placeholder="请输入运费"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->

      <!-- <el-form-item label="收货时间">
        <el-date-picker
          v-model="daterangeSendTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
      <el-form-item label="" prop="payNo">
        <el-input
          v-model="queryParams.payNo"
          placeholder="请输入支付交易号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="expressNo">
        <el-input
          v-model="queryParams.expressNo"
          placeholder="请输入物流单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="物流编码" prop="express">
        <el-input
          v-model="queryParams.express"
          placeholder="请输入物流编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="支付商家订单编号" prop="orderNoPay">
        <el-input
          v-model="queryParams.orderNoPay"
          placeholder="请输入支付商家订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="退款单号" prop="returnId">
        <el-input
          v-model="queryParams.returnId"
          placeholder="请输入退款单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="ip地址" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入ip地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="创建时间/下单时间">
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
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
      <!-- <el-form-item label="是否已删除 " prop="deleted">
        <el-input
          v-model="queryParams.deleted"
          placeholder="请输入是否已删除 "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="">
        <el-select
          v-model="queryParams.orderStatus"
          placeholder="请选择订单状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.order_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryParams.orderType" placeholder="请选择订单类型">
          <el-option label="普通订单" :value="0"></el-option>
          <el-option label="直播订单" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          v-model="daterangePayTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="下单时间开始"
          end-placeholder="下单时间结束"
        ></el-date-picker>
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
    </div>

    <!-- 显示订单数量 -->

    <div class="card flex flex-x-a flex-y-center">
      <div>
        <div class="fs-18">完成订单数</div>
        <div class="flex flex-y-center" :style="{color:settings.theme}">
          <div style="font-size:30px;font-weight:600;vertical-align: middle;margin-right:10px;">{{ orderInfo.finishOrderNum }}</div>
          <div style="font-size:14px;">(单)</div>
        </div>
      </div>
      <div>
        <div class="fs-18">累计订单金额</div>
        <div class="flex flex-y-center" :style="{color:settings.theme}">
          <div style="font-size:30px;font-weight:600;vertical-align: middle;margin-right:10px;">{{ orderInfo.orderMoney }}</div>
          <div style="font-size:14px;">(元)</div>
        </div>
      </div>
      <div>
        <div class="fs-18">退款订单</div>
        <div class="flex flex-y-center" :style="{color:settings.theme}">
          <div style="font-size:30px;font-weight:600;vertical-align: middle;margin-right:10px;">{{ orderInfo.returnOrderNum }}</div>
          <div style="font-size:14px;">(单)</div>
        </div>
      </div>
      <div>
        <div class="fs-18">累计退款金额</div>
        <div class="flex flex-y-center" :style="{color:settings.theme}">
          <div style="font-size:30px;font-weight:600;vertical-align: middle;margin-right:10px;">{{ orderInfo.returnOrderMoney }}</div>
          <div style="font-size:14px;">(元)</div>
        </div>
      </div>
    </div>
    
    <div class="card">
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            @click="handleAdd"
            v-hasPermi="['shop:order:add']"
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
            v-hasPermi="['shop:order:edit']"
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
            v-hasPermi="['shop:order:remove']"
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
            v-hasPermi="['shop:order:export']"
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
        :data="orderList"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="订单ID" align="center" prop="id" width="80" />
        <el-table-column
          label="订单编号"
          align="center"
          prop="orderNo"
          width="200"
        />
        <el-table-column label="用户ID" align="center" prop="userId" />
        <!-- <el-table-column label="单品ID" align="center" prop="skuId" /> -->
        <el-table-column label="商品ID" align="center" prop="goodsId" />
        <!-- <el-table-column label="收货地址ID" align="center" prop="addressId" /> -->
        <el-table-column label="总金额" align="center" prop="totalAmount" />
        <!-- <el-table-column label="订单价格" align="center" prop="amount" width="80" /> -->
        <!-- <el-table-column label="单价" align="center" prop="price" width="80" /> -->
        <el-table-column label="购买数量" align="center" prop="quantity" />
        <el-table-column label="运费" align="center" prop="freight" width="120" />
        <el-table-column label="状态" align="center" prop="orderStatus">
          <template slot-scope="scope">
            <dict-tag
              :options="dict.type.order_status"
              :value="scope.row.orderStatus"
            />
          </template>
        </el-table-column>
  
        <!-- <el-table-column label="收货时间" align="center" prop="sendTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.sendTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="支付交易号" align="center" prop="payNo" /> -->
        <!-- <el-table-column label="物流单号" align="center" prop="expressNo" /> -->
        <!-- <el-table-column label="物流编码" align="center" prop="express" /> -->
        <!-- <el-table-column label="支付订单编号" align="center" prop="orderNoPay" /> -->
        <!-- <el-table-column label="退款单号" align="center" prop="returnId" /> -->
        <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
        <!-- <el-table-column label="ip地址" align="center" prop="ip" /> -->
        <el-table-column
          label="创建时间/下单时间"
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
        <!-- <el-table-column label="下单时间" align="center" prop="payTime" width="180">
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.payTime, "{y}-{m}-{d} {h}:{i}:{s}") }}</span>
          </template>
        </el-table-column> -->
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
        <!-- <el-table-column label="是否已删除 " align="center" prop="deleted" /> -->
        <el-table-column label="操作" align="left" fixed="right" width="154">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="check_detail(scope.row)"
              v-hasPermi="['shop:order:edit']"
              >详情</el-button
            >
  
            <el-button
              size="mini"
              type="success"
              v-if="scope.row.orderStatus !== 0 && scope.row.orderStatus !== -1"
              @click="handleUpdate(scope.row)"
              v-hasPermi="['shop:order:edit']"
              >发货</el-button
            >
  
            <!-- <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              v-hasPermi="['shop:order:remove']"
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
    </div>
    

    <!-- 添加或修改订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="130px">
        <!-- <el-form-item label="订单编号" prop="orderNo">
          <el-input v-model="form.orderNo" placeholder="请输入订单编号" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="单品ID" prop="skuId">
          <el-input v-model="form.skuId" placeholder="请输入单品ID" />
        </el-form-item>
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="收货地址ID" prop="addressId">
          <el-input v-model="form.addressId" placeholder="请输入收货地址ID" />
        </el-form-item>
        <el-form-item label="总金额" prop="totalAmount">
          <el-input v-model="form.totalAmount" placeholder="请输入总金额" />
        </el-form-item>
        <el-form-item label="订单价格" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入订单价格" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="购买数量" prop="quantity">
          <el-input v-model="form.quantity" placeholder="请输入购买数量" />
        </el-form-item>
        <el-form-item label="运费" prop="freight">
          <el-input v-model="form.freight" placeholder="请输入运费" />
        </el-form-item>
        <el-form-item label="订单状态" prop="orderStatus">
          <el-radio-group v-model="form.orderStatus">
            <el-radio
              v-for="dict in dict.type.order_status"
              :key="dict.value"
              :label="parseInt(dict.value)"
              >{{ dict.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="支付交易号" prop="payNo">
          <el-input v-model="form.payNo" placeholder="请输入支付交易号" />
        </el-form-item> -->

        <el-form-item label="物流编码" prop="express">
          <!-- <el-input v-model="form.express" placeholder="请输入物流编码" > -->

          <!-- <el-select v-model="form.express">
            <el-option :value="item.id"></el-option>
          </el-select> -->
          <el-select v-model="form.express" filterable placeholder="请选择">
            <el-option
              v-for="item in goodsTypeList"
              :key="item.id"
              :label="item.dvyName"
              :value="item.expressBird"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" prop="expressNo">
          <el-input
            style="width: 216px"
            v-model="form.expressNo"
            placeholder="请输入物流单号"
          />
        </el-form-item>
        <!-- <el-form-item label="支付商家订单编号" prop="orderNoPay">
          <el-input v-model="form.orderNoPay" placeholder="请输入支付商家订单编号" />
        </el-form-item>
        <el-form-item label="退款单号" prop="returnId">
          <el-input v-model="form.returnId" placeholder="请输入退款单号" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item> -->
        <!-- <el-form-item label="ip地址" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入ip地址" />
        </el-form-item>
        <el-form-item label="是否已删除 " prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入是否已删除 " />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <detail ref="detail"></detail>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
} from "@/api/shop/order";
import detail from "@/components/Shop/detail";
import { mapState } from 'vuex'

export default {
  name: "Order",
  dicts: ["order_status"],
  components: {
    detail,
  },
  data() {
    return {
      orderInfo:{},
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
      // 订单表格数据
      orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否已删除 时间范围
      daterangePayTime: [],
      // 是否已删除 时间范围
      daterangeSendTime: [],
      // 是否已删除 时间范围
      daterangeCreateTime: [],
      // 是否已删除 时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        orderNo: null,
        userId: null,
        skuId: null,
        goodsId: null,
        addressId: null,
        totalAmount: null,
        amount: null,
        price: null,
        quantity: null,
        freight: null,
        orderStatus: null,
        payTime: null,
        sendTime: null,
        payNo: null,
        expressNo: null,
        express: null,
        orderNoPay: null,
        returnId: null,
        ip: null,
        createTime: null,
        updateTime: null,
        deleted: null,
        orderByColumn: "id desc",
        orderType: 0,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        orderNo: [
          { required: true, message: "订单编号不能为空", trigger: "blur" },
        ],
        userId: [
          { required: true, message: "用户ID不能为空", trigger: "blur" },
        ],
        goodsId: [
          { required: true, message: "商品ID不能为空", trigger: "blur" },
        ],
        totalAmount: [
          { required: true, message: "总金额不能为空", trigger: "blur" },
        ],
        orderStatus: [
          {
            required: true,
            message: " orderStatus不能为空",
            trigger: "change",
          },
        ],
        deleted: [
          { required: true, message: "是否已删除 不能为空", trigger: "blur" },
        ],
      },
      goodsTypeList: [],
    };
  },
  created() {
    if (this.$route.query.orderType) {
      this.queryParams.orderType = Number(this.$route.query.orderType);
    }
    if(this.$route.query.orderStatus) {
      this.queryParams.orderStatus = this.$route.query.orderStatus
    }
    this.getList();
    this.get_type();
    this.getOrderInfo()
  },
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    getOrderInfo() {
      this.request({url:'/shop/order/count'}).then(res => {
        if(res.code !== 200) return
        this.orderInfo = res.data
      })
    },
    /** 查询订单列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangePayTime && "" != this.daterangePayTime) {
        this.queryParams.params["beginPayTime"] = this.daterangePayTime[0];
        this.queryParams.params["endPayTime"] = this.daterangePayTime[1];
      }
      if (null != this.daterangeSendTime && "" != this.daterangeSendTime) {
        this.queryParams.params["beginSendTime"] = this.daterangeSendTime[0];
        this.queryParams.params["endSendTime"] = this.daterangeSendTime[1];
      }
      if (null != this.daterangeCreateTime && "" != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] =
          this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      if (null != this.daterangeUpdateTime && "" != this.daterangeUpdateTime) {
        this.queryParams.params["beginUpdateTime"] =
          this.daterangeUpdateTime[0];
        this.queryParams.params["endUpdateTime"] = this.daterangeUpdateTime[1];
      }
      listOrder(this.queryParams).then((response) => {
        this.orderList = response.rows;
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
        orderNo: null,
        userId: null,
        skuId: null,
        goodsId: null,
        addressId: null,
        totalAmount: null,
        amount: null,
        price: null,
        quantity: null,
        freight: null,
        orderStatus: null,
        payTime: null,
        sendTime: null,
        payNo: null,
        expressNo: null,
        express: null,
        orderNoPay: null,
        returnId: null,
        remark: null,
        ip: null,
        createTime: null,
        updateTime: null,
        deleted: null,
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
      this.daterangePayTime = [];
      this.daterangeSendTime = [];
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
      this.title = "添加订单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getOrder(id).then((response) => {
        this.form = response.data.order;
        this.form.orderStatus = 2;
        this.open = true;
        this.title = "发货";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            //校验物流公司和物流单号
            if (!this.form.express || !this.form.expressNo) {
              this.$message({
                message: "发货请选择物流公司和填写物流单号",
                type: "info",
              });
              return;
            }
            //
            updateOrder(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addOrder(this.form).then((response) => {
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
        .confirm('是否确认删除订单编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrder(ids);
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
        "shop/order/export",
        {
          ...this.queryParams,
        },
        `order_${new Date().getTime()}.xlsx`
      );
    },
    /** 获取物流公司分类 */
    get_type() {
      this.request({
        url: "/shop/delivery/list",
        method: "GET",
        params: {
          pageNum: 1,
          pageSize: 1000,
        },
      }).then((response) => {
        if (response.code == 200) {
          this.goodsTypeList = response.rows;
        }
      });
    },
    /** 查看详情 */
    check_detail(row) {
      this.$refs.detail.open(row);
    },
  },
};
</script>
<style lang="scss" scoped>
.app-container {
  background-color: #f3f4f6;
}
.card {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  
}
</style>
