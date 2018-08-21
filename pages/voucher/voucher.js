// pages/voucher/voucher.js
var app = getApp();
var common = require("../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponState:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let param = decodeURIComponent(options.q);
    // let param = 'https://wechat.letulife.com/html/registFromGuide.html?groupId=0&couponSchemeId=38&couponState=2';
    wx.setStorageSync('param', param)
    if(param){
      let a = param.split("?")[1];
      let b = a.split('&')[0],
        c = a.split('&')[1],
        d = a.split('&')[2];
      let groupId = b.split('=')[1],
        couponSchemeId = c.split('=')[1],
        couponState = d.split('=')[1];
      wx.setStorageSync('groupId', groupId)
      wx.setStorageSync('couponSchemeId', couponSchemeId)
      wx.setStorageSync('couponState', couponState)
      this.setData({
        couponState: couponState
      })
    }
      console.log('qqqqweqweqweqeqwe', param) 
  },

  voucher:function(){
    common.sendRequest('/user/receiveCoupon.action', {
      groupId: wx.getStorageSync('groupId'),
      couponSchemeId: wx.getStorageSync('couponSchemeId'),
      couponState: wx.getStorageSync('couponState'),
    }, res => {
      console.log("......................", res.data)
      if(res.data.code == 1){
        wx.showModal({
          title: '',
          content: res.data.message,
          success:function(res){
            wx.removeStorageSync('param')
            wx.removeStorageSync('groupId')
            wx.removeStorageSync('couponSchemeId')
            wx.removeStorageSync('couponState')
              if(res.confirm){
                wx.reLaunch({
                  url: '/pages/index/index',
                })
              }
          }
        })
      }else{
        wx.showModal({
          title: '',
          content: res.data.message,
          success: function (res) {
            if (res.confirm) {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }
          }
        })
      }
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