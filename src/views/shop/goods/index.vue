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
          placeholder="请输入商品ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入商品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="" prop="shelves">
        <el-select
          placeholder="请选择商品状态"
          clearable
          v-model="queryParams.shelves"
        >
          <el-option :value="2" label="销售中"></el-option>
          <el-option :value="1" label="已下架"></el-option>
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
          v-hasPermi="['shop:goods:add']"
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
          v-hasPermi="['shop:goods:edit']"
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
          v-hasPermi="['shop:goods:remove']"
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
          v-hasPermi="['shop:goods:export']"
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
      :data="goodsList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="left" />
      <el-table-column label="商品id" align="left" prop="id" width="80" />
      <el-table-column label="商品名称" align="left" prop="name" width="400" />
      <el-table-column label="商品主图" align="left" prop="headPortrait">
        <template slot-scope="scope">
          <image-preview
            :src="scope.row.headPortrait"
            :width="50"
            :height="50"
          />
        </template>
      </el-table-column>
      <el-table-column label="售价" align="left" prop="price" />
      <el-table-column label="商品状态" align="left" prop="shelves">
        <template slot-scope="scope">
          <el-tag :type="scope.row.shelves == 2 ? 'success' : 'danger'">
            {{ scope.row.shelves == 2 ? "销售中" : "已下架" }}
          </el-tag>
        </template>
      </el-table-column>

      <!-- <el-table-column label="更新时间" align="left" prop="updateTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.updateTime, "{y}-{m}-{d}") }}</span>
        </template>
      </el-table-column> -->

      <!-- <el-table-column label="商品详情" align="left" prop="detail" /> -->
      <el-table-column label="销售量" align="left" prop="purchaseQuantity" />
      <el-table-column label="商品分类ID" align="left" prop="goodsTypeId" />
      <!-- <el-table-column label="货号" align="left" prop="csno" /> -->
      <!-- <el-table-column label="单位" align="left" prop="unitName" /> -->
      <!-- <el-table-column label="划线价格" align="left" prop="scribingPrice" /> -->
      <el-table-column label="库存" align="left" prop="stockNumber" />
      <el-table-column label="排序" align="left" prop="sort" />
      <el-table-column
        label="运费模版ID"
        align="left"
        prop="deliveryTemplateId"
      />
      <!-- <el-table-column label="重量" align="left" prop="weight" /> -->
      <!-- <el-table-column label="体积" align="left" prop="volume" /> -->
      <!-- <el-table-column label="城市id" align="left" prop="areaId" /> -->
      <!-- <el-table-column label="店铺改动" align="left" prop="storeId" /> -->
      <el-table-column
        label="创建时间"
        align="left"
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
        label="操作"
        align="left"
        class-name="small-padding fixed-width"
        width="140"
        fixed="right"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['shop:goods:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['shop:goods:remove']"
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

    <!-- 添加或修改商品对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="1200px"
      append-to-body
    >
      <el-tabs v-model="activeName" @tab-click="activeChange">
        <el-tab-pane label="基础属性" name="goods"></el-tab-pane>
        <el-tab-pane label="规格属性" name="sku"></el-tab-pane>
        <el-tab-pane label="媒体属性" name="image"></el-tab-pane>
        <el-tab-pane label="商品详情" name="detail"></el-tab-pane>
      </el-tabs>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-width="80px"
        style="min-height: 500px"
      >
        <template v-if="activeName == 'goods'">
          <el-form-item label="商品名称" prop="name">
            <el-input
              v-model="form.name"
              placeholder="请输入商品名称"
              type="textarea"
              :rows="2"
              style="width: 500px"
            />
          </el-form-item>
          <el-form-item label="售价" prop="price">
            <el-input
              v-model="form.price"
              placeholder="请输入售价"
              type="number"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="划线价格" prop="scribingPrice">
            <el-input
              type="number"
              v-model="form.scribingPrice"
              placeholder="请输入划线价格"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="库存" prop="stockNumber">
            <el-input
              type="number"
              v-model="form.stockNumber"
              placeholder="请输入库存"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="商品状态" prop="shelves">
            <!-- <el-input v-model="form.shelves" placeholder="请输入审核状态 1下架 2上架" /> -->
            <el-radio-group v-model="form.shelves">
              <el-radio :label="2">上架</el-radio>
              <el-radio :label="1">下架</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="销售量" prop="purchaseQuantity">
            <el-input
              type="number"
              v-model="form.purchaseQuantity"
              placeholder="请输入销售量"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="排序" prop="sort">
            <el-input
              type="number"
              v-model="form.sort"
              placeholder="请输入排序"
              style="width: 200px"
            />
          </el-form-item>
          <el-form-item label="商品分类" prop="goodsTypeId">
            <el-cascader
              :show-all-levels="false"
              placeholder="请输入商品分类"
              v-model="form.goodsTypeId"
              :options="goodsTypeList"
              :props="{ expandTrigger: 'hover', label: 'name', value: 'id' }"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="运费模版" prop="deliveryTemplateId">
            <el-select v-model="form.deliveryTemplateId" clearable>
              <el-option
                v-for="item in transportList"
                :key="item.id"
                :value="item.transportId"
                :label="item.transName"
              ></el-option>
            </el-select>
          </el-form-item>
        </template>

        <template v-if="activeName == 'image'">
          <el-form-item label="商品主图" prop="headPortrait">
            <image-upload v-model="form.headPortrait" />
          </el-form-item>
        </template>
        <template v-if="activeName == 'detail'">
          <el-form-item label="商品详情">
            <editor v-model="form.detail" :min-height="192" />
          </el-form-item>
        </template>
        <div style="padding: 0; margin: 0" v-show="activeName == 'sku'">
          <sku-tag
            ref="skuTag"
            :skuList="form.skuList"
            @change="skuTagChangeSkuHandler"
          ></sku-tag>
          <sku-table
            ref="skuTable"
            v-model="form.skuList"
            :prodName.sync="form.name"
          ></sku-table>
        </div>

        <!-- <el-form-item label="货号" prop="csno">
          <el-input v-model="form.csno" placeholder="请输入货号" />
        </el-form-item> -->
        <!-- <el-form-item label="单位" prop="unitName">
          <el-input v-model="form.unitName" placeholder="请输入单位" />
        </el-form-item> -->

        <!-- <el-form-item label="重量" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入重量" />
        </el-form-item>
        <el-form-item label="体积" prop="volume">
          <el-input v-model="form.volume" placeholder="请输入体积" />
        </el-form-item>
        <el-form-item label="城市id" prop="areaId">
          <el-input v-model="form.areaId" placeholder="请输入城市id" />
        </el-form-item>
        <el-form-item label="店铺改动" prop="storeId">
          <el-input v-model="form.storeId" placeholder="请输入店铺改动" />
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
import {
  listGoods,
  getGoods,
  delGoods,
  addGoods,
  updateGoods,
} from "@/api/shop/goods";
import SkuTag from "./sku-tag";
import SkuTable from "./sku-table";

export default {
  name: "Goods",
  components: {
    SkuTag,
    SkuTable,
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
      // 商品表格数据
      goodsList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 店铺改动时间范围
      daterangeCreateTime: [],
      // 店铺改动时间范围
      daterangeUpdateTime: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        price: null,
        shelves: null,
        deleted: null,
        createTime: null,
        updateTime: null,
        headPortrait: null,
        detail: null,
        goodsTypeId: null,
        scribingPrice: null,
        stockNumber: null,
        sort: null,
        orderByColumn: "id desc",
      },
      // 表单参数
      form: {
        skuList: [],
        name: "",
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "商品名称不能为空", trigger: "blur" },
        ],
        price: [{ required: true, message: "售价不能为空", trigger: "blur" }],
        shelves: [
          {
            required: true,
            message: "审核状态 1下架 2上架不能为空",
            trigger: "blur",
          },
        ],
        headPortrait: [
          { required: true, message: "商品主图不能为空", trigger: "blur" },
        ],
        goodsTypeId: [
          { required: true, message: "商品分类不能为空", trigger: "blur" },
        ],
        stockNumber: [
          { required: true, message: "商品库存不能为空", trigger: "blur" },
        ],
        // deliveryTemplateId: [
        //   { required: true, message: "运费模板不能为空", trigger: "blur" },
        // ],
        // goodsTypeId: [
        //   { required: true, message: "商品分类主键不能为空", trigger: "blur" },
        // ],
      },
      activeName: "goods",
      goodsTypeList: [],
      transportList: [],
      skuList: [],
      typeListArr: [],
    };
  },
  created() {
    this.getList();
    this.get_type();
    this.get_transport();
  },
  activated() {},
  methods: {
    /** 查询商品列表 */
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
      listGoods(this.queryParams).then((response) => {
        this.goodsList = response.rows;
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
        price: null,
        shelves: 2,
        deleted: null,
        createTime: null,
        updateTime: null,
        headPortrait: null,
        detail: null,
        purchaseQuantity: null,
        goodsTypeId: [],
        csno: null,
        unitName: null,
        scribingPrice: null,
        stockNumber: null,
        sort: null,
        deliveryTemplateId: null,
        weight: null,
        volume: null,
        areaId: null,
        storeId: null,
        skuList: [],
      };
      this.activeName = "goods";
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
      this.title = "添加商品";
      this.$nextTick(() => {
        setTimeout(() => {
          this.form.skuList = [];
          this.$store.commit("prod/updateSkuTags", []);
          // this.$refs.skuTag.init([]);
          // this.$refs.skuTable.init();
        }, 500);
      });
    },
    getTypeHandel(id) {
      let arr = [];
      this.typeListArr.some((val) => {
        if (val.id == id) {
          arr = [val.pTypeId, id];
          return true;
        }
        return false;
      });
      return arr;
    },
    getFormGoodsType(){
      if(this.form.goodsTypeId && this.form.goodsTypeId.length == 2){
        return this.form.goodsTypeId[1];
      }
      return null;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;

      getGoods(id).then((response) => {
        this.form = {
          ...response.data,
          goodsTypeId: this.getTypeHandel(response.data.goodsTypeId),
          skuList: [],
        };
        // alert(this.form.goodsTypeId)
        this.open = true;
        this.title = "修改商品";

        this.$nextTick(() => {
          this.$store.commit("prod/updateSkuTags", []);
          this.request({
            url: `/shop/goodsSku/list`,
            params: {
              goodsId: id,
              pageNum: 1,
              pageSize: 1000,
            },
          }).then((res) => {
            if (res.code == 200) {
              this.form.skuList = res.rows;
              this.$refs.skuTag.init(res.rows);
              this.$refs.skuTable.init();
            }
          });
        });
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.form.skuList = this.skuAddGid(this.form.id, this.form.skuList);
            let form = JSON.parse(JSON.stringify(this.form));
            form.goodsTypeId = this.getFormGoodsType();
            if (this.form.skuList.length == 0) {
              this.$message({
                message: "请添加至少一个规格",
                type: "info",
              });
              return;
            }
          if (this.form.id != null) {
            
            updateGoods(form).then((response) => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addGoods(form).then((response) => {
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
        .confirm('是否确认删除商品编号为"' + ids + '"的数据项？')
        .then(function () {
          return delGoods(ids);
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
        "shop/goods/export",
        {
          ...this.queryParams,
        },
        `goods_${new Date().getTime()}.xlsx`
      );
    },
    /** 获取商品分类 */
    get_type() {
      this.request({
        url: "/shop/goodsType/list",
        method: "GET",
        params: {
          pageNum: 1,
          pageSize: 1000,
          orderByColumn: "sort",
        },
      }).then((response) => {
        if (response.code == 200) {
          this.typeListArr = response.rows;
          this.goodsTypeList = this.handleTree(response.rows, "id", "pTypeId");
        }
      });
    },
    /** 运费模板 */
    get_transport() {
      this.request({
        url: "/shop/transport/list",
        method: "GET",
        params: {
          pageNum: 1,
          pageSize: 1000,
        },
      }).then((response) => {
        if (response.code == 200) {
          this.transportList = response.rows;
        }
      });
    },
    //选择sku
    skuTagChangeSkuHandler(skuList) {
      const prodName = this.form.name;
      let length = 0;
      skuList.forEach((sku) => {
        if (sku.properties) {
          sku.skuName = "";
          let properties = sku.properties.split(";");
          for (const propertiesKey in properties) {
            sku.skuName += properties[propertiesKey].split(":")[1] + " ";
          }
          sku.prodName = prodName + " " + sku.skuName;
        }
      });
      this.form.skuList = skuList.filter((val) => val.skuName);
    },
    activeChange(e) {
      // console.log("e", e);
      if (e.paneName == "sku") {
      }
    },
    skuAddGid(id, sku) {
      return sku.map((val) => {
        if (!val.goodsId) {
          val.goodsId = id;
        }
        return val;
      });
    },
  },
};
</script>
