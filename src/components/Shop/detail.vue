<template>
  <div>
    <el-dialog
      :close-on-click-modal="true"
      :visible.sync="show"
      title="订单详情"
      width="800px"
    >
      <div
        style="
          
          color: #666666;
          line-height: 24px;
          padding: 16px;
          height:800px;
          overflow-y:scroll;
        "
      >
        <div style=" min-height: 500px" v-if="goods && order">
          <div  v-if="goods">
            <div class="flex flex-y-center">
              <div style="font-weight: 600">商品详情</div>
              <div class="flex-1 ml-10" style="height:1px;width:100%;background:#efefef;"></div>
            </div>
           
            <!-- 商品信息 -->
            <div style="display: flex" class="mt-20">
              <el-image
                :append-to-body="true"
                style="width: 70px; border-radius: 4px; height: 70px"
                :src="goods.headPortrait"
                :z-index="10000"
                fit="cover"
              >
              </el-image>
              <div class="flex-1">
                <div style="line-height: 20px; padding-left: 6px">{{ goods.name }}</div>
                <div class="flex " style="padding-left: 6px">
                  <div style="flex: 2">商品单价：¥{{ goods.price }}</div>
                  <div style="flex: 2" v-if="goods.properties">
                    商品规格：{{ goods.properties }}
                  </div>
                  <div style="flex: 2" v-else></div>
                  <div style="flex: 1">商品数量：{{ order.quantity }}</div>
                </div>
                <div class="flex" style="padding-left: 6px">
                  <div class="flex-2">订单号：{{ order.orderNo }}</div>
                  <div class="flex-2">下单时间：{{ order.createTime }}</div>
                  <div class="flex-1">支付单号：{{ order.payNo || "未付款" }}</div>
                </div>
              </div>
            </div>
            
            <!-- <div style="display: flex">
              
              <div style="flex: 1" v-if="order.freight">运费：¥{{ order.freight }}</div>
              <div style="flex: 1">合计：¥{{ order.totalAmount }}</div>
            </div> -->

            

            <!-- 商品信息 -->

            <div
              v-if="address"
            >
            <div class="flex flex-y-center mt-20">
              <div style="font-weight: 600">收货信息</div>
              <div class="flex-1 ml-10" style="height:1px;width:100%;background:#efefef;"></div>
            </div>
            <div class="flex mt-10">
              <div class="flex-1">
                收货姓名：{{ address.name }}
                <span
                  style="color: #13ce66; padding-left: 8px; cursor: pointer"
                  v-clipboard:copy="address.copy"
                  v-clipboard:success="copy_success"
                  >复制</span
                >
              </div>
              <div class="flex-1">收货电话：{{ address.phone }}</div>
            </div>
              
              <div class="mt-10">收货地址：{{ address.all }}</div>
            </div>
          </div>

          <!-- 处理 -->
          <div class="flex flex-y-center mt-20">
            <div style="font-weight: 600">订单状态</div>
            <div class="flex-1 ml-10" style="height:1px;width:100%;background:#efefef;"></div>
          </div>
          <div style="flex: 1; margin-left: 16px">
            <!-- <div style="font-weight: 600">订单状态</div> -->

            <div class="mt-8">
              <el-steps :align-center="true" :active="active">
                <el-step title="创建订单" icon="el-icon-edit"></el-step>
                <el-step title="买家已付款" icon="el-icon-bank-card"></el-step>
                <el-step title="发货" icon="el-icon-truck"></el-step>
                <el-step title="完成" icon="el-icon-time"></el-step>
              </el-steps>
            </div>
          </div>

          <div class="flex flex-y-center mt-20" v-if="order.expressNo">
            <div style="font-weight: 600">物流信息</div>
            <div class="flex-1 ml-10" style="height:1px;width:100%;background:#efefef;"></div>
          </div>
          <div class="flex mt-10" v-if="order.expressNo" style="padding-left: 6px">
            <div class="flex-2">快递公司：{{ wuliu.shipperName }}</div>
            <div class="flex-2">快递单号：{{ wuliu.OrderCode }}</div>
            <div class="flex-1">物流状态：{{ wuliuStatus[wuliu.State] || "未付款" }}</div>
          </div>
          <!-- <div class="mt-10" style="padding-left: 6px">交易时间：2022年XXXXX</div> -->
          <div style="height:40px;"></div>
            <div class="wuliu-info"  v-for="(item,index) in wuliu.Traces" :key="index">
              <div class="info" :style="{color: index===0  ? settings.theme :''}">
                <div >{{ item.AcceptStation }}</div>
                <div class="pl-10">{{ item.AcceptTime }}</div>
              </div>
              <div class="dot" :style="{backgroundColor: index===0  ? settings.theme :''}"></div>
            </div>
          
          
          <!-- 处理 -->
        </div>

        <!-- <div
          style="
            display: flex;
            min-height: 160px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            margin-top: 16px;
          "
          v-if="row"
        >
          <div style="font-weight: 600" class="mt-8">商品信息</div>
        </div> -->
      </div>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button type="text" @click="show = false">取消</el-button>
        <el-button :loading="show_loading" type="primary" @click="sure"
          >确认处理</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>

<script>

import { mapState } from 'vuex'
import { getWuliuInfo } from '../../api/shop/order'
export default {
  name: "refund",
  props: {},
  dicts: ["return_status", "return_type"],
  data() {
    return {
      row: null,
      show_loading: false,
      show: false,
      order: null,
      goods: null,
      address: null,
      active: 0,
      wuliu:{},
      wuliuStatus:{
        1:'已揽收',
        2:'在途中',
        201:'到达派件城市',
        202:'派件中',
        211:'已放入快递柜或驿站',
        3:'已签收',
        311:'已取出快递柜或驿站',
        4:'问题件',
        401:'发货无信息',
        402:'超时未签收',
        403:'超时未更新',
        404:'拒收（退件）',
        412:'快递柜或驿站超时未取',
      }
    };
  },
  computed: {
    ...mapState(['settings'])
  },
  methods: {
    open(row) {
      console.log('row',row);
      this.row = row;
      this.show = true;
      this.get_detail(row.id);
    },
    sure() {
      this.show = false;
    },

    get_detail(id) {
      this.request({
        url: `/shop/order/` + id,
      }).then((res) => {
        if (res && res.data) {
          res = res.data;
          //   this.address_list = res.rows;
          let goods = res.goods;
          
          if (res.sku) {
            goods.price = res.sku.price;
            goods.headPortrait = res.sku.pic;
            goods.properties = res.sku.properties;
          }
          if (goods.headPortrait) goods.headPortrait = goods.headPortrait.split(",")[0];
          this.goods = goods;
          this.order = res.order;
          let {express,expressNo,orderNo} = res.order
          this.get_wuliuInfo({express,expressNo,orderNo})
          if (res.address) {
            // {{ address.provinceName }} {{ address.cityName }}
            //     {{ address.areaName }} {{ address.detailAddr }}
            res.address.all = `${res.address.provinceName} ${res.address.cityName} ${res.address.areaName} ${res.address.detailAddr}`;
            res.address.copy = `${res.address.name}\n${res.address.phone}\n${res.address.all}`;
          }
          this.address = res.address;

          let arr = {
            0: 1,
            1: 2,
            2: 3,
            3: 4,
            4: 4,
          };
          this.active = arr[this.order.orderStatus];
          if (this.order.orderStatus == -1) {
            this.active = 4;
          }
        }
      });
    },
    get_wuliuInfo(data) {
      let defaultDate = {
        express: "ZTO",
        expressNo: "78659081568303",
        orderNo: "202302221045077554"
      }
      let form = data || defaultDate
      getWuliuInfo(form).then(res => {
        if(res.code !== 200) return
        this.wuliu = res.data
      })
    },
    copy_success(msg) {
      this.$message.success("用户下单地址复制成功");
    },
  },
};
</script>

<style lang="scss" scoped>
.mt-10 {
  margin-top: 10px;
}
.mt-8 {
  margin-top: 8px;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.wuliu-info {
  position: relative;
  height:100px;
  border-left: 1px solid #D7D7D7;
  padding-bottom: 30px;
  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #D7D7D7;
    position: absolute;
    left: 0;
    top:0;
    transform: translate(-50%, -50%);
  }
  .info {
    position: absolute;
    top:-10px;
    left: 30px;
  }
}
</style>
