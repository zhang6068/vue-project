<!-- 购物车页面 -->
<template>
  <div class="cart-page">
    <h2>我的购物车</h2>
    <div v-if="cartStore.cartList.length === 0" class="empty">
      购物车空空如也~
      <br />
      <router-link to="/goods">去选购商品</router-link>
    </div>

    <!-- 购物车列表 -->
    <div v-else class="cart-list">
      <div v-for="item in cartStore.cartList" :key="item.id" class="cart-item">
        <input
          type="checkbox"
          class="cart-check"
          :checked="item.checked"
          @change="cartStore.toggleCheck(item.id)"
        />

        <img :src="item.img" class="cart-img" />

        <div class="cart-info">
          <div class="cart-name">{{ item.name }}</div>
          <div class="cart-price">￥{{ item.price }}</div>
        </div>

        <div class="cart-count">
          <button @click="cartStore.changeCount(item.id, item.count - 1)">-</button>
          <span>{{ item.count }}</span>
          <button @click="cartStore.changeCount(item.id, item.count + 1)">+</button>
        </div>

        <button class="cart-delete" @click="cartStore.delGoods(item.id)">删除</button>
      </div>
    </div>

    <!-- 底部结算栏 -->
    <div class="cart-footer">
      <label class="select-all">
        <input
          type="checkbox"
          :checked="cartStore.isAllChecked"
          @change="cartStore.toggleAllCheck()"
          :disabled="cartStore.cartList.length===0"
        />
        <span>全选</span>
      </label>

      <div class="cart-total">
        合计：<span>￥{{ cartStore.totalPrice }}</span>
      </div>

      <button
        class="cart-settle"
        :disabled="cartStore.cartList.length === 0"
        @click="handleSettle"
      >
        结算
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()

const handleSettle = () => {
  cartStore.settle()
  alert('结算成功！')
}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 16px;
  padding-bottom: 80px;
  box-sizing: border-box;
}

.cart-page h2 {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: bold;
}

.empty {
  background: #fff;
  padding: 40px;
  text-align: center;
  border-radius: 10px;
  color: #666;
}

.empty a {
  color: #ff7d00;
  text-decoration: none;
  margin-top: 10px;
  display: inline-block;
}

/* 购物车列表 */
.cart-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 每一行商品 */
.cart-item {
  display: grid;
  grid-template-columns: 40px 80px 1fr 140px 80px;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 12px;
  padding: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.cart-check {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.cart-img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background: #f0f0f0;
}

.cart-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  min-width: 0;
}

.cart-name {
  font-size: 14px;
  color: #333;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cart-price {
  font-size: 16px;
  color: #e53935;
  font-weight: bold;
}

/* 数量控件 */
.cart-count {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
}

.cart-count button {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  font-size: 16px;
}

.cart-count button:first-child {
  border-radius: 6px 0 0 6px;
}

.cart-count button:last-child {
  border-radius: 0 6px 6px 0;
}

.cart-count span {
  width: 42px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  font-size: 14px;
  background: #fff;
}

/* 删除按钮 */
.cart-delete {
  border: none;
  background: #fff;
  color: #e53935;
  font-size: 13px;
  cursor: pointer;
  padding: 6px 0;
}

/* 底部结算栏 */
.cart-footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  background: #fff;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.06);
  border-top: 1px solid #eee;
}

.select-all {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
}

.select-all input {
  width: 18px;
  height: 18px;
}

.cart-total {
  font-size: 15px;
  color: #333;
}

.cart-total span {
  color: #e53935;
  font-weight: bold;
  font-size: 18px;
  margin-left: 4px;
}

.cart-settle {
  background: #ff7d00;
  color: #fff;
  border: none;
  padding: 10px 28px;
  border-radius: 24px;
  cursor: pointer;
  font-size: 15px;
}

.cart-settle:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
