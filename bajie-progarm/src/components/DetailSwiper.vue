
    
<template>
  <div class="container">
    <div class="box"> 
        <img class="backgroundImg" src="https://ws1.sinaimg.cn/large/006tKfTcgy1g0k6xz41dhj30cg0pujsl.jpg"/>
    <swiper class="swiper-box"
            @change="swiperChange">
      <swiper-item class="swiper-item"
                   v-for="(img,index) in tops"
                   :key="index">
        <image mode="aspectFit"
               :src="img"
               class="swiper-image"
               :class="swiperIndex===index?'active':''" />
      </swiper-item>
    </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tops'],
  data () {
    return {
      swiperIndex: 0
    }
  },
  methods: {
    swiperChange (e) {
      this.swiperIndex = e.mp.detail.current
    }
  }
}
</script>

<style scoped>
.box{
  position: relative;
}
.backgroundImg{  
  height: 1390rpx;
  width: 674rpx;
}
/* 滑动容器的样式 */
.swiper-box {
  margin: 0px auto;
  border-radius: 5px;
  height: 999rpx;
  width: 565rpx;
  position: absolute;
  top: 11%;
  left: 12.6%;
}
/* 滑动容器item的样式 */
.swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: visible;
}
/* 滑动容器图片的样式 */
.swiper-image {
  margin: 0rpx auto;
  height: 800rpx;
  width: 454rpx;
  border-radius: 5px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
  z-index: -1;
}
/* 激活状态下的样式 */
.active {
  transform: scale(1.25);
  transition: all 0.5s ease-in 0s;
  z-index: 1;
}
</style>