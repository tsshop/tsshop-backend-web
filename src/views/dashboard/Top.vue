<template>
  <div
    style="
      background-color: #ffffff;
      padding: 10px 18px;
      font-size: 14px;
      color: #999999;
      line-height: 40px;
      margin-bottom: 18px;
    "
  >
    <div style="display: flex; justify-content: space-between">
      <div style="color: #333; font-weight: 600">{{ title }}</div>
      <div style="height: 40px">
        <el-radio-group v-model="status" style="transform: scale(0.7) translateX(46px)">
          <el-radio-button :label="1">今日</el-radio-button>
          <el-radio-button :label="2">本周</el-radio-button>
          <el-radio-button :label="3">本月</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div style="display: flex">
      <div style="flex: 1">排名</div>
      <div style="flex: 8">商品名称</div>
      <div style="flex: 2; color: #333333; text-align: right">{{ unitName }}</div>
    </div>
    <div v-if="list.length" style="min-height: 410px">
      <div v-for="(item, index) in list" :key="index" class="top-item">
        <div class="t-item-1">
          <div class="span-box" :class="index < 4 ? 'active' : ''">{{ index + 1 }}</div>
        </div>
        <div class="t-item-2">
          {{ item[nameKey] }}
        </div>
        <div class="t-item-3">{{ item[valueKey] || "0" }}</div>
      </div>
    </div>
    <div v-else style="line-height: 410px; text-align: center">暂无排名</div>
  </div>
</template>

<script>
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
  methods: {
    get_list() {
      this.request({
        url: `${this.url}?status=${this.status}`,
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
}
</style>
