<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="100px"
    >
      <el-form-item label="" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入直播小店id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用戶id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="storeName">
        <el-input
          v-model="queryParams.storeName"
          placeholder="请输入店铺名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="storePhone">
        <el-input
          v-model="queryParams.storePhone"
          placeholder="请输入联系电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="">
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

    <el-table v-loading="loading" :data="storeList">
    
      <el-table-column label="店铺名称" align="center" prop="storeName" />
      <el-table-column label="店铺logo" align="center" prop="storeHeadPortrait">
        <template slot-scope="scope">
          <image-preview
            :src="scope.row.storeHeadPortrait"
            :width="50"
            :height="50"
          />
        </template>
      </el-table-column>
        <el-table-column label="直播小店id" align="center" prop="id" />
      <el-table-column label="用戶id" align="center" prop="userId" />
      <el-table-column label="联系电话" align="center" prop="storePhone" />
      
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
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
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:store:edit']"
            >查看详情</el-button
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

    <!-- 添加或修改直播小店对话框 -->
    <el-dialog
      :title="title"
      size="mini"
      :visible.sync="open"
      width="50%"
      append-to-body
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="180px">
        <el-form-item label="店铺logo" prop="storeHeadPortrait">
          <el-image
            :src="form.storeHeadPortrait"
            style="
              width: 80px;
              height: 80px;
              border-radius: 50%;
              margin-top: -20px;
            "
            :preview-src-list="[form.storeHeadPortrait]"
          ></el-image>
        </el-form-item>

        <div style="display: flex">
          <el-form-item label="店铺名称" prop="storeName">
            <el-input
              v-model="form.storeName"
              disabled
              placeholder="请输入店铺名称"
            />
          </el-form-item>

          <el-form-item label="联系电话" prop="storePhone">
            <el-input
              v-model="form.storePhone"
              disabled
              placeholder="请输入联系电话"
            />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="用戶id" prop="userId">
            <el-input
              v-model="form.userId"
              disabled
              placeholder="请输入用戶id"
            />
          </el-form-item>
          <el-form-item label="申请类型" prop="liveStoreType">
            <el-input
              disabled
              v-model="['个人', '商户'][form.liveStoreType]"
              placeholder="请输入用戶id"
            />
          </el-form-item>
        </div>
        <div style="display: flex">
          <el-form-item label="负责人/经营者姓名" prop="userId">
            <el-input
              v-model="form.managerName"
              disabled
              placeholder="请输入用戶id"
            />
          </el-form-item>
          <el-form-item label="负责人/经营者身份证号" prop="userId">
            <el-input
              v-model="form.managerIdCard"
              disabled
              placeholder="请输入身份证号"
            />
          </el-form-item>
        </div>

        <el-form-item label="身份证正反面照片" prop="userId">
          <div style="display: flex">
            <el-image
              :src="form.idCardObverse"
              :preview-src-list="[form.idCardObverse]"
              style="
                width: 180px;
                height: 100px;
                border-radius: 10px;
                margin-right: 10px;
              "
            ></el-image>
            <el-image
              :src="form.idCardReverse"
              :preview-src-list="[form.idCardReverse]"
              style="width: 180px; height: 100px; border-radius: 10px"
            ></el-image>
          </div>
        </el-form-item>
        <div v-if="form.liveStoreType === 1">
          <el-form-item label="企业营业执照" prop="userId">
            <el-image
              :src="form.businessLicense"
              :preview-src-list="[form.businessLicense]"
              style="width: 180px; height: 100px; border-radius: 10px"
            ></el-image>
          </el-form-item>
          <div style="display: flex">
            <el-form-item label="企业名称" prop="userId">
              <el-input
                v-model="form.enterpriseName"
                disabled
                placeholder="请输入用戶id"
              />
            </el-form-item>
            <el-form-item label="统一社会信用代码" prop="userId">
              <el-input
                v-model="form.enterpriseCreditCode"
                disabled
                placeholder="请输入用戶id"
              />
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div
        style="
          font-size: 18px;
          font-weight: blod;
          margin-top: 10px;
          margin-bottom: 10px;
        "
      >
        店铺商品
      </div>
      <el-table v-loading="loading" :data="goodsList" size="mini" height="414">
        <el-table-column label="商品id" align="center" prop="id" />
        <el-table-column label="商品图片" align="center" prop="headPortrait">
          <template slot-scope="scope">
            <image-preview
              :src="scope.row.headPortrait"
              :width="50"
              :height="50"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="商品名称"
          show-overflow-tooltip=""
          align="center"
          prop="name"
        />
        <el-table-column label="商品原价" align="center" prop="scribingPrice" />
        <el-table-column label="商品售价" align="center" prop="price" />
        <!-- <el-table-column label="库存" align="center" prop="storeHeadPortrait" /> -->
        <el-table-column label="订单量" align="center" prop="orderNum" />
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
          width="180"
        >
          <template slot-scope="scope">
            <span>{{ parseTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <pagination
        v-show="goodsTotal > 0"
        :total="goodsTotal"
        :page.sync="goodsParams.pageNum"
        :limit.sync="goodsParams.pageSize"
        @pagination="getStoreGoodsList"
      />
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
import {
  listStore,
  getStore,
  delStore,
  addStore,
  updateStore,
  getStoreGoods,
} from "../../../api/liveStore/store";

export default {
  name: "Store",
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
      // 直播小店表格数据
      storeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // $comment时间范围
      daterangeCreateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        id: null,
        userId: null,
        storeName: null,
        storePhone: null,
        createTime: null,
        orderByColumn: "id desc",
      },
      goodsList: [],
      goodsParams: {
        pageNum: 1,
        pageSize: 10,
      },
      goodsTotal: 0,
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        amt: [{ required: true, message: "$comment不能为空", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询直播小店列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeCreateTime && "" != this.daterangeCreateTime) {
        this.queryParams.params["beginCreateTime"] =
          this.daterangeCreateTime[0];
        this.queryParams.params["endCreateTime"] = this.daterangeCreateTime[1];
      }
      listStore(this.queryParams).then((response) => {
        this.storeList = response.rows;
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
        storeName: null,
        storePhone: null,
        storeHeadPortrait: null,
        amt: null,
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
      this.daterangeCreateTime = [];
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
      this.title = "添加直播小店";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getStore({ liveStoreId: id }).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改直播小店";
      });
      this.getStoreGoodsList(id);
    },

    async getStoreGoodsList(id) {
      let query = {
        liveStoreId: id,
        pageNumber: this.goodsParams.pageNum,
        pageSize: this.goodsParams.pageSize,
        keyword: "",
      };
      let { data } = await getStoreGoods(query);

      this.goodsList = data.list;
      this.goodsTotal = data.total;
    },

    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateStore(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStore(this.form).then((response) => {
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
        .confirm('是否确认删除直播小店编号为"' + ids + '"的数据项？')
        .then(function () {
          return delStore(ids);
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
        "system/store/export",
        {
          ...this.queryParams,
        },
        `store_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
