<template>
  <div class="dashboard-editor-container">
    <panel-group :info="pData" @handleSetLineChartData="handleSetLineChartData" />

    <el-row :gutter="10" style="background: #fff; padding: 16px 16px 0">
      <el-col :xs="24" :sm="24" :lg="8">
        <line-chart :chart-data="lineData1" title="本月成交额" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <line-chart :chart-data="lineData2" title="本月订单数" />
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" style="position: relative">
        <pie-chart :pieData="pieData" title="本月销售情况" />
        <div class="o-box">
          <div class="o-1">{{ orderNumToady }}</div>
          <div class="o-2">销售总量</div>
        </div>
      </el-col>
    </el-row>

    <quick-link :linkList="linkList"></quick-link>

    <el-row :gutter="18">
      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col> -->

      <!-- <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col> -->
    </el-row>

    <el-row :gutter="18">
      <el-col :xs="24" :sm="24" :lg="12">
        <div>
          <top valueKey="amt"></top>
        </div>
      </el-col>

      <el-col :xs="24" :sm="24" :lg="12">
        <div>
          <top
            url="/shop/home/getNumRanking"
            title="商品销量排行"
            unitName="销量 (件)"
          ></top>
        </div>
      </el-col>
    </el-row>

    <!-- <icon-all></icon-all> -->
  </div>
</template>

<script>
import PanelGroup from "./dashboard/PanelGroup";
import LineChart from "./dashboard/LineChart";
import RaddarChart from "./dashboard/RaddarChart";
import PieChart from "./dashboard/PieChart";
import BarChart from "./dashboard/BarChart";
import QuickLink from "./dashboard/QuickLink";
import Top from "./dashboard/Top";
// import IconAll from "./components/icons/index";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

export default {
  name: "Index",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    // IconAll,
    QuickLink,
    Top,
  },
  created() {
    this.get_data();
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,
      pData: {
        dailyNewUser: 0,
        dailyOrder: 0,
        dailySales: 0,
        userNum: 0,
      }, //上方数据
      lineData1: {
        expectedData: [],
        date: [],
      },
      lineData2: {
        expectedData: [],
        date: [],
      },
      linkList: [
        {
          name: "管理商品",
          path: "/order",
          icon: "tool",
        },
        {
          name: "商品分类",
          path: "/goodsType",
          icon: "form",
        },
        {
          name: "订单管理",
          path: "/order",
          icon: "job",
        },
        {
          name: "评论管理",
          path: "",
          icon: "wechat",
        },
        {
          name: "售后管理",
          path: "/returnOrder",
          icon: "time-range",
        },
        {
          name: "用户管理",
          path: "/userlist",
          icon: "peoples",
        },
      ],
      pieData: {
        legendData: [],
        seriesDate: [],
      },
      orderNumToady: 0,
    };
  },
  methods: {
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    get_data() {
      this.request({
        url: "/shop/home/getHome",
      }).then((res) => {
        if (res && res.code == 200) {
          this.pData = {
            dailyNewUser: res.data.dailyNewUser,
            dailyOrder: res.data.dailyOrder,
            dailySales: res.data.dailySales,
            userNum: res.data.userNum,
          };
          this.lineData1 = {
            expectedData: res.data.MonthlySalesList.map((val) => val.amt),
            date: res.data.MonthlySalesList.map((val) => val.time),
          };

          this.lineData2 = {
            expectedData: res.data.MonthlyOrderList.map((val) => val.num),
            date: res.data.MonthlyOrderList.map((val) => val.time),
          };

          this.pieData = {
            legendData: ["销售总量", "退款总数"],
            seriesData: [
              {
                value: res.data.MonthlyOrder,
                name: "销售总量",
              },
              {
                value: res.data.MonthlyReturn,
                name: "退款总数",
              },
            ],
          };
          this.orderNumToady = res.data.MonthlyOrder;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 18px;
  padding-bottom: 0;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

.o-box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  color: #333;
  text-align: center;
  .o-1 {
    font-size: 20px;
    color: 00000;
    font-weight: bold;
  }
  .o-2 {
    font-size: 14px;
  }
}
</style>
