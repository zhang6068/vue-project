# snackShopCart - 零食商城购物车

基于 Vue 3 + Vite 的商城购物车项目。

## 功能

- 商品列表页：轮播 Banner、搜索、商品展示、加入购物车
- 购物车页：数量增减、单选 / 全选、删除，实时计算总价与总件数
- 路由：`/goods` 商品列表、`/cart` 购物车，默认重定向到商品页
- Pinia 管理购物车状态，`pinia-plugin-persistedstate` 本地持久化

## 技术栈

Vue 3 · Vue Router · Pinia · pinia-plugin-persistedstate · Vite · vue-devtools

## 目录结构

```
src/
├── components/     # MallHeader 顶部导航、BannerSwiper 轮播图
├── views/          # GoodsList 商品列表、Cart 购物车、HomeView、AboutView
├── stores/         # Pinia cart store（总价/总数计算、增删、全选）
├── router/         # 路由配置
├── data/           # 商品数据 goods.js
└── main.js         # 应用入口：挂载 Vue、注册 router/pinia/持久化插件
```

## 运行

```bash
npm install
npm run dev
```

环境要求：Node.js `^22.18.0 || >=24.12.0`
