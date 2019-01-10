<template>
  <div class="container">
     <div class="userinfo">
       <p> {{ userinfo.openId }} </p>
       <img :src="userinfo.avatarUrl" alt="">
       <p>{{ userinfo.nickName }}</p>
     </div>

     <YearProgress></YearProgress>
     <button v-if='userinfo.openId' @click='scanBook' class='btn'>添加图书</button>
     <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import {showSuccess, post, showModal} from '@/util'
import config from '@/config'
import YearProgress from '@/components/YearProgress'

export default {
  components: {
    YearProgress
  },

  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      }
    }
  },
  methods: {
    loginSuccess (res) {
      showSuccess('登录成功')
      wx.setStorageSync('userinfo', res)
      this.userinfo = res
    },
    login () {
      wx.showToast({
        title: '登录中',
        icon: 'loading',
        duration: 3000
      })
      qcloud.setLoginUrl(config.loginUrl)
      const session = qcloud.Session.get()
      if (session) {
        qcloud.loginWithCode({
          success: res => {
            console.log('没过期的登录', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.error(err)
          }
        })
      } else {
        qcloud.login({
          success: res => {
            console.log('登录成功', res)
            this.loginSuccess(res)
          },
          fail: err => {
            console.log('A')
            console.error(err)
          }
        })
      }
    },

    async addBook (isbn) {
      console.log(isbn)
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      showModal('添加成功', `${res.title}添加功成`)
    },

    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    }
  },

  onShow () {
    wx.showShareMenu()
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss'>

.container{
   padding: 0 30rpx;
  

}
 .userinfo{
     margin-top: 100rpx;
     text-align: center;
     img {
       width: 128rpx;
       height: 128rpx;
       margin: 20rpx;
       border-radius: 50%
     }
   }

</style>
