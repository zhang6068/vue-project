<template>
  <div class="mall-header">
    <div class="mall-title">
      <span class="mall-logo">🍪</span>
      <h1>零食优选商城</h1>
    </div>
    <p class="mall-subtitle">精选美味 · 每日上新</p>
  </div>
</template>

<style scoped>
.mall-header {
  background: linear-gradient(135deg, #ff7d00, #ffb066);
  color: #fff;
  padding: 24px 28px;
  border-radius: 16px;
  margin-bottom: 20px;
  box-shadow: 0 8px 20px rgba(255, 125, 0, 0.25);
}

.mall-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mall-logo {
  font-size: 30px;
}

.mall-title h1 {
  font-size: 26px;
  margin: 0;
  font-weight: bold;
  letter-spacing: 1px;
}

.mall-subtitle {
  margin: 6px 0 0 42px;
  font-size: 14px;
  opacity: 0.9;
}
</style>
