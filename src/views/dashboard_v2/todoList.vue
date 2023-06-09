<template>
    <div class="todoListBox">
        <div style="font-size:20px">待办事项</div>
        <div class="flex flex-x-b mt-20">
            <div class="flex flex-x-b flex-y-center todoItem" @click="$router.push({path:'/returnOrder'})">
                <div>
                    <div>退款申请</div>
                    <div class="mt-10 flex flex-y-center">
                        <div style="font-size:28px;font-weight:600;margin-right:10px;hieght:30px;line-height:31px" :style="{color:settings.theme}">{{ info.returnOrderNum }}</div>
                        <div style="hieght:30px;line-height:42px;">(条)</div>
                    </div>
                </div>
                <div class="el-icon-arrow-right" style="font-size:20px;"></div>
            </div>
            <div class="flex flex-x-b flex-y-center todoItem ml-20" @click="$router.push({path:'/order',query:{orderStatus:1}})">
                <div>
                    <div>待发货订单</div>
                    <div class="mt-10 flex flex-y-center">
                        <div style="font-size:28px;font-weight:600;margin-right:10px;hieght:30px;line-height:31px" :style="{color:settings.theme}">{{ info.waitDeliverOrderNum }}</div>
                        <div style="hieght:30px;line-height:42px;">(单)</div>
                    </div>
                </div>
                <div class="el-icon-arrow-right" style="font-size:20px;"></div>
            </div>
        </div>
        <div class="flex flex-x-b">
            <div class="flex flex-x-b flex-y-center todoItem" @click="$router.push({path:'/liveStore/apply',query:{auditStatus:0}})">
                <div>
                    <div>直播小店申请</div>
                    <div class="mt-10 flex flex-y-center">
                        <div style="font-size:28px;font-weight:600;margin-right:10px;hieght:30px;line-height:31px" :style="{color:settings.theme}">{{ info.liveStoreApplyNum }}</div>
                        <div style="hieght:30px;line-height:42px;">(条)</div>
                    </div>
                </div>
                <div class="el-icon-arrow-right" style="font-size:20px;"></div>
            </div>
            <div class="flex flex-x-b flex-y-center todoItem ml-20" @click="$router.push({path:'/order',query:{orderStatus:2}})">
                <div>
                    <div>待收货订单</div>
                    <div class="mt-10 flex flex-y-center">
                        <div style="font-size:28px;font-weight:600;margin-right:10px;hieght:30px;line-height:31px" :style="{color:settings.theme}">{{ info.waitReceivingOrderNum }}</div>
                        <div style="hieght:30px;line-height:42px;">(条)</div>
                    </div>
                </div>
                <div class="el-icon-arrow-right" style="font-size:20px;"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'TsshopAdminWebTodoList',

    data() {
        return {
            info:{}
        };
    },
    created() {
        this.getList()
    },
    computed: {
        ...mapState(['settings'])
    },

    methods: {
        getList() {
            this.request({url:'/shop/home/waitMatter'}).then(res => {
                if(res.code !== 200) return 
                this.info = res.data
            })
        }
    },
};
</script>

<style lang="scss" scoped>
.todoListBox {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    .todoItem {
        background-color: #f7f9fc;
        border-radius:5px;
        padding: 30px;
        width: 50%;
        margin-bottom: 20px;
        cursor: pointer;
    }
}
</style>