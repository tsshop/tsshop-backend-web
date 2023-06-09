<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="商品ID" prop="goodsId">
        <el-input
          v-model="queryParams.goodsId"
          placeholder="请输入商品ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原价" prop="oriPrice">
        <el-input
          v-model="queryParams.oriPrice"
          placeholder="请输入原价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="实际库存" prop="stocks">
        <el-input
          v-model="queryParams.stocks"
          placeholder="请输入实际库存"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="actualStocks">
        <el-input
          v-model="queryParams.actualStocks"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="记录时间" prop="recTime">
        <el-date-picker clearable
          v-model="queryParams.recTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择记录时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="商家编码" prop="partyCode">
        <el-input
          v-model="queryParams.partyCode"
          placeholder="请输入商家编码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="sku名称" prop="skuName">
        <el-input
          v-model="queryParams.skuName"
          placeholder="请输入sku名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品名称" prop="prodName">
        <el-input
          v-model="queryParams.prodName"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="版本号" prop="version">
        <el-input
          v-model="queryParams.version"
          placeholder="请输入版本号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="0 正常 1 已被删除" prop="deleted">
        <el-input
          v-model="queryParams.deleted"
          placeholder="请输入0 正常 1 已被删除"
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
          v-hasPermi="['shop:goodsSku:add']"
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
          v-hasPermi="['shop:goodsSku:edit']"
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
          v-hasPermi="['shop:goodsSku:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['shop:goodsSku:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="goodsSkuList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="单品ID" align="center" prop="skuId" />
      <el-table-column label="商品ID" align="center" prop="goodsId" />
      <el-table-column label="销售属性组合字符串 格式是p1:v1;p2:v2" align="center" prop="properties" />
      <el-table-column label="原价" align="center" prop="oriPrice" />
      <el-table-column label="价格" align="center" prop="price" />
      <el-table-column label="实际库存" align="center" prop="stocks" />
      <el-table-column label="${comment}" align="center" prop="actualStocks" />
      <el-table-column label="记录时间" align="center" prop="recTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.recTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="商家编码" align="center" prop="partyCode" />
      <el-table-column label="sku图片" align="center" prop="pic" />
      <el-table-column label="sku名称" align="center" prop="skuName" />
      <el-table-column label="商品名称" align="center" prop="prodName" />
      <el-table-column label="版本号" align="center" prop="version" />
      <el-table-column label="1 禁用 0 启用" align="center" prop="status" />
      <el-table-column label="0 正常 1 已被删除" align="center" prop="deleted" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:goodsSku:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:goodsSku:remove']"
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

    <!-- 添加或修改单品SKU对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="商品ID" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品ID" />
        </el-form-item>
        <el-form-item label="销售属性组合字符串 格式是p1:v1;p2:v2" prop="properties">
          <el-input v-model="form.properties" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="原价" prop="oriPrice">
          <el-input v-model="form.oriPrice" placeholder="请输入原价" />
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model="form.price" placeholder="请输入价格" />
        </el-form-item>
        <el-form-item label="实际库存" prop="stocks">
          <el-input v-model="form.stocks" placeholder="请输入实际库存" />
        </el-form-item>
        <el-form-item label="${comment}" prop="actualStocks">
          <el-input v-model="form.actualStocks" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="记录时间" prop="recTime">
          <el-date-picker clearable
            v-model="form.recTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择记录时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="商家编码" prop="partyCode">
          <el-input v-model="form.partyCode" placeholder="请输入商家编码" />
        </el-form-item>
        <el-form-item label="sku图片" prop="pic">
          <el-input v-model="form.pic" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="sku名称" prop="skuName">
          <el-input v-model="form.skuName" placeholder="请输入sku名称" />
        </el-form-item>
        <el-form-item label="商品名称" prop="prodName">
          <el-input v-model="form.prodName" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="版本号" prop="version">
          <el-input v-model="form.version" placeholder="请输入版本号" />
        </el-form-item>
        <el-form-item label="0 正常 1 已被删除" prop="deleted">
          <el-input v-model="form.deleted" placeholder="请输入0 正常 1 已被删除" />
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
import { listGoodsSku, getGoodsSku, delGoodsSku, addGoodsSku, updateGoodsSku } from "@/api/shop/goodsSku";

export default {
  name: "GoodsSku",
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
      // 单品SKU表格数据
      goodsSkuList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        goodsId: null,
        properties: null,
        oriPrice: null,
        price: null,
        stocks: null,
        actualStocks: null,
        recTime: null,
        partyCode: null,
        pic: null,
        skuName: null,
        prodName: null,
        version: null,
        status: null,
        deleted: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        goodsId: [
          { required: true, message: "商品ID不能为空", trigger: "blur" }
        ],
        stocks: [
          { required: true, message: "实际库存不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        recTime: [
          { required: true, message: "记录时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询单品SKU列表 */
    getList() {
      this.loading = true;
      listGoodsSku(this.queryParams).then(response => {
        this.goodsSkuList = response.rows;
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
        skuId: null,
        goodsId: null,
        properties: null,
        oriPrice: null,
        price: null,
        stocks: null,
        actualStocks: null,
        updateTime: null,
        recTime: null,
        partyCode: null,
        pic: null,
        skuName: null,
        prodName: null,
        version: null,
        status: null,
        deleted: null
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
      this.ids = selection.map(item => item.skuId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加单品SKU";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const skuId = row.skuId || this.ids
      getGoodsSku(skuId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改单品SKU";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.skuId != null) {
            updateGoodsSku(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGoodsSku(this.form).then(response => {
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
      const skuIds = row.skuId || this.ids;
      this.$modal.confirm('是否确认删除单品SKU编号为"' + skuIds + '"的数据项？').then(function() {
        return delGoodsSku(skuIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('shop/goodsSku/export', {
        ...this.queryParams
      }, `goodsSku_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
