
<template>
    <div class="swiper">
        <swiper
           :indicator-dots='true'
           indicator-color='#8b7070'
           :autoplay='true'
           :interval='6000'
           :duration='1000'
           :circular='true'
        >
          <div :key='imgindex' v-for='(top,imgindex) in tops'>
              <swiper-item>
                  <img 
                    @click="imgHome(image)"
                    class="slide-image" 
                    mode="aspectFit" 
                    :src="top.image" 
                    >
                    <div class="text">
                      <span>{{ top.text }}</span>
                    </div>
              </swiper-item>
          </div>
        </swiper>
    </div>
</template>

<script>
export default {
  props: ['tops'],
  methods: {
    imgHome (item) {
      wx.navigateTo({
        url: '/pages/home/main?id=' + item.id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper{
    border: 3px solid #8b7070;
    margin-top: 5rpx;
    border-radius:8px;
    .slide-image{
        height: 90%;
        width: 90%;
        position: absolute;
        right: 180rpx;
        top: 10rpx;
    }
    .text{
      width: 30%;
      font-size: 36rpx;
      position: absolute;
      right: 110rpx;
      top: 50rpx;
    }
}
</style>
