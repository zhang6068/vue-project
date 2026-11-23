<template>
  <div class="swiper" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <div class="swiper-wrapper">
      <div
        v-for="(banner, index) in banners"
        :key="index"
        class="swiper-slide"
        :class="{ active: index === currentIndex }"
      >
        <img :src="banner.img" :alt="banner.title" class="banner-img" />
        <div class="banner-mask">
          <!-- <span class="banner-title">{{ banner.title }}</span> -->
        </div>
      </div>
    </div>

    <button class="swiper-btn prev" @click="prev">‹</button>
    <button class="swiper-btn next" @click="next">›</button>

    <div class="swiper-dots">
      <span
        v-for="(banner, index) in banners"
        :key="index"
        class="dot"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 接收父组件传进来的轮播数组
const props = defineProps({
  banners: {
    type: Array,
    required: true
  }
})

const currentIndex = ref(0)
let timer = null

const startAutoPlay = () => {
  stopAutoPlay()
  timer = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % props.banners.length
  }, 3000)
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const prev = () => {
  currentIndex.value = (currentIndex.value - 1 + props.banners.length) % props.banners.length
}
const next = () => {
  currentIndex.value = (currentIndex.value + 1) % props.banners.length
}
const goTo = (index) => {
  currentIndex.value = index
}

onMounted(() => startAutoPlay())
onUnmounted(() => stopAutoPlay())
</script>

<style scoped>
.swiper {
  position: relative;
  /* width: 100%; */
  height: 450px;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 24px;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
}

.swiper-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
}

.swiper-slide {
  min-width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.6s ease-in-out;
  position: absolute;
}
.swiper-slide.active {
  opacity: 1;
  z-index: 1;
}

.banner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display:block;
}
.banner-mask {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 20px 28px;
  background: linear-gradient(to top, rgba(0,0,0,0.45), rgba(0,0,0,0));
  color: #fff;
}
.banner-title {
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 1px;
}

.swiper-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.75);
  border: none;
  font-size: 22px;
  cursor: pointer;
  color: #333;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.swiper-btn:hover {
  background: #fff;
}
.swiper-btn.prev { left: 16px; }
.swiper-btn.next { right: 16px; }

.swiper-dots {
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s;
}
.dot.active {
  background: #ff7d00;
  width: 28px;
  border-radius: 6px;
}
</style>
