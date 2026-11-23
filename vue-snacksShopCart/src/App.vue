<template>
  
  <!-- 路由出口，页面渲染在这里 -->
  <div class="page-wrap">
    <router-view />
  </div>

  <!-- 底部导航 -->
  <div class="tab-bar">
    <router-link to="/goods" class="tab-item">
      <div>商品</div>
    </router-link>
    <router-link to="/cart" class="tab-item">
      <div>购物车</div>
      <!-- 角标：数量大于0才显示 -->
      <span class="badge" v-if="cartStore.totalCount > 0">
        {{ cartStore.totalCount }}
      </span>
    </router-link>
  </div>

</template>

<script setup>


import { useCartStore } from './stores/cart';
const cartStore=useCartStore()

</script>

<style scoped>
.page-wrap {
  padding-bottom: 50px;
}

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background: #fff;
  border-top: 1px solid #eee;
}
.tab-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: #333;
  position: relative;
}
/* 路由激活高亮 */
.router-link-active {
  color: #ff7d00;
  font-weight: bold;
}
.badge {
  position: absolute;
  top: 6px;
  right: 50%;
  margin-right: -30px;
  background: red;
  color: white;
  font-size: 12px;
  padding: 1px 6px;
  border-radius: 10px;
}
</style>