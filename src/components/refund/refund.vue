<template>
    <div>
        <el-dialog :close-on-click-modal="false" :visible.sync="show" title="售后详情" width="900px">


            <div style="display: flex;height: 600px;color:#666666;line-height: 30px;" v-if="row">
                <!-- 用户售后信息 -->
                <div style="width: 400px;">
                    <!-- 商品信息 -->
                    <div v-if="order && goods">
                        <div style="font-weight: 600;">订单信息</div>

                        <div style="display: flex;line-height: 18px;">
                            <el-image :append-to-body="true" style="width: 60px;border-radius: 4px; height: 60px"
                                :src="goods.headPortrait" :z-index="10000" fit="cover">
                            </el-image>
                            <div style="flex:1;padding-left: 10px;">
                                <div>{{goods.name}}</div>
                                <div class="mt-10">商品ID：{{goods.id}}</div>
                            </div>
                        </div>
                        <div v-if="sku">规格：{{sku.properties}}</div>
                        <div>用户ID：{{row.userId}}</div>
                        <div>订单号：{{row.orderNo}}</div>
                        <div>订单总额：<span style="color:#1890FF;">{{row.orderAmt}}</span></div>
                        
                        <div>购买数量：{{order.purchaseQuantity}}</div>
                        <div v-if="order.freight>0">运费：{{order.freight}}</div>

                    </div>
                    <!-- 售后信息 -->
                    <div>
                        <div style="font-weight: 600;margin-top: 10px;">售后信息</div>
                        <div>售后发起时间：{{parseTime(row.createTime)}}</div>
                        <div>售后类型：<span style="color:#1890FF;">{{ dict.label.return_type[row.returnType] }}</span></div>
                        <div>退款金额：<span style="color:#1890FF;">{{row.returnAmt}}</span></div>
                        <div>退款理由：{{row.returnReason}}</div>
                        <div v-if="row.returnDetail">用户备注：{{row.returnDetail}}</div>
                        <div v-if="image_list.length>0">图片描述：</div>
                        <div style="display: flex;">
                            <el-image v-for="(item,index) in image_list" :key="index" :append-to-body="true"
                                style="width: 60px;border-radius: 4px;height: 60px;margin-right: 8px;" :src="item"
                                :z-index="10000" fit="cover" :preview-src-list="image_list">
                            </el-image>
                        </div>
                    </div>

                </div>
                <!-- 用户售后信息 -->


                <!-- 处理 -->
                <div style="flex:1;">

                    <div style="font-weight: 600;">售后处理</div>

                    <div class="mt-10">售后状态：<span style="color:#1890FF;">{{ dict.label.return_status[row.status]
                    }}</span></div>
                    <div class="mt-10" v-if="row.refuseDetail">
                        拒绝理由：
                        {{row.refuseDetail}}
                    </div>


                    <div class="mt-10" v-if="row.expressName">
                        物流名称：
                        {{row.expressName}}
                    </div>
                    <div class="mt-10" v-if="row.expressNo">
                        物流单号：

                        <a target="_blank" style="text-decoration: underline;"
                            :href="'https:/www.baidu.com/s?wd='+row.expressNo">{{row.expressNo}}</a>
                    </div>


                    <!-- 1:发起退货（等待审核） 2：审核拒绝 3：退款成功 4 等待填物流单号 5 物流待审核 -->
                    <div style="margin-top: 40px;"></div>
                    <!-- 1待审核 -->


                    <template v-if="(row.status == 1 || row.status == 5 )">
                        <el-radio-group v-model="pass" v-if="row.status != 4">
                            <el-radio :label="1">通过</el-radio>
                            <el-radio :label="2">拒绝</el-radio>
                        </el-radio-group>

                        <div v-if="pass == 1">
                            <el-input
                                v-if="(row.returnType == 1 && row.status == 1) || (row.returnType == 2  && row.status == 1) || (row.returnType == 3 &&  row.status == 5)"
                                class="mt-10" type="number" style="width:200px" placeholder="退款金额(默认全额退款)"
                                v-model="money"></el-input>
                        </div>

                        <div v-if="pass == 2">
                            <el-input class="mt-10" placeholder="拒绝理由" type="textarea" v-model="remark"
                                style="width: 370px;" />
                        </div>
                    </template>

                    <div v-if="pass == 1 && row.returnType == 3 && row.status == 1" class="mt-10">
                        <el-select v-model="addressId" clearable placeholder="选择收货地址" class="filter-item"
                            style="width: 200px">
                            <el-option v-for="item in address_list" :key="item.id" :label="item.name"
                                :value="item.id" />
                        </el-select>
                    </div>






                    <!-- 1待审核 -->


                    <!--  -->


                </div>
                <!-- 处理 -->

            </div>



            <div slot="footer" class="dialog-footer">
                <el-button type="text" @click="show = false">取消</el-button>
                <el-button :loading="show_loading" type="primary" @click="sure">确认处理</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>

export default {
    name: 'refund',
    props: {

    },
    dicts: ['return_status', 'return_type'],
    data() {
        return {
            row: null,
            show_loading: false,
            show: false,
            order: null,
            goods: null,
            sku:null,
            image_list: [],
            remark: '',//拒绝理由
            pass: 1,//通过
            money: '',//退款金额
            addressId: '',
            address_list: [],

        }
    },
    methods: {
    
        open(row) {
            this.row = row;
            this.pass = 1;
            this.addressId = '';
            this.remark = '';
            this.money = '';
            
            if (row.returnImg) {
                this.image_list = row.returnImg.split(',');
            } else {
                this.image_list = [];
            }
            this.show = true;
            this.get_goods();
            if (this.address_list.length == 0) {
                this.get_address();
            }
        },
        sure() {

            if (this.row.status == 1 || this.row.status == 5) {
                if (this.pass == 2) {
                    if (!this.remark) {
                        this.$message({
                            message: '请填写拒绝理由',
                            type: 'warning'
                        });
                        return;
                    }
                }
                if (this.pass == 1 && this.row.returnType == 3 && this.row.status == 1) {
                    if (!this.addressId) {
                        this.$message({
                            message: '请选择收货地址',
                            type: 'warning'
                        });
                        return;
                    }
                }





                let status = this.pass;
                // if(this.pass == 2){
                //     status = 2;
                // }
                // if(this.pass == 1){
                //     if(this.row.returnType == 3){
                //         if(this.row.status == 1){
                //             status = 1;
                //         }
                //         if(this.row.status == 4){

                //         }
                //     }else{
                //         status = 1;
                //     }
                // }


                this.$confirm("确认处理", "确定")
                    .then((res) => {
                        /////
                        this.show_loading = true;
                        this.request({
                            url: '/shop/returnOrder/examine',
                            data: {
                                id: this.row.id,
                                reallyAmt: this.money > 0 ? this.money : this.row.returnAmt,
                                status,
                                refuseDetail: this.remark,
                                addressId: this.addressId,
                            },
                            method: 'post',
                        }).then(res => {
                            this.show_loading = false;
                            this.$notify({
                                title: '操作成功',
                                type: 'success',
                                duration: 2500
                            });
                            this.show = false;
                            this.$emit('change');
                        }).catch(() => {
                            this.show_loading = false;
                        });
                        ////
                    })
                    .catch(() => { });










            } else {
                this.$message({
                    message: this.dict.label.return_status[this.row.status],
                    type: 'warning'
                });
            }

        },
        get_address() {
            this.request({
                url: `/shop/returnAddress/list?pageNum=1&pageSize=1000`,
                // method:'POST',
            }).then(res => {
                if (res && res.rows) {
                    this.address_list = res.rows;
                }
            });
        },
        get_goods() {
           
            this.request({
                url: `/shop/returnOrder/getGoods?id=${this.row.id}`
            }).then(res => {
                if (res && res.goods) {
                    this.goods = res.goods;
                    this.order = res.order;

                    if(res.sku){
                        this.sku = res.sku;
                        res.goods.headPortrait = res.sku.pic;
                    }else{
                        this.sku = null;
                    }
                }
            });
        },
    }
}
</script>

<style>
.mt-10 {
    margin-top: 10px;
}
</style>