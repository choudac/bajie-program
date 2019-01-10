<template>
  <div class="container">
    <CommentList  v-if="userinfo.openId"
                  type="user" 
                  :comments="comments"
                  >
    </CommentList>
    <div v-if="userinfo.openId">
      <div class="page-title"> 我的图书 </div>
      <card v-for="book in books"
            :key="book.id"
            :book='book'
            >
      </card>
      <div v-if="!books.length">暂时没有添加过图书，赶紧去上传吧</div>
    </div>

  </div>
</template>

<script>
 import {get} from '@/util'
 import card from '@/components/card'
 import CommentList from '@/components/CommentList'
export default {
   data () {
     return {
       comments: [],
       books: [],
       userinfo: {}
     }
   },
   components: {
     CommentList,
     card
   },
   methods: {
     init () {
       wx.showNavigationBarLoading()
       this.getComments()
       this.getBooks()
       wx.hideNavigationBarLoading()
     },
     async getBooks () {
       const books = await get('/weapp/booklist', {
         openid: this.userinfo.openId
       })
       this.books = books.list
     },
     async getComments () {
       const comments = await get('/weapp/commentlist', {
         openid: this.userinfo.openId
       })
       this.comments = comments.list
     }
   },
   onPullDownRefresh () {
     this.init()
     wx.stopPullDownRefresh()
   },
   onShow () {
     if (!this.userinfo.openId) {
       let userinfo = wx.getStorageSync('userinfo')
       if (userinfo) {
         this.userinfo = userinfo
         this.init()
       }
     }
   }
}
</script>

<style>

</style>
