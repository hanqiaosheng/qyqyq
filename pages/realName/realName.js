// pages/realName.js
var utiles = require("../../utils/utils.js");
var common = require("../common.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

    name:'',
    idCard:'',
    isBtnDisabled:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  bindKeyInput: function (e) {
    this.setData({
      name: e.detail.value
    })
    if (this.data.name.length > 1 && this.data.idCard.length >= 18 ){
      this.setData({ isBtnDisabled: false })
    }else {
      this.setData({ isBtnDisabled:true })
    }
 
  },
  bindKeyInput2: function (e) { 
    this.setData({
      idCard: e.detail.value
    })
    if (this.data.name.length > 1 && this.data.idCard.length >= 18) {
      this.setData({ isBtnDisabled: false })
    } else {
      this.setData({ isBtnDisabled: true })
    }
  },
  certification(){
    let personcard = this.data.idCard,
        realname = this.data.name;
    common.sendRequest('/user/certification.action', { personcard, realname},res => {
      console.log("000",res.data)
      if (res.data.code == 1) {   
        let param = wx.getStorageSync('param')  
        if (param){
          wx.redirectTo({
            url: '../voucher/voucher',
          }) 
        }else{
          wx.redirectTo({
            url: '../index/index',
          }) 
        }

      }else{
        wx.showToast({
          title: '' + res.data.message
        })
      }

    });
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