<template>
  <div>
    <el-button type="primary" size="small" @click="add_goods"> 添加商品 </el-button>
    <el-button type="" size="small" @click="openChooseTime"> 添加时间 </el-button>
    <el-tabs
      size="mini"
      closable
      @tab-remove="removeTab"
      v-model="checked_index"
      type="card"
      @tab-click="handleClick"
      style="margin-top: 10px"
    >
      <el-tab-pane
        v-for="(item, key, index) in list"
        :key="index"
        :label="get_label(key)"
        :name="key"
      >
        <el-table v-if="list[key]" :data="list[key]" stripe border size="mini">
          <el-table-column prop="seckillId" label="活动ID" width="80"> </el-table-column>
          <el-table-column prop="goodsId" label="商品ID" width="80"> </el-table-column>
          <el-table-column prop="pic" label="图片" width="100">
            <template slot-scope="scope">
              <image-preview
                :src="scope.row.pic"
                style="width: 60px; height: 60px"
                width="60"
                height="60"
              ></image-preview>
            </template>
          </el-table-column>
          <el-table-column prop="prodName" label="名称" show-overflow-tooltip>
          </el-table-column>

          <el-table-column prop="skuId" label="skuId" width="80"> </el-table-column>
          <el-table-column prop="skuName" label="规格" show-overflow-tooltip width="200">
          </el-table-column>
          <el-table-column prop="price" label="原价" width="154"> </el-table-column>

          <!-- price:val.price,
              pic:val.pic,
              skuName:val.properties,
              prodName:val.prodName, -->

          <el-table-column prop="offer" label="特价" width="154">
            <template slot-scope="scope">
              <el-input-number
                size="small"
                v-model="scope.row.offer"
                controls-position="right"
                :precision="2"
                :max="1000000000"
                :min="0.01"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column prop="offer" label="库存" width="154">
            <template slot-scope="scope">
              <el-input-number
                size="small"
                v-model="scope.row.stock"
                controls-position="right"
                :precision="0"
                :max="1000000000"
                :min="0"
              >
              </el-input-number>
            </template>
          </el-table-column>
          <el-table-column label="删除" width="100">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="del_one(scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
          <!-- <el-table-column prop="time" label="时间点"> </el-table-column> -->
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <el-dialog append-to-body title="选择时间" :visible.sync="showTime" width="400px">
      <el-time-select
        v-model="time"
        :picker-options="{
          start: '00:00',
          step: '00:60',
          end: '23:00',
        }"
        placeholder="选择时间"
      >
      </el-time-select>
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="showTime = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="chooseTime">确 定</el-button>
      </div>
    </el-dialog>

    <goods ref="goods" @cancel="cancel" @sure="sure"></goods>
  </div>
</template>

<script>
import goods from "@/components/Goods/Goods";
export default {
  name: "seckill",
  components: {
    goods,
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      time: "",
      showTime: false,
      checked_index: "",
      list: {},
    };
  },
  computed: {
    tableData() {
      return [];
      let arr = this.list.filter((val) => val.time == this.checked_index);
      if (arr.length == 0) return [];
      else {
        return arr[0].goods;
      }
    },
  },
  created() {
    // this.sortObj(this.list);
    let obj = this.value.timeGoodsList || {};
    let obj1 = {};
    Object.keys(obj).forEach((key) => {
      obj1[String(key)] = obj[key];
    });
    this.list = obj1;
    if (Object.keys(obj1).length > 0) {
      this.checked_index = Object.keys(obj)[0];
    }
  },
  methods: {
    get_label(str) {
      if (Number(str) < 10) {
        str = "0" + String(str);
      }
      return str + ":00";
    },
    removeTab(e) {
      console.log("e", e);
      delete this.list[e];
      let arr = Object.keys(this.list);
      if (arr.length == 0) {
        this.checked_index = "";
      } else {
        this.checked_index = arr[0];
      }
    },
    handleClick(e) {
      console.log("e", e.label);
    },
    openChooseTime() {
      this.time = "";
      this.showTime = true;
    },
    chooseTime() {
      if (!this.time) {
        this.$message({
          message: "请选择时间",
          type: "info",
        });
        return;
      }
      this.add(String(Number(this.time.split(":")[0])));
      this.showTime = false;
    },
    add(time) {
      this.list[time] = [];
      this.checked_index = time;
      this.$emit("input", {
        ...this.value,
        timeGoodsList: JSON.parse(JSON.stringify(this.sortObj(this.list))),
        timeInterval: Object.keys(this.sortObj(this.list)).join(","),
      });
    },
    add_goods() {
      let arr = [];
      if (this.checked_index != "" && this.checked_index != 0) {
        console.log("this.checked_index", this.checked_index);

        Object.keys(this.list).forEach((key) => {
          this.list[key].forEach((val) => {
            arr.push(val.skuId);
          });
        });

        // arr = this.list[this.checked_index].map((val) => val.skuId);
      } else {
        this.$message({
          message: "请先选择时间",
          type: "info",
        });
        return;
      }
      this.$refs.goods.open(arr);
    },
    cancel() {},
    sure(arr) {
      console.log("arr", arr);
      if (this.checked_index) {
        this.list[this.checked_index] = this.list[this.checked_index].concat(
          arr.map((val) => {
            return {
              seckillId: this.value.id || "",
              goodsId: val.goodsId,
              skuId: val.skuId,
              offer: val.price,
              time: this.checked_index,
              price: val.price,
              pic: val.pic,
              skuName: val.properties,
              prodName: val.prodName,
              stock: val.stocks,
            };
          })
        );
      }
      this.list = JSON.parse(JSON.stringify(this.list));
      this.$emit("input", {
        ...this.value,
        timeGoodsList: JSON.parse(JSON.stringify(this.sortObj(this.list))),
        timeInterval: Object.keys(this.sortObj(this.list)).join(","),
      });
    },
    sortObj(obj) {
      let keyArr = Object.keys(obj);
      let keyArrObjNum = {};
      let num_arr = [];
      for (let i = 0; i < keyArr.length; i++) {
        //小时 * 100
        let numArr = keyArr[i].split(":");
        let num = Number(numArr[0]) * 100;
        keyArrObjNum[num] = keyArr[i];
        num_arr.push(num);
      }
      num_arr = num_arr.sort((a, b) => a - b);

      let obj1 = {};
      num_arr.forEach((val) => {
        obj1[keyArrObjNum[val]] = obj[keyArrObjNum[val]];
      });
      return obj1;
    },
    del_one(index) {
      console.log("index", index);
      this.list[this.checked_index].splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped></style>
