// pages/confirm2Trip/confirm2Trip.js
import { sendRequest, sendRequest2yb } from '../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bikeCode :'',
    rentPrice :'',
    startPlace :'',
    rentLongtime :'',
    startTime :'',
    insurancePrice:'',
    endTime :'',
    checkState:'', // 1、多退，2、少补
    payMoney:'',
    refund:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    const that = this;
  
    sendRequest('/bikeRent/checkRentState.action',{}, res => {
      if(res.data.code == 1) {
        const data = res.data.data;
        that.setData({
          lastPrice: options.lastPrice,
          bikeCode: options.bikeCode,
          rentPrice: (options.rentPrice * 100 + options.insurancePrice * 100)/100,
          startPlace: options.startPlace,
          startTime: options.startTime,
          endTime: options.endTime.split(' ')[1],
          endTimeWdate: options.endTime,
          payMoney:data.payMoney,
          insurancePrice: options.insurancePrice,
          checkState: data.checkState,
          rentLongtime: data.rideTime,
          refund: (options.deposite * 100 - data.payMoney *100)/100
        })

      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  saveOrder(){
    let param = {
      code: this.data.bikeCode,
      price: this.data.lastPrice,
      totalPrice: this.data.rentPrice,
      startTime: this.data.startTime,
      endTime: this.data.endTimeWdate
    }
    sendRequest2yb('/order/order/save', param)
  },
  cinfirmTrip() {
    const checkState = this.data.checkState,
          payMoneys = this.data.payMoney,
          that = this;
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    if (checkState == 1) {
      sendRequest('/pay/refundApplication.action', { payMoneys}, res => {
        that.saveOrder();
        wx.hideLoading()
        if (res.data.code == 1) {
          wx.showModal({
            title: '',
            content: '退款成功',
            success() {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        
        }
      })
    } else if (checkState == 2) {
      sendRequest('/bikeRent/payMoney.action', { payMoneys }, res => {
          let option = res.data;
          wx.requestPayment({
            'timeStamp': option.timeStamp,
            'nonceStr': option.nonceStr,
            'package': option.package,
            'signType': option.signType,
            'paySign': option.paySign,
            'success': function (res) {
              wx.showModal({
                title: '',
                content: '付款成功',
                success(){
                  wx.navigateBack({
                    delta: 1
                  })
                }
              })
           

             
            },
            'fail': function (res) {
              wx.hideLoading()
            }

        })
        
      })
    }

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