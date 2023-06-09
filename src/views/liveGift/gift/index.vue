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
      <el-form-item label="" prop="giftName">
        <el-input
          v-model="queryParams.giftName"
          placeholder="请输入礼物名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="" prop="shelves">
        <el-select v-model="queryParams.shelves" placeholder="请选择状态">
          <el-option label="全部" :value="null"></el-option>
          <el-option label="上架" :value="0"></el-option>
          <el-option label="下架" :value="1"></el-option>
        </el-select>
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
          v-hasPermi="['liveGift:gift:add']"
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
          v-hasPermi="['liveGift:gift:edit']"
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
          v-hasPermi="['liveGift:gift:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['liveGift:gift:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="giftList">
      <el-table-column label="礼物id" align="center" prop="id" />
      <el-table-column label="礼物封面" align="center" prop="front" width="100">
        <template slot-scope="scope">
          <image-preview :src="scope.row.front" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="礼物名称" align="center" prop="giftName" />
      <el-table-column label="礼物金额（元）" align="center" prop="unitPrice" />
      <el-table-column label="礼物收益率" align="center" prop="giftRate" :formatter="getValue"/>
      <el-table-column label="礼物状态" align="center" prop="front" width="100">
        <template slot-scope="scope">
          <el-tag :type="['success', 'danger'][scope.row.shelves]">{{
            ["上架", "下架"][scope.row.shelves]
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center" prop="giftOrderBy" />
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
        label="更新时间"
        align="center"
        prop="updateTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime) }}</span>
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
            v-hasPermi="['liveGift:gift:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['liveGift:gift:remove']"
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

    <!-- 添加或修改直播礼物对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="礼物图片" prop="front">
          <image-upload :limit="1" v-model="form.front" />
        </el-form-item>
        <div style="display: flex">
          <el-form-item label="礼物名称" prop="giftName">
            <el-input v-model="form.giftName" placeholder="请输入礼物名称" />
          </el-form-item>
          <el-form-item label="礼物金额" prop="unitPrice">
            <el-input v-model="form.unitPrice" placeholder="请输入单价" />
          </el-form-item>
        </div>

        <el-form-item label="礼物费率" prop="giftRate">
          <div style="display: flex; align-items: center">
            <el-input
              v-model="form.giftRate"
              style="width: 120px"
              placeholder="请输入礼物费率"
            />
            <div style="margin-right: 10px; margin-left: 5px">%</div>
            <i
              class="el-icon-warning-outline"
              style="font-size: 18px; color: #fea585"
            ></i>
            <div>赠礼到账扣除费率百分比，0表示无费率</div>
          </div>
        </el-form-item>

        <div style="display: flex">
          <el-form-item label="礼物状态" prop="shelves">
            <el-select v-model="form.shelves" placeholder="请选择">
              <el-option label="上架" :value="0"></el-option>
              <el-option label="下架" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" prop="giftOrderBy">
            <el-input v-model="form.giftOrderBy" placeholder="请输入排序" />
          </el-form-item>
        </div>
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
  listGift,
  getGift,
  delGift,
  addGift,
  updateGift,
} from "@/api/liveGift/gift";

export default {
  name: "Gift",
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
      // 直播礼物表格数据
      giftList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 上架状态 0 上架 1 下架时间范围
      daterangeCreateTime: [],
      // 上架状态 0 上架 1 下架时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        giftName: null,
        createTime: null,
        updateTime: null,
        shelves: null,
        // orderByColumn: "id desc",
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        front: [
          { required: true, message: "请上传礼物图片", trigger: "change" },
        ],
        giftName: [
          { required: true, message: "请填写礼物名称", trigger: "blur" },
        ],
        unitPrice: [
          { required: true, message: "请填写礼物金额", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getValue(row) {
      return row.giftRate + "%";
    },
    /** 查询直播礼物列表 */
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
      listGift(this.queryParams).then((response) => {
        this.giftList = response.rows;
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
        giftOrderBy: null,
        giftName: null,
        front: null,
        unitPrice: null,
        giftRate: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        shelves: 1,
        giftOrderBy: null,
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
      this.title = "添加直播礼物";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getGift(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = "修改直播礼物";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        console.log("form", this.form);
        if (valid) {
          if (this.form.id != null) {
            updateGift(this.form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGift(this.form).then((response) => {
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
        .confirm('是否确认删除直播礼物编号为"' + ids + '"的数据项？')
        .then(function () {
          return delGift(ids);
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
        "liveGift/gift/export",
        {
          ...this.queryParams,
        },
        `gift_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
