// unlock.js
//获取应用实例
var app = getApp()
import {
  bleUtils
} from '../../utils/bleUtils.js'
import {
  sendRequest
} from '../common.js'
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
    bleKey: '',
    blePassword: '',
  },
  fun: function(num) {
    let that = this

    let timer = setInterval(function() {
      num++
      if (num >= 99) {
        clearInterval(timer)
      }
      that.setData({
        progress: num
      })
    }, 20)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      bikeState: options.bikeState,
    })
    const delta = options.delta;
    console.log(delta)
    let bleOptions = app.globalData.lockOption;
    let that = this,
      // mac = bleOptions.macAdd,
      // key = bleOptions.key, 
      // password = bleOptions.password,
      // bikeCode = app.globalData.rentOption.bikeCode;
      //再次开锁
      key = new Uint8Array(wx.getStorageSync('reskey').split(',').map(n => +n)),
      password = wx.getStorageSync('password'),
      mac = wx.getStorageSync('macAdd'),
      bikeCode = wx.getStorageSync('bikecode');
    if (delta == 1 && this.data.bikeState == 1) {
      let fun = that.fun(0);
      sendRequest("/bikeRent/continueBike.action", {
        rentInfoId: wx.getStorageSync('rentInfoId')
      }, res => {
        console.log("....", res.data.code)

        if (res.data.code == 1) {
          that.setData({
            progress: 100
          })
          wx.navigateBack({
            delta: 2
          })
        } else if (res.data.code == 0) {
          bleUtils.openLock(bikeCode, mac, key, password, this, () => {
            if (delta == 2) {
              wx.showLoading({
                title: '加载中...',
              })
              sendRequest('/bikeRent/rentBtn2.action', {
                bikeCode
              }, res => {
                wx.hideLoading()
                if (res.data.code == 6) {
                  wx.showModal({
                    title: '',
                    content: '' + res.data.message,
                  })
                } else if (res.data.code == 1) {
                  wx.navigateBack({
                    delta: 3
                  })
                } else {
                  wx.showModal({
                    title: '',
                    content: res.data.message,
                  })
                }
              })
            } else {
              wx.navigateBack({
                delta: 2
              })
            }
          }, ({
            msg
          }) => {
            wx.showModal({
              title: '',
              content: '' + msg,
              success() {
                wx.navigateBack({
                  delta: 2
                })
              }
            })
          });
        } else {
          clearInterval(fun)
          that.setData({
            progress: 99
          })
          wx.showModal({
            title: '',
            content: '开锁失败',
          })
        }
        console.log(res.data)
      })
    }



    //扫码开锁

    if (this.data.bikeState == 1) {
      that.fun(0)
      if (delta == 2) {
        sendRequest('/bikeRent/rentBtn.action', {
          bikeCode
        }, res => {

          if (res.data.code == 6) {
            that.setData({
              progress: 99
            })
            wx.showModal({
              title: '',
              content: '' + res.data.message,
            })
          } else if (res.data.code == 1) {
            that.setData({
              progress: 100
            })
            wx.setStorageSync('rentInfoId', res.data.data.bikeRentInfo.rentInfoId)
            wx.navigateBack({
              delta: 3
            })
          } else if (res.data.code == 0) {
            sendRequest('/bikeRent/rentBtn2.action', {
              bikeCode
            }, res => {
              console.log("//////bikeRent/rentBtn2.action//////", res.data)
              let databikeRentInfo = res.data.data.bikeRentInfo
              this.setData({
                rentInfoId: databikeRentInfo.rentInfoId
              })
              wx.hideLoading()
              if (res.data.code == 6) {
                wx.showModal({
                  title: '',
                  content: '' + res.data.message,
                })
              } else if (res.data.code == 1) {
                bleUtils.openLock(bikeCode, mac, key, password, this, () => {
                  wx.navigateBack({
                    delta: 3
                  })
                }, ({
                  msg
                }) => {
                    console.log("订单id", this.data.rentInfoId)
                    sendRequest('/bikeRent/delRentInfo.action', {
                      rentInfoId: this.data.rentInfoId
                    }, res => {
                      console.log("....", res.data)
                      if (res.data.code == 1) {
                        wx.showModal({
                          title: '',
                          content: '' + msg,
                          success() {
                            wx.navigateBack({
                              delta: 2
                            })
                          }
                        })
                      }
                    });

                  })
              } else {
                wx.showModal({
                  title: '',
                  content: res.data.message,
                })
              }
            })
          } else {
            this.setData({
              progress: 99
            })
            wx.showModal({
              title: '',
              content: res.data.message,
              showCancel: false,
            })
          }
        })
      }

    } else {
      // bleUtils.openLock(bikeCode, mac, key, password, this, () => {
      if (delta == 2) {
        wx.showLoading({
          title: '加载中...',
        })
        sendRequest('/bikeRent/rentBtn2.action', {
          bikeCode
        }, res => {
          console.log("//////bikeRent/rentBtn2.action//////", res.data)
          let databikeRentInfo = res.data.data.bikeRentInfo
          this.setData({
            rentInfoId: databikeRentInfo.rentInfoId
          })
          wx.hideLoading()
          if (res.data.code == 6) {
            wx.showModal({
              title: '',
              content: '' + res.data.message,
            })
          } else if (res.data.code == 1) {
            bleUtils.openLock(bikeCode, mac, key, password, this, () => {
              wx.navigateBack({
                delta: 3
              })
            }, ({
              msg
            }) => {
              console.log("订单id", this.data.rentInfoId)
              sendRequest('/bikeRent/delRentInfo.action', {
                rentInfoId: this.data.rentInfoId
              }, res => {
                console.log("....", res.data)
                if (res.data.code == 1) {
                  wx.showModal({
                    title: '',
                    content: '' + msg,
                    success() {
                      wx.navigateBack({
                        delta: 2
                      })
                    }
                  })
                }
              });

            })
          } else {
            wx.showModal({
              title: '',
              content: res.data.message,
            })
          }
        })
      }else if(delta==1){
        bleUtils.openLock(bikeCode, mac, key, password, this, () => {
          wx.navigateBack({
            delta: 3
          })
        }, ({
          msg
        }) => {
          wx.showModal({
            title: '',
            content: '' + msg,
            success() {
              wx.navigateBack({
                delta: 2
              })
            }
          })

          })
      }  else {
        wx.navigateBack({
          delta: 2
        })
      }
      // }, ({
      //   msg
      // }) => {
      //   wx.showModal({
      //     title: '',
      //     content: '' + msg,
      //     success() {
      //       wx.navigateBack({
      //         delta: 2
      //       })
      //     }
      //   })
      // });
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

    return;
  },
  onShareAppMessage: function(res) {
    return {
      title: '全域骑游，骑遍全球；一起随风骑游吧',
      path: '/pages/index/index',
      imageUrl: '../image/share.jpg',
      success: function(res) {
        console.log(res)
        wx.showToast({
          title: '分享成功 ',
        })
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: '分享成功失败',
        })
      }
    }
  }



})