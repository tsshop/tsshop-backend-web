<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
      class="qq-query"
    >
      <el-form-item label="" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="liveStoreId">
        <el-input
          v-model="queryParams.liveStoreId"
          placeholder="请输入店铺id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入直播人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="roomId">
        <el-input
          v-model="queryParams.roomId"
          placeholder="请输入房间号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="roomId">
        <el-select
          v-model="queryParams.status"
          clearable
          placeholder="直播状态"
        >
          <el-option label="未开始" :value="1"></el-option>
          <el-option label="直播中" :value="2"></el-option>
          <el-option label="已结束" :value="3"></el-option>
          <el-option label="异常结束" :value="4"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="" prop="roomId">
        <el-select
          v-model="queryParams.isCash"
          clearable
          placeholder="结算状态"
        >
          <el-option label="未结算" :value="0"></el-option>
          <el-option label="已结算" :value="1"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="预计开始时间" prop="reckonTime">
        <el-date-picker clearable
          v-model="queryParams.reckonTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择预计开始时间">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="开始时间" prop="startTime">
        <el-date-picker clearable
          v-model="queryParams.startTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择开始时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间" prop="endTime">
        <el-date-picker clearable
          v-model="queryParams.endTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="连麦数" prop="linkNum">
        <el-input
          v-model="queryParams.linkNum"
          placeholder="请输入连麦数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品数量" prop="goodsNum">
        <el-input
          v-model="queryParams.goodsNum"
          placeholder="请输入商品数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="观看人数" prop="personNum">
        <el-input
          v-model="queryParams.personNum"
          placeholder="请输入观看人数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="点赞数" prop="praiseNum">
        <el-input
          v-model="queryParams.praiseNum"
          placeholder="请输入点赞数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单收益" prop="orderProfit">
        <el-input
          v-model="queryParams.orderProfit"
          placeholder="请输入订单收益"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="礼物收益" prop="giftProfit">
        <el-input
          v-model="queryParams.giftProfit"
          placeholder="请输入礼物收益"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="礼物数" prop="giftNum">
        <el-input
          v-model="queryParams.giftNum"
          placeholder="请输入礼物数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否结算" prop="isCash">
        <el-input
          v-model="queryParams.isCash"
          placeholder="请输入是否结算"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="直播标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入直播标题"
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
      <el-form-item label="更新时间">
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
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['shop:broadcast:add']"
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
          v-hasPermi="['shop:broadcast:edit']"
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
          v-hasPermi="['shop:broadcast:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:broadcast:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="broadcastList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="left" prop="id" width="80" />
      <el-table-column label="直播标题" align="left" prop="title" />
      <el-table-column label="封面" align="left" prop="url" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.url" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="描述" align="left" prop="describes" />
      <el-table-column
        label="店铺id"
        align="left"
        prop="liveStoreId"
        width="80"
      />
      <el-table-column label="直播人id" align="left" prop="userId" width="80" />
      <el-table-column label="房间号" align="left" prop="roomId" width="80" />

      <el-table-column label="状态" align="left" prop="status" width="120">
        <template slot-scope="scope">
          <span>
            {{
              ["", "未开始", "直播中", "已结束", "异常结束"][scope.row.status]
            }}
          </span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="连麦数" align="left" prop="linkNum" /> -->
      <el-table-column
        label="商品数量"
        align="left"
        prop="goodsNum"
        width="80"
      />
      <el-table-column
        label="观看人数"
        align="left"
        prop="personNum"
        width="90"
      />
      <el-table-column
        label="点赞数"
        align="left"
        prop="praiseNum"
        width="90"
      />
      <el-table-column
        label="订单收益"
        align="left"
        prop="orderProfit"
        width="90"
      />
      <el-table-column
        label="礼物收益"
        align="left"
        prop="giftProfit"
        width="90"
      />
      <el-table-column label="礼物数" align="left" prop="giftNum" width="90" />
      <el-table-column label="是否结算" align="left" prop="isCash" width="90">
        <template slot-scope="scope">
          <span>
            {{ scope.row.isCash == 1 ? "已结算" : "未结算" }}
          </span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, '{y}-{m}-{d} {h}:{i}:{s}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column
        label="预计开始时间"
        align="center"
        prop="reckonTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.reckonTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="开始时间"
        align="center"
        prop="startTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.startTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="结束时间"
        align="center"
        prop="endTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.endTime, "{y}-{m}-{d} {h}:{i}:{s}")
          }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:broadcast:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:broadcast:remove']"
          >删除</el-button>
        </template>
      </el-table-column> -->
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改直播记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="店铺id" prop="liveStoreId">
          <el-input v-model="form.liveStoreId" placeholder="请输入店铺id" />
        </el-form-item>
        <el-form-item label="直播人id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入直播人id" />
        </el-form-item>
        <el-form-item label="房间号" prop="roomId">
          <el-input v-model="form.roomId" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item label="预计开始时间" prop="reckonTime">
          <el-date-picker
            clearable
            v-model="form.reckonTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择预计开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-date-picker
            clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-date-picker
            clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="连麦数" prop="linkNum">
          <el-input v-model="form.linkNum" placeholder="请输入连麦数" />
        </el-form-item>
        <el-form-item label="商品数量" prop="goodsNum">
          <el-input v-model="form.goodsNum" placeholder="请输入商品数量" />
        </el-form-item>
        <el-form-item label="观看人数" prop="personNum">
          <el-input v-model="form.personNum" placeholder="请输入观看人数" />
        </el-form-item>
        <el-form-item label="点赞数" prop="praiseNum">
          <el-input v-model="form.praiseNum" placeholder="请输入点赞数" />
        </el-form-item>
        <el-form-item label="订单收益" prop="orderProfit">
          <el-input v-model="form.orderProfit" placeholder="请输入订单收益" />
        </el-form-item>
        <el-form-item label="礼物收益" prop="giftProfit">
          <el-input v-model="form.giftProfit" placeholder="请输入礼物收益" />
        </el-form-item>
        <el-form-item label="礼物数" prop="giftNum">
          <el-input v-model="form.giftNum" placeholder="请输入礼物数" />
        </el-form-item>
        <el-form-item label="是否结算" prop="isCash">
          <el-input v-model="form.isCash" placeholder="请输入是否结算" />
        </el-form-item>
        <el-form-item label="直播标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入直播标题" />
        </el-form-item>
        <el-form-item label="封面" prop="url">
          <image-upload v-model="form.url" />
        </el-form-item>
        <el-form-item label="描述" prop="describes">
          <el-input
            v-model="form.describes"
            type="textarea"
            placeholder="请输入内容"
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
  listBroadcast,
  getBroadcast,
  delBroadcast,
  addBroadcast,
  updateBroadcast,
} from "@/api/shop/broadcast";

export default {
  name: "Broadcast",
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
      // 直播记录表格数据
      broadcastList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 描述时间范围
      daterangeCreateTime: [],
      // 描述时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        liveStoreId: null,
        userId: null,
        roomId: null,
        reckonTime: null,
        startTime: null,
        endTime: null,
        status: null,
        linkNum: null,
        goodsNum: null,
        personNum: null,
        praiseNum: null,
        orderProfit: null,
        giftProfit: null,
        giftNum: null,
        isCash: null,
        title: null,
        url: null,
        describes: null,
        createTime: null,
        updateTime: null,
        orderByColumn: "id desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询直播记录列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
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
      listBroadcast(this.queryParams).then((response) => {
        this.broadcastList = response.rows;
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
        liveStoreId: null,
        userId: null,
        roomId: null,
        reckonTime: null,
        startTime: null,
        endTime: null,
        status: null,
        linkNum: null,
        goodsNum: null,
        personNum: null,
        praiseNum: null,
        orderProfit: null,
        giftProfit: null,
        giftNum: null,
        isCash: null,
        title: null,
        url: null,
        describes: null,
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
      this.title = "添加直播记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getBroadcast(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改直播记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateBroadcast(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addBroadcast(this.form).then((response) => {
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
        .confirm('是否确认删除直播记录编号为"' + ids + '"的数据项？')
        .then(function () {
          return delBroadcast(ids);
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
        "shop/broadcast/export",
        {
          ...this.queryParams,
        },
        `broadcast_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
