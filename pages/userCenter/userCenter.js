// pages/userCenter/userCenter.js
const app =getApp();
import {sendRequest} from '../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowBtn:false,
    telPhone: app.globalData.tel,
    isVip:true,
    creditNum:1313
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var phoneNum=wx.getStorageSync("phoneNum")
    // this.setData({
    //   phoneNum: phoneNum
    // })
  },
  gocredit(){
    wx.navigateTo({
      url: "/pages/information/information?creditNum=" + this.data.creditNum + "&phoneNum=" + this.data.phoneNum + "&userTotalGrade=" + this.data.userTotalGrade
    })
  },

  phoneCall(){
    wx.makePhoneCall({
      phoneNumber: app.globalData.tel //仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    sendRequest('/user/userPage.action',{},res=>{
      if(res.data.code == 1){
        this.setData({
          isVip:res.data.data.isVip,
           phoneNum: res.data.data.user.userTel,
           userRealname: res.data.data.user.userRealname,
           userTotalGrade: res.data.data.user.userTotalGrade
        })
        console.log(res.data.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '全域骑游，骑遍全球；一起随风骑游吧',
      path: '/pages/index/index',
      imageUrl: '../image/share.jpg',
      success: function (res) {
        console.log(res)
        wx.showToast({
          title: '分享成功 ',
        })
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
        wx.showToast({
          title: '分享成功失败',
        })
      }
    }
  }
})