<template>
  <div>
    <el-dialog append-to-body title="选择商品" :visible.sync="show" width="800px">
      <div class="box-box p-15">
        <!--显示商品列表的组件 可多选单选 -->
        <!-- 筛选开始 -->
        <div class="flex mb-15">
          <el-input
            size="mini"
            class="w-150 mr-15"
            v-model="prodName"
            placeholder="请输入商品名称"
          ></el-input>
          <el-input
            size="mini"
            class="w-150 mr-15"
            v-model="goods_name"
            placeholder="请输入商品ID"
          ></el-input>

          <el-button @click="seach" size="mini" type="success" plain icon="el-icon-search"
            >搜索</el-button
          >
          <el-button
            @click="clear"
            size="mini"
            type="success"
            plain
            icon="el-icon-refresh"
            >清空选择</el-button
          >
        </div>
        <!-- 筛选结束 -->
        <div
          v-infinite-scroll="load"
          :nfinite-scroll-distance="30"
          :infinite-scroll-disabled="stop"
          class="box-shadow list"
        >
          <!--   -->
          <div :key="index" v-for="(item, index) in goods_list" class="list-item">
            <div
              class="list-item-content box-shadow box-box flex flex-y-center color-999999"
              :class="{ active: item.checked }"
              @click="choose_good(item)"
            >
              <div class="pl-5" style="hight: 90px; line-height: 0; width: 90px">
                <el-image
                  :src="item.pic || ''"
                  style="
                    width: 90px;
                    height: 90px;
                    line-height: 0;
                    font-size: 0;
                    overflow: hidden;
                  "
                  fit="cover"
                ></el-image>
              </div>
              <div class="flex-1 ml-10 pr-5" style="line-height: 22px">
                <div><span>ID：</span>{{ item.goodsId }}</div>

                <div class="text-hidden" style="width: 200px">
                  <span>商品：</span>{{ item.prodName }}
                </div>
                <div class="flex flex-x-b">
                  <div><span>库存：</span>{{ item.stocks }}</div>
                  <div><span>售价：</span>{{ item.price }}</div>
                </div>
                <div class="flex flex-x-b">
                  <div>
                    <span class="text-hidden" v-if="item.properties">规格：</span
                    >{{ item.properties }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="flex flex-y-center flex-x-center color-999999"
            style="height: 40px; width: 100%; text-align: center"
          >
            <span v-show="stop">已加载全部</span>
          </div>
          <div v-show="loading" style="font-size: 30px; text-align: center">
            <i class="el-icon-loading"></i>
          </div>
        </div>
        <div class="flex flex-x-end mt-20">
          <el-button plain type="info" @click="cancel">取 消</el-button>
          <el-button plain type="success" @click="sure">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { runInNewContext } from "vm";

export default {
  name: "goods",
  data() {
    return {
      show: false,
      //以选择
      checked_arr: [],
      //商品数据
      goods_list: [],
      stop: false,
      page: 1,
      goods_name: "", //搜索内容
      prodName: "",
      loading: false,
      checkedArr: [],
      first: false,
    };
  },
  props: {},
  created() {
    //请求商品
    this.first = true;
  },
  methods: {
    open(checkedArr = []) {
      this.stop = false;
      this.page = 1;
      this.goods_list = [];
      this.checkedArr = checkedArr; // skuid 数组
      this.show = true;
      if (this.first) this.load();
    },
    goods_init() {
      this.checked_arr = [];
      // this.request();
    },
    mounted() {
      this.page = 1;
    },

    load() {
      //加载下一页

      if (this.stop) return;
      this.loading = true;
      //   let data = {
      //     page: this.page,
      //     goods_name: this.goods_name,
      //     brand_ids: this.catIds,
      //     max_price: this.max_price,
      //     min_price: this.min_price,
      //   };

      this.request({
        url: `/shop/goodsSku/list`,
        params: {
          goodsId: this.goods_name,
          pageNum: this.page,
          pageSize: 10,
          prodName: this.prodName,
        },
      }).then((res) => {
        if (res.code == 200) {
          this.loading = false;
          if (res.code == 200) {
            if (res.rows.length > 0) {
              this.page++;
              res.rows = res.rows.filter((val) => !this.checkedArr.includes(val.skuId));
              this.goods_list = this.goods_list.concat(res.rows);
            } else {
              this.stop = true;
            }
          }
        }
      });
    },
    seach() {
      this.stop = false;
      this.page = 1;
      this.goods_list = [];
      this.load();
    },
    clear() {
      this.goods_name = "";
      this.prodName = "";
      this.stop = false;
      this.page = 1;
      this.goods_list = [];
      this.load();
    },
    //获取分类

    cancel() {
      this.$emit("cancel");
      this.show = false;
    },
    sure() {
      let arr = [];
      this.goods_list.forEach((val) => {
        if (val.checked) {
          arr.push(val);
        }
      });
      this.show = false;
      this.$emit("sure", arr);
    },
    choose_good(item) {
      item.checked = !Boolean(item.checked);
      this.goods_list = this.goods_list.concat();
    },
  },
};
</script>

<style scoped>
.list {
  height: 460px;
  /* display: flex;
    flex-flow: row wrap; */
  width: 720px;
  overflow-y: scroll;
  box-sizing: border-box;
  padding: 0 7px;
  /* align-items: flex-start; */
  /* overflow-x:hidden; */
}
.list-item {
  width: 50%;
  height: 100px;
  margin-top: 12px;
  box-sizing: border-box;
  padding: 0 6px;
  display: inline-block;
}
.list-item-content {
  width: 100%;
  height: 100px;
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;
}
.active {
  opacity: 1;
  box-shadow: 0 0 6px 0 rgba(105, 204, 166, 0.8);
}
.goods-img {
  background-color: red;
}
.w-150 {
  width: 150px;
}
</style>
