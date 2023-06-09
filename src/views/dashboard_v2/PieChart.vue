<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    title: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    pieData: {
      type: Object,
      default: () => ({
        legendData: [],
        seriesData: [],
      }),
    },
  },
  watch: {
    pieData() {
      this.initChart();
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      console.log("pieData", this.pieData);
      this.chart.setOption({
        // title: {
        //   show: this.title,
        //   text: this.title,
        //   textStyle: {
        //     color: "#333",
        //   },
        // },
        tooltip: {
          // trigger: "item",
          // formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // legend: {
        //   left: "center",
        //   bottom: "10",
        //   // data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
        //   data: this.pieData.legendData,
        // },
        color:['#FD7747', '#00A9DA', '#57DBB1', '#ED5C5C', '#FAC858'],
        series: [
          {
            name: "订单",
            type: "pie",
            roseType: 'area',
            // roseType: "radius",
            // radius: [15, 95],
            radius: ["40%", "60%"],
            itemStyle: {
              borderRadius: 4,
              borderColor: "#fff",
              borderWidth: 2,
            },
            // center: ["50%", "38%"],
            // data: [
            //   { value: 320, name: "Industries" },
            //   { value: 240, name: "Technology" },
            //   { value: 149, name: "Forex" },
            //   { value: 100, name: "Gold" },
            //   { value: 59, name: "Forecasts" },
            // ],
            data: this.pieData.seriesData,
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>
