// pages/repair/repair.js
var app = getApp();
var common = require("../common.js");
var formData={}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    length:0,
    inputtext:'',
    position:[],
    checked:''
  },
  checkboxChange: function (e) {
    this.setData({
      position: e.detail.value,
    })
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
  },
    /**
   * 扫描获取车辆号
   */
  inputfun(e){
    this.setData({
      inputtext: e.detail.value,
    })
  },
imagefun(){
  wx.scanCode({
    onlyFromCamera: false,
    success: (res) => {
      let qrCode = res.result.split("=")[1];
      if (qrCode) {
       this.setData({
         inputtext: qrCode
       })
      } else {
        wx.showToast({
          title: '二维码错误',
        })
      }
    },
    fail: (res) => {
      wx.showToast({
        title: '二维码错误',
      })
    }
  })
},
  /**
   * 上传图片
   */

  chooseImage: function () {
    var that = this
    var pics = this.data.pics;
    wx.chooseImage({
      count: 3 - pics.length, 
      sizeType: ['compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        var imgsrc = res.tempFilePaths;
        pics = pics.concat(imgsrc);   
        if (pics.length <= 1) {
          that.setData({
            pics: pics
          });
          console.log(pics)
        }else{
          wx.showModal({
            content: '最多上传1张',
          })
        }

      },
    })
  },
    /**
   * 图片预览
   */
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  },

  inuputFun4: function (e) {
    this.setData({
      invoiceReceiveAddress: e.detail.value,
      length: e.detail.value.length
    });
  },

  formSubmit(e){
    formData={
      'bikeCode': this.data.inputtext,
      'position': this.data.position.toString(),
      'feedbackContent': this.data.invoiceReceiveAddress
    }
    this.upload() 
    console.log("kkkkkkk", formData)
  },
  upload:function() {
       wx.uploadFile({
         url: app.globalData.ybdcUrl + '/feedBack/subFeedBackApp.action',
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded' ,
			fromFlag: 3,
			token:wx.getStorageSync("token")
        },
         filePath: this.data.pics[0],
        name: 'file1',
        formData: formData,
     
        success: function (res) {
          if(res.data){
            wx.showModal({
              title: '',
              content: '反馈成功！',
              showCancel:false,
              success:function(res){
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            wx.showModal({
              title: '',
              content: '未查询到该车辆',
            })
          }
        },
        fail:function(){
          console.log("1")
        },
      })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imagexiangji = app.globalData.ybdcUrl + '/xiangji.png';
    this.setData({
      imagexiangji: imagexiangji
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