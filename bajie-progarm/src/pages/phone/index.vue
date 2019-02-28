
<template>
  <div class="container">
    <div class="top">
      <img class="slide-image" mode="aspectFit" src="https://ws2.sinaimg.cn/large/006tKfTcgy1g0j09832ygj306l06nabr.jpg" />
      <p class="text">有问题就问！ 小猪为你解答</p>
    </div>
    <div v-if="userinfo.openId" class="userinfo" >
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <div v-if="userinfo.openId === 'ooLS94rdzTcsLEhmk1jRb_vBKAGE'">
      <p class="p-text">上传产品</p>
      <textarea v-model='title'
                class='title-textarea'
                :maxlength='100'
                placeholder='请输入标题(必填）'></textarea> 
      <textarea v-model='description'
                class='description-textarea'
                :maxlength='300'
                placeholder='请输入产品描述(300字内）'></textarea> 
        
      <button class="uploadImg" @click="uploadImg()">上传图片</button>
      <img @click="previewImg(index)" 
           v-for="(src,index) in urls" 
           :key="index" 
           :src="src" 
           class="img" 
           mode="aspectFit"
           />  
    
      <button @click='addProduct' class='btn'>提交</button>
    </div>
    <p class="p-text"> 添加客服QQ咨询：2823121298 </p>
    <p class="p-text" @click='makePhoneCall()'> 咨询电话：13435264446 </p>
    
    <button class="btn" open-type="contact" bindcontact="handleContact">微信客服</button>
    <button class='btn' open-type="getUserInfo" lang="zh_CN"  @getuserinfo="login">登陆</button>              
    
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import {post, showSuccess, showModal} from '@/util'
import config from '@/config'
import uploadImage from '../../utils/upload/uploadFile'
// import { formatTime } from '@/utils/index'

export default {

  data () {
    return {
      products: [],
      userinfo: {},
      avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
      nickName: '',
      id: '',
      urls: [],
      title: '',
      description: ''
    }
  },
  methods: {

    async addProduct () {
    // 上传到后台：产品ID， 产品图片， 产品标题， 产品描述。
      if (!this.title) {
        return
      }

      const data = {
        openid: this.userinfo.openId,
        id: this.id,
        image: this.urls.join(),
        title: this.title,
        description: this.description
      }
      try {
        await post('/weapp/addproduct', data)
        this.title = ''
        this.urls = []
        this.description = ''
      } catch (e) {
        showModal('失败', e.msg)
      }
      console.log(data)
    },

    uploadImg () { // 上传图片
      let that = this
      // var nowTime = formatTime(new Date())
      wx.chooseImage({
        count: that.max || 9,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          res.tempFilePaths.forEach(v => {
            uploadImage(v, 'cbb/',
              function (result) {
                console.log('======上传成功图片地址为：', result)
                that.urls.push(result)
                wx.hideLoading()
              }, function (result) {
                console.log('======上传失败======', result)
                wx.hideLoading()
              }
            )
            // that.urls.push(v)
          }
          )
          console.log(that.urls)
          that.$emit('choosed', {all: that.urls, currentUpload: res.tempFilePaths})
        }
      })
    },
    previewImg (index) { // 点击图片实现预览，删除
      let that = this
      wx.showActionSheet({
        itemList: ['预览', '删除'],
        success: function (res) {
          if (res.tapIndex === 0) {
            wx.previewImage({
              current: that.urls[index],
              urls: that.urls
            })
          } else {
            that.urls.splice(index, 1)
            that.$emit('delete', that.urls)
          }
        }
      })
    },

    makePhoneCall () { // 拨打电话
      wx.makePhoneCall({
        phoneNumber: '13435264446' // 仅为示例，并非真实的电话号码
      })
    },
    getClipboardDate () { // 复制文本
      wx.getClipboardData({
        data: 'chouda',
        success (res) {
          console.log(res.data)
        }
      })
    },

    loginSuccess (res) {
      showSuccess('登录成功')
      wx.setStorageSync('userinfo', res)
      this.userinfo = res
    },
    login () {
      wx.showToast({
        title: '请稍后...',
        icon: 'loading'
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
            console.error(err)
          }
        })
      }
    }
  },
  mounted () {
    wx.showShareMenu()
    this.id = this.$root.$mp.query.id // mpvue 获取后台自增ID。
    this.urls = this.srcs || []
  },
  onShow () {
    let userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  padding:0 30rpx;
  .top{
    border: 3px solid #8b7070;
    margin-top: 5rpx;
    border-radius:8px;
    .slide-image{
        width: 300rpx;
        height: 300rpx;
    }
    .text{
      width: 30%;
      font-size: 36rpx;
      position: absolute;
      right: 110rpx;
      top: 100rpx;
    }
}
  .title-textarea{
    padding:15rpx 30rpx;
    background-color: #fff;
    border: 4rpx solid #cccccc;
    width: 80%;
    height: 80rpx;
    margin: 40rpx;
  }
  .description-textarea{
    padding:15rpx 30rpx;
    background-color: #fff;
    border: 4rpx solid #cccccc;
    width: 80%;
    margin: 40rpx;
  }
  .img{
    margin: 20rpx;
    width: 300rpx;
    height: 300rpx;
  }
  .uploadImg{
    width: 200rpx;
    height: 100rpx;
  }
  .p-text{
    margin: 40rpx 60rpx;
  }
  .btn{
    margin: 60rpx auto;
    width: 40%;
    background-color: rgba(166, 240, 163, 0.8);
  }
}  
.userinfo{
  margin-top:100rpx;
  text-align:center;
  img{
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}
</style>
