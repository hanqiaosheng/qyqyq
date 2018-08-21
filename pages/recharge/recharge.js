// pages/recharge/recharge.js
const app = getApp();
import { sendRequest } from '../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navber: [{
      id:1,
      num:50
    }, {
      id:2,
      num: 100
      }, {
        id:3,
        num: 150
    }, {
      id:4,
      num: 200
    }],
    currentTop: 1,
    num:50,
  },
  navbarTap: function (e) {
    let mark = {}
    this.data.navber.map((ele) => {
      if (ele.id == e.currentTarget.dataset.idx)
        mark = ele
    })
   
    this.setData({
      currentTop: e.currentTarget.dataset.idx,
      num:mark.num
    })
    console.log(this.data.num)
  },
  /* 支付  */
  formSubmit: function (openid) {
    var that = this
    wx.showModal({
      title: '',
      content: '充值后该金额不可退款！',
      success(res){
        if (res.confirm){
          wx.showLoading({
            title: '正在处理中'
          })
          sendRequest('/pay/addRecharge.action', {
            rechargeMoney: that.data.num,
            isQuanYu: 1,
            flag: 2 
          }, res => {
            if (res.data.state == 1) {
              let option = res.data;
              console.log(option)
              wx.requestPayment({
                'timeStamp': option.timeStamp,
                'nonceStr': option.nonceStr,
                'package': option.package,
                'signType': option.signType,
                'paySign': option.paySign,
                'success': function (res) {
                  wx.hideLoading()
                  //const bikeCode = that.data.bikeCode
                 wx.navigateBack({
                   delta:1
                 })


                },
                'fail': function (res) {
                  wx.hideLoading()
                }
              })
            } else {
              wx.showModal({
                title: '',
                content: res.data.msg,
              })
            }

          })
        }
      }
    })



  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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