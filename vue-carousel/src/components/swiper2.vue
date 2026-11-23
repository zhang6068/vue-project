<!-- 淡入淡出轮播 -->
<template>
    <div class="swiper" @mouseenter="stopPlay" @mouseleave="autoPlay">
        <div class="swiper-wrapper">
            <div class="swiper-slide"
                v-for="(item,index) in originalList"
                :class="{active:index===currentIndex}">
                    <img :src="item" class="swiper-img" :key="index" >
            </div>
        </div>

        <button class="swiper-btn prev" @click="prev">‹</button>
        <button class="swiper-btn next" @click="next">›</button>
        <div class="swiper-dots">
        <span
            v-for="(banner, index) in originalList"
            :key="index"
            class="dot"
            :class="{ active: index === currentIndex }"
            @click="goTo(index)"
        ></span>
        </div>
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

const currentIndex=ref(0)
let timer=null
function autoPlay() {
    stopPlay()
    timer=setInterval(()=>{
        currentIndex.value=(currentIndex.value+1)%originalList.value.length
    },3000)
}

function stopPlay() {
    if(timer){
        clearInterval(timer)
        timer=null
    }
}
const prev = () => {
  currentIndex.value = (currentIndex.value - 1 +originalList.value.length) % originalList.value.length
}
const next = () => {
  currentIndex.value = (currentIndex.value + 1) %  originalList.value.length
}
const goTo = (index) => {
  currentIndex.value = index
}
onMounted(()=>autoPlay())
onUnmounted(()=>stopPlay())
</script>

<style scoped>
.swiper{
    position: relative;
    width: 800px;
    height: 400px;
    overflow: hidden;
    margin: 100px auto;

}
.swiper-wrapper{
    width: 100%;
    height: 100%;
}
.swiper-slide{
    width: 800px;
    height: 400px;
    flex-shrink: 0; /*防止所有图片挤压一块 */
    opacity: 0;
    transition: opacity 0.6s ease-in-out;
    position: absolute;/**所有图片重叠在一个地方 */
}
.swiper-img{
    width: 100%;
    height: 100%;
    object-fit: cover;/* 图片按比例裁剪铺满，不会拉伸变形 */
    display: block;
}
.swiper-slide.active{
    opacity: 1;
    z-index: 1;
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