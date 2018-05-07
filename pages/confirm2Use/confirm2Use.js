// pages/confirm2Use/confirm2Use.js
const app = getApp()
import {sendRequest} from '../common.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

    bikeCode: '',
    lastPrice: ''

  },
 /**
   * 直接用车（判断蓝牙是否开启）
   */
  getBack(){
    wx.navigateBack({
      delta:2
    })
  },
  useBike(){
    let that = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log(JSON.stringify(res))
        wx.navigateTo({
          url: '../unlockWithBle/unlockWithBle?delta=2',
        })
      },
      fail(res) {
        wx.showModal({
          title: '',
          content: '请开启系统蓝牙',
        })
      },
      complete(res) {

      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const rentOption = app.globalData.rentOption;
    const bikeCode = rentOption.bikeCode;
    const lastPrice = rentOption.rentPriceOption == 1 ? `${rentOption.lastPrice}元/小时` : `${rentOption.lastPrice}元/半小时` 
    this.setData({
      bikeCode,
      lastPrice
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