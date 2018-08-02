// pages/voucherye/voucherye.js
var app = getApp();
var utils = require("../../utils/utils.js")
var common = require("../common.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navber: ["优惠券", "骑行卷"],
    currentTop: 0,
    topTenList: [],
  },

  navbarTap: function (e) {
    this.setData({
      currentTop: e.currentTarget.dataset.idx
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imagered = app.globalData.ybdcUrl+'/red.png' ;
    let noimagered = app.globalData.ybdcUrl +'/nored.png' ;
    let imageyoll = app.globalData.ybdcUrl +'/yellow.png' ;
    let noimageyoll = app.globalData.ybdcUrl +'/noyellow.png' ;

    this.setData({
      imagered: imagered,
      noimagered: noimagered,
      imageyoll: imageyoll,
      noimageyoll: noimageyoll,
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
    wx.showLoading({
      title: '加载中...',
    })
    common.sendRequest('/account/coupon.action', {}, res => {
      if (res.data.code = 1) {
        if (res.data.userCoupon){
          res.data.userCoupon.forEach(function (v, i) {
            var d = new Date()
            var b= new Date()
            d.setTime(v.uCreateTime)
            b.setTime(v.uRedeemCodeEndTime)
            v.codeEndTime = utils.formatTimeDay(b)
            v.CreateTime = utils.formatTimeDay(d)
          })
        }

        if (res.data.rideCoupon){
          res.data.rideCoupon.forEach(function (v, i) {
            var d = new Date()
            d.setTime(v.createTime)
            d.setTime(v.endTime)
            v.qiendTime = utils.formatTimeDay(d)
            v.ucreateTime = utils.formatTimeDay(d)
          })
        }

this.setData({
  rideCoupon: res.data.rideCoupon,
  userCoupon: res.data.userCoupon,
})
        wx.hideLoading()
      } else {
        wx.showToast({
          title: '' + res.data.message
        })
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
  onShareAppMessage: function () {
  
  }
})