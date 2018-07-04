var common = require("../common.js")
// login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    snsTime: 61, //短信发送间隔时间
    snsBtnText: '验证码',
    img_width: '',
    img_height: '',
    phoneNum: '',
    validation: '',
    btnLoading: false,
    captchaFlag: false, //是否可以获取验证码 默认false
    loginFlag: false, //是否可以登录Flag 默认false
    validation_btn_border: '#989898 1px solid',
    validation_btn_color: '#989898',
    login_btn_background: '#C0C0C0',

  },
  bindKeyInput: function(e) {
    // console.log(e.detail.value.length)
    // console.log(this.data.phoneNum.length)
    this.setData({
      phoneNum: e.detail.value
    })
    // if (e.detail.value.length == 3 && e.detail.value.length > this.data.phoneNum.length){
    //   this.setData({
    //     phoneNum: e.detail.value + ' ',
    //   })
    // } else if (e.detail.value.length == 8 && e.detail.value.length > this.data.phoneNum.length){
    //   this.setData({
    //     phoneNum: e.detail.value + ' ',
    //   })
    // } else if (e.detail.value.length>13){
    //   this.setData({
    //     phoneNum: e.detail.value.substr(0,13),
    //   })
    // }else{
    //   this.setData({
    //     phoneNum: e.detail.value,
    //   })
    // }
    if (e.detail.value.length >= 11) {
      this.setData({
        validation_btn_border: '#72C54D 1px solid',
        validation_btn_color: '#72C54D',
        login_btn_background: '#72C54D',
        captchaFlag: true
      })
      // if (this.data.validation.length >= 4){
      //   this.setData({
      //     login_btn_background: '#72C54D'
      //   })
      // }
    } else {
      this.setData({
        validation_btn_border: '#989898 1px solid',
        validation_btn_color: '#989898',
        login_btn_background: '#C0C0C0',
        captchaFlag: true
      })
    }
  },
  bindKeyInput2: function(e) {
    this.setData({
      validation: e.detail.value
    })
    if (this.data.validation.length >= 4 && this.data.phoneNum.length >= 11) {
      this.setData({
        login_btn_background: '#72C54D',
        loginFlag: true
      })
    } else {
      this.setData({
        login_btn_background: '#C0C0C0',
        loginFlag: false
      })
    }
  },
  goto() {
    wx.navigateTo({ //导航去主页
      url: '/pages/useProtocal/useProtocal'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {},

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

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
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
  },

  // 短信倒计时
  // snsCountdown: function(snsTime) {
  //   console.log(snsTime)
  //   var _this = this;
  //   snsTime--;
  //   var timer = setTimeout(() => {
  //     _this.setData({
  //       snsBtnText: "剩余 " + snsTime + " s"
  //     })
  //     _this.snsCountdown(snsTime);
  //   }, 1000)
  //   if (snsTime < 0) {
  //     _this.setData({
  //       captchaFlag: true,
  //       snsBtnText: "发送短信"
  //     })
  //     clearTimeout(timer);
  //     return;
  //   }

  // },
  /**
   * 获取验证码
   */
  getCaptcha: function() {
    var _this = this;
    this.setData({
      captchaFlag: false
    })
    var mobile = this.data.phoneNum.replace(/\s/g, ""); //去掉多余空格的手机号
    common.sendRequest("/user/msgCode.action", {
      phone: mobile
    }, (res) => {
      if (res.data.code == 1) {
        // _this.snsCountdown(_this.data.snsTime);
        wx.showToast({
          title: '验证码获取成功',
        })
      }else{
        wx.showToast({
          title: '验证码获取失败',
          icon:'none'
        })
      }
    })

    // if(flag){//请求获取验证码
    //   var param = {//请求参数
    //     url: url + "/captcha/get?mobile=" + mobile + "&type=1",//1代表注册登录
    //     header: header,
    //     method:"POST",
    //     success: function (data){
    //       if(data.data.status==1){//验证码发送成功!
    //         //TODO
    //       }else{
    //         console.log("fail");
    //       }
    //     },
    //     fail:function (data){
    //       console.log("fail");
    //     }
    //   };
    // //  wx.request(param);//发送请求
    // }
  },
  /**
   * 登录接口
   */
  // login:function (){
  //   let that = this;
  //   var app = getApp();
  //   var flag = this.data.loginFlag;// 是否可以登录标志
  //   var ybdcUrl = app.globalData.ybdcUrl;// 请求路径
  //   var header = app.globalData.header;// 请求头
  //   var mobile = this.data.phoneNum.replace(/\s/g, "");// 去掉多余空格的手机号
  //   var validation = this.data.validation;// 用户输入的验证码
  //   this.setData({
  //     loginFlag: !this.data.loginFlag,
  //     btnLoading:true,
  //     loginBtnText:'登录中...'
  //   })
  //   wx.login({
  //     success: function (res) {
  //       if(res.code){
  //         common.sendRequest("/user/regist.action", { telphone: mobile, telCode: validation, smallCode:res.code }, response => {
  //           console.log(response)
  //           if (response.data.code == 1) {
  //             wx.setStorageSync('token', response.data.data.token);

  //             wx.login({
  //               success(res){
  //                 common.sendRequest2yb('/user/weixinRegist', {
  //                   code: res.code,
  //                   phone: mobile,
  //                   verifCode: 123456
  //                 }, result => {
  //                   wx.setStorageSync('access_token', result.data.data.token);
  //                   wx.redirectTo({
  //                     url: '../realName/realName',
  //                   })
  //                 })
  //               }
  //             })
  //           }
  //           wx.showToast({
  //             title: '' + response.data.message,
  //           })
  //           that.setData({
  //             loginFlag: !that.data.loginFlag,
  //             btnLoading: false,
  //             loginBtnText: '注册'
  //           })

  //         })
  //       } else {
  //         wx.showToast({
  //           title: '获取用户登录态失败！' + res.errMsg,
  //           image: '../image/wallet_icon_wrong@3x.png',
  //         })
  //         wx.hideLoading();
  //       }
  //     }
  //   })

  // //  wx.request(param);//发送请求
  // }
  clear:function(){
    this.setData({
      phoneNum:''
    })
  },
  login: function() {
    var that = this
    var num = that.data.phoneNum
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/

   if(myreg.test(num)){
         that.getCaptcha()
     wx.navigateTo({
       url: '/pages/loginYan/loginYan?mobile=' + this.data.phoneNum,
     })
   }else{
     wx.showModal({
       title: '',
       content: '请输入正确的手机号！',
       showCancel:false,
       confirmText:'我已知晓'
     })
   }

  }
})