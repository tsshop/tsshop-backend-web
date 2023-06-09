<template>
  <div class="dashboard-editor-container">
    <panel-group :info="topInfo" @handleSetLineChartData="handleSetLineChartData" />
    <div class="flex">
      <div class="flex-2">
        <div class="line-box">
          <div class="line-tab flex flex-y-center">
            <div style="margin-left:30px;" class="tab-active" @click="changeLineType(0)">
              <div>成交额</div>
              <div :class="{line:lineType === 0}" :style="{backgroundColor:settings.theme}"></div>
            </div>
            <div style="margin-left:30px;" class="tab-active" @click="changeLineType(1)">
              <div>订单数</div>
              <div :class="{line:lineType === 1}" :style="{backgroundColor:settings.theme}"></div>
            </div>
          </div>
          <div style="padding:20px;">
            <div class="flex">
              <div class="change-btn" :style="{backgroundColor:lineActive === 0 ? settings.theme : '',color:lineActive === 0 ? '#ffffff' : ''}" @click="changeLine(0)">本周数据</div>
              <div class="change-btn" :style="{backgroundColor:lineActive === 1 ? settings.theme : '',color:lineActive === 1 ? '#ffffff' : ''}" @click="changeLine(1)">当月数据</div>
              <div class="change-btn" :style="{backgroundColor:lineActive === 2 ? settings.theme : '',color:lineActive === 2 ? '#ffffff' : ''}" @click="changeLine(2)">全年数据</div>
            </div>
            <line-chart :chart-data="lineData1" />
          </div>
          
        </div>
        <div class="mt-20">
          <top
            url="/shop/home/salesRanking"
            title="商品销量排行"
            unitName="销量 (件)"
          ></top>
        </div>
      </div>
      <div class="ml-20 flex-1 flex-y">
        <div class="pie-box " style="flex:6;min-height:600px;">
          <div class="mb-20" style="font-size:20px;">订单情况</div>
          <div class="flex">
            <div class="change-btn" :style="{backgroundColor:pieActive === 0 ? settings.theme : '',color:pieActive === 0 ? '#ffffff' : ''}" @click="changePie(0)">本周数据</div>
            <div class="change-btn" :style="{backgroundColor:pieActive === 1 ? settings.theme : '',color:pieActive === 1 ? '#ffffff' : ''}" @click="changePie(1)">当月数据</div>
            <div class="change-btn" :style="{backgroundColor:pieActive === 2 ? settings.theme : '',color:pieActive === 2 ? '#ffffff' : ''}" @click="changePie(2)">全年数据</div>
          </div>
          <div class="flex">
            <div style="position:relative;flex:1;">
              <pie-chart :pieData="pieData" />
              <div class="o-box">
                <div class="o-2">总订单</div>
                <div class="o-1">{{ orderNum }}</div>
              </div>
            </div>
            <div class="right-show-box flex-y flex-x-end">
              <div class="flex flex-y-center mb-10" v-for="(item,index) in pieData.seriesData" :key="index">
                <div class="dot mr-10" :style="{backgroundColor:item.color}"></div>
                <div class="fs-14 mr-10">{{ item.name }}</div>
                <div class="fs-18 mr-10">{{ item.value }}</div>
                <div class="fs-14">(单)</div>
              </div>
              
            </div>
          </div>
          
        </div>
        <div class="flex-4 mt-20">
          <todoList></todoList>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PanelGroup from "./dashboard_v2/PanelGroup";
import LineChart from "./dashboard_v2/LineChart";
import RaddarChart from "./dashboard_v2/RaddarChart";
import PieChart from "./dashboard_v2/PieChart";
import BarChart from "./dashboard_v2/BarChart";
import QuickLink from "./dashboard_v2/QuickLink";
import Top from "./dashboard_v2/Top";
import todoList from './dashboard_v2/todoList.vue';
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
    todoList
  },
  created() {
    this.getTopInfo()
    this.getPieInfo()
    this.getLineOne()
  },
  data() {
    return {
      lineApis: {
        0: {
          api:'/shop/home/turnover',
          value:'turnoverList',
          name:'成交额'
        },
        1: {
          api:'/shop/home/orderNum',
          value:'orderNumList',
          name:'订单数'
        }
      },
      orderNum:0, //总订单数
      topInfo:{}, //顶部信息
      lineActive:0,
      pieActive:0,
      lineType:0,
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
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    changeLine(lineActive) {
      this.lineActive = lineActive
      this.getLineOne()
    },
    changeLineType(lineType) {
      this.lineType = lineType
      this.lineActive = 0
      this.getLineOne()
    },
    changePie(pieActive) {
      this.pieActive = pieActive
      this.getPieInfo()
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    // 获取顶部信息
    getTopInfo() {
      this.request({
        url:'/shop/home/count'
      }).then(res => {
        if(res.code !== 200) return
        this.topInfo = res.data
      })
    },
    // 获取右侧饼图信息
    getPieInfo() {
      this.request({
        url:'/shop/home/orderStatus',
        method:'get',
        params:{
          type:this.pieActive
        }
      }).then(res => {
        if(res.code !== 200) return
        const { finishOrderNum, waitDeliverOrderNum, waitPayOrderNum, waitReceivingOrderNum, cancelOrderNum, orderNum  } = res.data
        this.orderNum = orderNum
        this.pieData = {
            legendData: ['已完成','待发货','待付款','待收货','已取消'],
            seriesData: [
              {
                value: finishOrderNum,
                name: "已完成",
                color: '#FD7747'
              },
              {
                value: waitDeliverOrderNum,
                name: "待发货",
                color: '#00A9DA'
              },
              {
                value: waitPayOrderNum,
                name: "待付款",
                color: '#57DBB1'
              },
              {
                value: waitReceivingOrderNum,
                name: "待收货",
                color: '#ED5C5C'
              },
              {
                value: cancelOrderNum,
                name: "已取消",
                color: '#FAC858'
              },
            ],
          };
      })
    },
    getLineOne() {
      let { api, value, name } = this.lineApis[this.lineType]
      this.request({
        url:`${api}?type=${this.lineActive}`
      }).then(res => {
        if(res.code !== 200) return
        this.lineData1 = {
          expectedData:res.data[value],
          date:this.fomatterDate(res.data.unitNumList),
          name
        }
        console.log('lineData1',this.lineData1);
      })
    },


    fomatterDate(list) {
      let len = list.length
      if(len === 7) {
        return ['周一','周二','周三','周四','周五','周六','周日']
      } else if(len === 12) {
        return list.map(item => {
          return item.toString() + '月'
        })
      } else {
        let month = (new Date().getMonth() + 1).toString()
        return list.map(item => {
          let day = item.toString()
          return `${month}-${day}`
        })
      }
    },
   
  },
};
</script>

<style lang="scss" scoped>
.line-box {
  background-color: #fff;
  border-radius: 10px;
  .line-tab {
    border-bottom: 1px solid #f3f6f9;
    height: 60px;
    font-size: 24px;
  }
  .tab-active {
    position: relative;
    cursor: pointer;
    .line {
      width: 100%;
      height:3px;
      border-radius: 3px;
      position: absolute;
      bottom:-15px;
      left:50%;
      transform: translate(-50%,-50%);
    }
  }
}
.pie-box {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  .right-show-box {
    width: 30%;
    .dot {
      width: 10px;
      height:10px;
      border-radius: 50%;
    }
  }
}
.change-btn {
  padding: 5px 20px;
  background-color: #f1f5f8;
  border-radius: 5px;
  font-size: 14px;
  margin-right: 10px;
  color:#acadae;
  cursor: pointer;
}

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
