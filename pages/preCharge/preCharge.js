// pages/preCharge/preCharge.js
const app = getApp();
import {sendRequest} from '../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deposite:'',
    lastPrice:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const rentOption = app.globalData.rentOption
    const isVip = rentOption.isVip;
    const deposite = rentOption.bikeDeposit;
    const priceList = rentOption.priceList;
    const rentPriceMax = rentOption.rentPriceMax;
    const lastPrice = rentOption.rentPriceOption == 1 ? `${rentOption.lastPrice}元/小时` : `${rentOption.lastPrice}元/半小时`;
    this.setData({
      isVip,
      deposite,
      lastPrice,
      priceList,
      rentPriceMax,
      rentPriceOption: rentOption.rentPriceOption,
    })
    console.log(deposite)
   
  },
  charge(){
    const that = this;
    wx.showLoading({
      title: '正在处理中'
    })
    sendRequest('/pay/addRecharge.action', { 
      rechargeMoney: this.data.deposite,
      flag: that.data.isVip ? 2 : 1,
      isQuanYu: 1
      }, res => {
        if(res.data.state == 1){
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
              wx.redirectTo({
                url: '../confirm2Use/confirm2Use',
              })


            },
            'fail': function (res) {
              wx.hideLoading()
            }
          })
        }else{
          wx.showModal({
            title: '',
            content: res.data.msg,
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