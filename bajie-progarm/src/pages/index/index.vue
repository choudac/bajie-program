<template>
  <div >
    <div>
      <TopSwiper :tops = "tops"></TopSwiper>
    </div>
    <card :key="id" v-for="(product, id) in products" :product="product"></card>
  </div>
</template>

<script>
import card from '@/components/card'
import TopSwiper from '@/components/TopSwiper'
import {get} from '@/util'
export default {
  components: {
    TopSwiper,
    card
  },
  data () {
    return {
      products: [],
      images: [],
      tops: [
        {
          image: 'https://ws3.sinaimg.cn/large/006tNc79gy1fzpup3kcxsg304b04vq2x.gif',
          text: ' 诚 信 认 真 精 雕 细 琢'
        },
        {
          image: 'https://ws4.sinaimg.cn/large/006tNc79gy1fzs093ntu8j30m80l4gqo.jpg',
          text: '网 站、APP 小 程 序 开发'
        },
        {
          image: 'https://ws4.sinaimg.cn/large/006tNc79gy1fzpup3fch5g305k046745.gif',
          text: '为商店做个小程序，快人一步抢占先机'
        }
      ]
    }
  },

  methods: {
    async getList () {
      const products = await get('/weapp/productlist')
      this.products = products.list
      products.list.map((v) => {
        v.image = v.image.split(',')
      })
      this.images = products.list.image
    }
  },
  mounted () {
    this.getList()
    wx.showShareMenu()
  }

}
</script>

<style scoped>

</style>
