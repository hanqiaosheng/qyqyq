// pages/wallet/wallet.js
const app = getApp();
import { sendRequest } from '../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCancel: false,
    isVip:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    sendRequest('/account/wallet.action', {}, res => {
      if (res.data.code == 1) {
        this.setData({
          isVip: res.data.isVip,
          couponCount: res.data.couponCount,
          accountDeposit: res.data.account.accountDeposit,
          accountAvailableBalance: res.data.account.accountAvailableBalance
        })
        console.log(res.data)
        wx.hideLoading()
      }
    })
  },


  //退款
  refund() {
    sendRequest('/pay/toRefund.action', {isQuanYu:1}, res => {
      console.log(res.data)
      if(res.data.code==1){
        this.setData({
          accountDeposit:0
        })
        wx.showModal({
          title: '',
          content: res.data.message,
          showCancel: false
        })
      }else{
        wx.showModal({
          title: '',
          content: res.data.message,
          showCancel: false
        })
      }

    })
  },
  //跳转充值
  goRecharge(){
    wx.navigateTo({ 
      url: "/pages/recharge/recharge?accountAvailableBalance=" + this.data.accountAvailableBalance + "&isVip=" + this.data.isVip
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
  onShareAppMessage: function () {
  
  }
})