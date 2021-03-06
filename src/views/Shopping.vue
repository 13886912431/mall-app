<template>
    <div class="shopping-wrapper">
        <van-nav-bar
            title="购物车"
            left-text="返回"
            left-arrow
            fixed
            :right-text="rightText"
            @click-left="$router.transitionBack()"
            @click-right="deleteChecked"
        />

        <div class="empty" v-if="shoppingGoods.length === 0">
            <img src="@/assets/img/shopping_bg.jpg" />
        </div>

        <van-checkbox-group v-else v-model="checkedGoods" ref="checkedGroup">
            <van-checkbox
                v-for="item in shoppingGoods"
                :key="item.id"
                :name="item.id"
            >
                <GoodsCard
                    v-bind="item"
                    :count="counterMap[item.id] || 0"
                    :useFly="true"
                    :confirmDelete="true"
                    @delete="deleteOneGoods"
                />
            </van-checkbox>
        </van-checkbox-group>

        <van-submit-bar :price="totalPrice * 100" :button-text="`去结算(${totalCount})`" @submit="onSubmit">
            <van-checkbox v-model="allChecked">全选</van-checkbox>
        </van-submit-bar>

        <Tabbar :active="2" />
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import api from "@/api";

export default {
    data() {
        return {
            checkedGoods: [],
            shoppingGoods: [],
        }
    },
    computed: {
        ...mapState("goods", {
            counterMap: "counterMap"
        }),
        // 是否全选
        allChecked: {
            set(val) {
                val ? this.checkAll() : this.cancelAll();
            },
            get() {
                if (this.shoppingGoods.length === 0) return false;
                return this.shoppingGoods.length === this.checkedGoods.length;
            }
        },
        // 总商品数量
        totalCount() {
            const checkedGoodsData = this.shoppingGoods.filter(item => this.checkedGoods.includes(item.id));
            const count = checkedGoodsData.reduce((prev, item) => prev + (this.counterMap[item.id] || 0), 0);
            return count > 99 ? "99+" : count;
        },
        // 总价格
        totalPrice() {
            const checkedGoodsData = this.shoppingGoods.filter(item => this.checkedGoods.includes(item.id));
            return checkedGoodsData.reduce((prev, item) => prev + item.price * (this.counterMap[item.id] || 0), 0);
        },
        rightText() {
            return this.checkedGoods.length > 0 ? "删除" : "";
        }
    },
    methods: {
        ...mapMutations("goods", {
            changeCounterMap: "changeCounterMap"
        }),
        // 点击删除所选商品
        async deleteChecked() {
            try {
                await this.$dialog.confirm({
                    message: "您是否要删除已选中的商品?"
                })
                this.checkedGoods.forEach(id => this.deleteOneGoods(id));
            } catch (error) {}
        },
        // 提交订单
        onSubmit() {
            if (this.shoppingGoods.length === 0) return this.$toast("购物车里空空如也");
            if (this.checkedGoods.length === 0) return this.$toast("请先选择商品在结算吧");

            this.$toast.success("支付成功");
            this.checkedGoods.forEach(id => this.deleteOneGoods(id));
        }, 
        // 删除一个商品
        deleteOneGoods(id) {
            this.changeCounterMap({ id, count: 0 });
            this.shoppingGoods = this.shoppingGoods.filter(item => item.id !== id);
            this.checkedGoods = this.checkedGoods.filter(item => item !== id);
        },
        // 全选
        checkAll() {
            this.$refs.checkedGroup && this.$refs.checkedGroup.toggleAll(true);
        },
        // 取消全选
        cancelAll() {
            this.$refs.checkedGroup && this.$refs.checkedGroup.toggleAll(false);
        },
        async getShoppingGoods() {
            const res = await api.getGoodsByIds({
                value: Object.keys(this.counterMap).join()
            });
            this.shoppingGoods = res.list;
        }
    },
    created() {
        this.getShoppingGoods();
    },
}
</script>

<style lang="less" scoped>
.shopping-wrapper {
    background-color: #eee;
    padding-bottom: 100px;
    box-sizing: border-box;
    z-index: 3;
} 
.van-submit-bar {
    bottom: 50px;
}
.van-checkbox-group {
    background-color: #fff;
    padding: 46px 15px 0;
}
/deep/ .van-checkbox__label {
    flex: 1;
    min-width: 0;
}
.empty {
    padding: 46px 0 40px;
    background-color: #fff;
    img {
        width: 100%;
        max-width: 375px;
        display: block;
        margin: 0 auto;
    }
}
</style>