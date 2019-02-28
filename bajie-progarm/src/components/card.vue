<template>
<a :href="detailUrl">
  <div class="product-card" v-if="product.image" >    
    <div class="detail">
      <div class="row text-primary">
        <div class="title">
          {{ product.title }} 
        </div>
      </div>
    </div>  
  <div class="thumb">
       <img :src="product.image[0]"
            class="img"
            mode="aspectFit"
            >
    </div>
  </div>
</a>
</template>

<script>
export default {
  props: ['product'],

  computed: {
    detailUrl () {
      // console.log(this.product.image[0])
      return '/pages/detail/main?id=' + this.product.id
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.product.image,
        urls: [this.product.image]
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.product-card {  
  border: 6rpx solid #cccccc;
  padding: 30rpx;
  overflow: hidden;
  margin: 90rpx;
  font-size: 14rpx;
  border-radius:40rpx;
  .thumb{
    margin: 0 auto;
    overflow: hidden;
    .img{
      max-width: 100%;
      max-height: 100%;
    }
  }
  .title{
    text-align: center;
    color: #666666;
    font-size: 20px;
  }
}
</style>
