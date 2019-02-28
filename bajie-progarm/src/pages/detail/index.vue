<template>
    <div class="container"> 
      <!-- <img class="back"
         :src="imgUrl[0]" 
         mode="aspectFit"
      />
      <img 
         :src="imgUrl[0]" 
         mode="aspectFit"
      /> -->
    <div class="detailSwiper">
      <DetailSwiper :tops = "imgDetailUrl" ></DetailSwiper>
    </div>
     <div class="summary">
        <p > {{ productInfo.description}} </p>
     </div>
    <button class="btn-rigth" open-type="contact" bindcontact="handleContact">马上咨询</button>
    <button class="btn-left" @click="toHome()">首页</button>
</div>
</template> 

<script>
import {get} from '@/util'
import DetailSwiper from '@/components/DetailSwiper'

export default {
  components: {
    DetailSwiper
  },
  data () {
    return {
      productInfo: {},
      imgUrl: [],
      imgDetailUrl: []
    }
  },
  methods: {
    toHome () {
      wx.navigateBack({
        url: '/pages/home/main'
      })
    },
    async getDetail () {
      const info = await get('/weapp/productdetail', {id: this.productid})
      wx.setNavigationBarTitle({
        title: info[0].title
      })
      this.productInfo = info[0]
      this.imgUrl = this.productInfo.image.split(',')
      this.imgDetailUrl = this.imgUrl.slice(1)
    }
  },
  mounted () {
    this.productid = this.$root.$mp.query.id
    this.getDetail()
    wx.showShareMenu()
  }
}
</script>

<style lang="scss" scoped>
.container{
  .detailSwiper{ 
    text-align: center;
}
  .summary{
      padding: 0 40rpx 40rpx 40rpx;
      p{
        text-indent: 2em;
        font-size: 30rpx;
          }
      }
  .btn-left{
    margin: 10rpx;
    width: 20%;
  }
  .btn-rigth{
    margin: 10rpx;
    float: right;
    width: 75%;
    background-color: rgba(166, 240, 163, 0.8);
    border-radius:38rpx;
  }
}
</style>
