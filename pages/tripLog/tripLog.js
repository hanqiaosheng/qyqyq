// pages/tripLog/tripLog.js
import { formatTime } from '../../utils/utils.js'

import { sendRequest } from '../common.js'
Page({

  /**
   * 页面的初始数据
   */

  data: {
    infoList:[],
    pageIndex:1,
    showLoadMore:false,
    pageIndex:1,
    totalPage:''
  },
  searchScrollLower() {
  
    let pageIndex = this.data.pageIndex;
    if (pageIndex < this.data.totalPage) {
 
      this.setData({
        showLoadMore: true,
        pageIndex: ++pageIndex
      })
      console.log(this.data.showLoadMore)
      sendRequest('/user/userRentInfo.action', { pageIndex: this.data.pageIndex}, res => {
        if(res.data.code == 1) {
          
          this.setData({
            infoList: this.data.infoList.concat(res.data.data.rentInfoList),
            showLoadMore: false,

          })
          console.log(this.data.infoList)
        }
      })
    } else {
      wx.showToast({
        title: '没有更多了',
      })

    } 
  
   

   
  },
  scroll(){
  //  console.log(2)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let pageIndex = this.data.pageIndex;
    sendRequest('/user/userRentInfo.action', { pageIndex},res =>{
      if (res.data.code == 1) {
        that.setData({
          infoList: res.data.data.rentInfoList,
          totalPage: res.data.data.totalPage
        })
      }
      console.log(that.data)
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