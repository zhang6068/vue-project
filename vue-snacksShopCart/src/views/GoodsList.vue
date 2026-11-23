<!-- 商城页面 -->
<template>
    <div class="goods-container">

      <!-- 商城标题组件 -->
      <!-- <MallHeader /> -->

      <!-- 轮播组件，传banner数据过去 -->
      <BannerSwiper :banners="bannerList" />

      <!-- 顶部搜索框 -->
      <div class="search-bar">
        <input type="text"
        v-model="keyword"
        placeholder="搜索商品名称..."
        class="search-input"
        >
      </div>

      <div class="goods-page" v-if="filteredList.length > 0">
        <div v-for="good in filteredList" :key="good.id" class="goods-card">
            <img :src="good.img" class="goods-img">
            <h3 class="goods-name">{{ good.name }}</h3>
            <div class="price">￥:{{ good.price }}</div>
            <button @click="addToCart(good)" class="add-btn">加入购物车</button>
        </div>
      </div>
      <!-- 无搜索结果 -->
      <div class="no-result" v-else>
        没有找到相关商品~
      </div>
    </div>
    
    
</template>

<script setup>
    import MallHeader from '@/components/MallHeader.vue';
    import BannerSwiper from '@/components/BannerSwiper.vue';
    import { goodsList } from '@/data/goods';
    const goods=goodsList

    // 导入pinia仓库
    import { useCartStore } from '@/stores/cart';
    import { computed, ref } from 'vue';
    const CartStore=useCartStore()

    

    function addToCart(good) {
        CartStore.addGoods(good);
        console.log("购物车现在的数据:",CartStore.cartList);
    }

    // 搜索关键字
    const keyword=ref('')

    //计算属性：根据关键字过滤商品
    const filteredList=computed(()=>{
        const kw=keyword.value.trim()
        if(!kw){
            return goodsList
        }
        return goodsList.filter(item=>{
            return item.name.includes(kw)
        })
    })

    // 轮播数据放在父组件
    const bannerList = ref([
    {
      img: '/img/swiper1.png',
      title: '新品零食上架'
    },
    {
      img: '/img/swiper2.png',
      title: '满减特惠进行中'
    },
    {
      img: '/img/swiper3.png',
      title: '精选饼干专区'
    }
  ])
</script>

<style scoped>
.goods-container {
  padding: 16px;
  padding-top: 20px;
  /* padding-left: 100px;
  padding-right: 100px; */
  /* 重点：留出底部空间，避开底部导航栏50px */
  padding-bottom: 60px;
  background-color: #f4f4f4;
}
.goods-page {
  display: grid;
  /* 一行4列 */
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.goods-card {
  background: #fff;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
}
.goods-img {
  /* width: 100%; */
  height: 250px;
  object-fit: cover;
  border-radius: 6px;
}
.goods-name {
  margin: 10px 0 6px;
  font-size: 16px;
  font-weight: normal;
}
.price {
color: #e53935;
  font-size: 18px;
  font-weight: bold;
  margin-bottom:12px;
}
.add-btn {
  border: 1px solid #ffd040;
  color: #cc9900;
  background: #fff;
  border-radius: 20px;
  padding: 6px 24px;
  cursor: pointer;
}
.add-btn:hover {
  background-color: #fff9e0;
}

/* 搜索框 */
.search-bar {
  margin-bottom: 16px;
}
.search-input {
  width: 100%;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 20px;
  padding: 0 16px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
  
}
.search-input:focus {
  border-color: #ff7d00;
}
.no-result {
  text-align: center;
  color: #999;
  margin-top: 60px;
}
</style>