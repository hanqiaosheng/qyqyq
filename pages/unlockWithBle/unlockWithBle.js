// unlock.js
//获取应用实例
var app = getApp()
import { bleUtils } from '../../utils/bleUtils.js' 
import { sendRequest} from '../common.js'
let connetTimeout = 0;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    macAdd: '',
    bleStatus: false,
    friendlyText: '开锁中，请稍等',
    progress: '0',
    connectedDeviceId: "", //已连接设备uuid  
    deviceId: '',
    bleDeviceId: '',
    bleKey:'',
    blePassword:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const delta = options.delta;
    console.log(delta)
    let bleOptions = app.globalData.lockOption;
    let that = this,
        mac = bleOptions.macAdd,
        key = bleOptions.key, 
        password = bleOptions.password,
        bikeCode = app.globalData.rentOption.bikeCode;
        bleUtils.openLock(bikeCode,mac, key, password,this,()=>{
          if (delta == 2) {
            sendRequest('/bikeRent/rentBtn.action', { bikeCode }, res => {
              if (res.data.code == 6) {
                wx.showModal({
                  title: '',
                  content: '' + res.data.message ,
                })
              } else if (res.data.code == 1) {
                wx.navigateBack({
                  delta:3
                })
              }
            })
          } else {
            wx.navigateBack({
              delta: 2
            })
          }
        },({msg}) => {
          wx.showModal({
            title: '',
            content: ''+msg,
            success(){
              wx.navigateBack({
                delta: 2
              })
            }
          })
        });
    //that.lanya1();


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

    return;
  },
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