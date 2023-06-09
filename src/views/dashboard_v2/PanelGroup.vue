<template>
  <div class="flex mb-20">
    <div class="top-left flex flex-x-b flex-1">

      <div class="flex flex-x-b flex-y-center top-left-item flex-1" style="min-width:120px;">
        <div>
          <div style="font-size:14px;">今日销售额</div>
          <div class="flex flex-y-center">
            <div style="font-size:26px;margin-right:5px;margin-top:10px;font-weight:600;height:30px;line-height:31px" :style="{color:settings.theme}">{{ info.dailySales }}</div>
            <div style="height:30px;line-height:42px"> (万元)</div>
          </div>
        </div>
        <div class="iconfont icon-a-bingtu2" :style="{color:settings.theme}" style="font-size:50px;"></div>
      </div>

      <div class="flex flex-x-b flex-y-center top-left-item flex-1" style="min-width:120px;">
        <div>
          <div style="font-size:14px;">今日订单数</div>
          <div class="flex flex-y-center">
            <div style="font-size:26px;margin-right:5px;margin-top:10px;font-weight:600;height:30px;line-height:31px" :style="{color:settings.theme}">{{ info.dailyOrder }}</div>
            <div style="height:30px;line-height:42px">(单)</div>
          </div>
        </div>
        <div class="iconfont icon-gongzuotai-fuwujilu" :style="{color:settings.theme}" style="font-size:50px;"></div>
      </div>

      <div class="flex flex-x-b flex-y-center top-left-item flex-1" style="min-width:120px;">
        <div>
          <div style="font-size:14px;">商城商品总数</div>
          <div class="flex flex-y-center">
            <div style="font-size:26px;margin-right:5px;margin-top:10px;font-weight:600;height:30px;line-height:31px" :style="{color:settings.theme}">{{ info.goodsNum }}</div>
            <div style="height:30px;line-height:42px">(件)</div>
          </div>
        </div>
        <div class="iconfont icon-liulanjilu-tianchong" :style="{color:settings.theme}" style="font-size:50px;"></div>
      </div>

      <div class="flex flex-x-b flex-y-center top-left-item flex-1" style="min-width:120px;">
        <div>
          <div style="font-size:14px;">今日新增用户</div>
          <div class="flex flex-y-center">
            <div style="font-size:26px;margin-right:5px;margin-top:10px;font-weight:600;height:30px;line-height:31px" :style="{color:settings.theme}">{{ info.dailyNewUser }}</div>
            <div style="height:30px;line-height:42px">(人)</div>
          </div>
        </div>
        <div class="iconfont icon-denglu-yonghuzu" :style="{color:settings.theme}" style="font-size:50px;"></div>
      </div>

    </div>
    <div class="top-right flex-y flex-x-center fs-14" :style="{backgroundColor:settings.theme}">
      <div>积累总用户人数(人)</div>
      <div class="flex flex-y-center mt-10">
        <div class="iconfont icon-denglu-yonghuzu mr-10" style="font-size:28px;color:#ffffff;"></div>
        <div style="font-size:28px;color:#ffffff;">{{ info.userNum }}</div>
        <div class="fs-14 ml-10">(人)</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CountTo from "vue-count-to";

export default {
  components: {
    CountTo,
  },
  props: {
    info: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    handleSetLineChartData(type) {
      return;
      this.$emit("handleSetLineChartData", type);
    },
  },
};
</script>

<style lang="scss" scoped>
.top-left {
  background-color: #fff;
  border-radius: 10px;
  padding: 10px 20px;
  .top-left-item {
    border-radius: 10px;
    height:114px;
    min-width: 220px;
    background-color: #f7f9fc;
    padding: 20px;
    margin-right: 10px;
    &:nth-last-child(1) {
      margin: 0;
    }
  }
}
.top-right {
  height:134px;
  width:340px;
  min-width: 340px;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  color: #ffffff;
  background-image: url(../../assets/images/wave-bg.png);
  background-size: contain;
  background-position: left bottom;
  background-repeat: no-repeat;
}
</style>
