<!-- 横向平移轮播:自动轮播/左右切换播放 -->
<template>
  <div class="swiper-box"@mouseenter="stopPlay"@mouseleave="autoPlay">
    <div
      class="swiper-context"
      :style="{
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: isAnimate ? 'transform 0.6s ease' : 'none'
      }"
      @transitionend="handleTransitionEnd"
    >
      <div class="swiper-img" v-for="(item, index) in list" :key="index">
        <img :src="item" alt="" />
      </div>
    </div>

    <!-- 指示器圆点，只渲染原始图片数量 -->
    <div class="swiper-dots">
      <span
        class="dot"
        v-for="(_, index) in originalList"
        :key="index"
        :class="{ active: dotIndex === index }"
        @click="goTo(index)"
      ></span>
    </div>

    <button class="nextBtn" @click="next">></button>
    <button class="preBtn" @click="pre"><</button>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const originalList = ref([
  '/img/snack1.jpg',
  '/img/snack2.jpg',
  '/img/snack3.jpg',
  '/img/snack4.jpg',
  '/img/snack5.jpg',
  '/img/snack6.jpg',
  '/img/snack7.jpg',
  '/img/snack8.jpg'
])
const len = originalList.value.length

// 列表：最后追加第一张，实现向右无缝
const list = ref([...originalList.value, originalList.value[0]])

const currentIndex = ref(0)
// 圆点对应的真实下标（0 ~ len-1）
const dotIndex = ref(0)
const isAnimate = ref(true)
let timer = null
// 是否正在执行过渡/无缝复位
const isTransitioning = ref(false)

function autoPlay() {
  stopPlay()
  timer = setInterval(() => {
    next()
  }, 3000)
}

function stopPlay() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

// 过渡结束：处理无缝复位
function handleTransitionEnd() {
  isTransitioning.value = false//动画结束
  // 滑到追加的那张（最后一个），无动画切回 0
  if (currentIndex.value === list.value.length - 1) {
    isAnimate.value = false
    currentIndex.value = 0
    dotIndex.value = 0
    requestAnimationFrame(() => {
      isAnimate.value = true
    })
  }
}

function next() {
  // 动画中直接拦截，禁止叠加
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value++
  dotIndex.value = currentIndex.value % len
}

function pre() {
  if (isTransitioning.value) return
  isTransitioning.value = true
  if (currentIndex.value === 0) {
    // 在第 0 张，往左滑：无动画跳到倒数第二张（原始最后一张），再带动画往左
    isAnimate.value = false
    currentIndex.value = len
    requestAnimationFrame(() => {
      isAnimate.value = true
      currentIndex.value--
      dotIndex.value = len - 1
    })
  } else {
    currentIndex.value--
    dotIndex.value = currentIndex.value
  }
}

// 点击圆点跳转
function goTo(index) {
  if (isTransitioning.value) return
  isTransitioning.value = true
  currentIndex.value = index
  dotIndex.value = index
}

onMounted(() => autoPlay())
onUnmounted(() => stopPlay())
</script>

<style scoped>
.swiper-box {
  position: relative;
  width: 800px;
  height: 400px;
  overflow: hidden;
  margin: 100px auto;
}
.swiper-context {
  display: flex;
}
.swiper-img {
  width: 800px;
  height: 400px;
  flex-shrink: 0;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.swiper-dots {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
}
.dot {
  display: inline-block;
  height: 20px;
  width: 20px;
  background-color: red;
  margin-left: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
}
.dot.active {
  background-color: #d0eb3a;
  width: 30px;
}
.nextBtn,
.preBtn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #fbfbfc;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: none;
}
.nextBtn {
  right: 10px;
}
.preBtn {
  left: 10px;
}
</style>
