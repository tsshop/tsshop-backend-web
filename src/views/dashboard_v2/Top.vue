<template>
  <div class="goods-box">
    <div style="display: flex; justify-content: space-between">
      <div style="color: #333;font-size:20px;" >{{ title }}</div>
      <div style="height: 40px">
        <!-- <el-radio-group v-model="status" style="transform: scale(0.7) translateX(46px)">
          <el-radio-button :label="1">今日</el-radio-button>
          <el-radio-button :label="2">本周</el-radio-button>
          <el-radio-button :label="3">本月</el-radio-button>
        </el-radio-group> -->
        <div class="flex">
          <div class="change-btn"
            :style="{ backgroundColor: goodsActive === 0 ? settings.theme : '', color: goodsActive === 0 ? '#ffffff' : '' }"
            @click="changeGoods(0)">本周数据</div>
          <div class="change-btn"
            :style="{ backgroundColor: goodsActive === 1 ? settings.theme : '', color: goodsActive === 1 ? '#ffffff' : '' }"
            @click="changeGoods(1)">当月数据</div>
          <div class="change-btn"
            :style="{ backgroundColor: goodsActive === 2 ? settings.theme : '', color: goodsActive === 2 ? '#ffffff' : '' }"
            @click="changeGoods(2)">全年数据</div>
        </div>
      </div>
    </div>
    <el-table :data="list" style="width: 100%" height="450" :header-row-style="{backgroundColor:'#f7f9fc'}">
      <el-table-column prop="sort" label="排名" align="center"></el-table-column>
      <el-table-column prop="date" label="商品名称">
        <template slot-scope="{row}">
          <div class="flex flex-y-center">
            <div style="width:60px;height:60px;margin-right:10px;">
              <el-image :src="row.img" style="width:100%;height:100%;" alt=""></el-image>
            </div>
            <div class="flex-1">{{ row.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="saleNum" label="销量(单)" align="center"></el-table-column>
      <el-table-column prop="saleMoney" label="成交金额(元)" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "top",
  props: {
    url: {
      type: String,
      default: "/shop/home/getAmtRanking",
    },
    title: {
      type: String,
      default: "商品销售排行",
    },
    nameKey: {
      type: String,
      default: "name",
    },
    valueKey: {
      type: String,
      default: "num",
    },
    unitName: {
      type: String,
      default: "销售额 (元)",
    },
  },
  data() {
    return {
      status: 1,
      list: [],
      goodsActive: 0
    };
  },
  watch: {
    status() {
      this.get_list();
    },
  },
  created() {
    this.get_list();
  },
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    changeGoods(goodsActive) {
      this.goodsActive = goodsActive
      this.get_list()
    },
    get_list() {
      this.request({
        url: `${this.url}?type=${this.goodsActive}`,
      }).then((res) => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-box {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}

.change-btn {
  padding: 5px 20px;
  background-color: #f1f5f8;
  border-radius: 5px;
  font-size: 14px;
  margin-right: 10px;
  color: #acadae;
  cursor: pointer;
}

.top-item {
  display: flex;
  color: #333;
  border-top: 0.5px solid rgba(150, 150, 150, 0.1);
  align-items: center;
}

.t-item-1 {
  flex: 1;

  .span-box {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .span-box.active {
    background-color: #ff5d5d;
    color: #fff;
  }
}

.t-item-2 {
  flex: 8;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.t-item-3 {
  flex: 2;
  text-align: right;
}</style>
