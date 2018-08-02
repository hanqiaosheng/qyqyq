// pages/loginYan/loginYan.js
var common = require("../common.js")
// login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
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
    time: 60,
    code: null,
    reget: false,
    topTips: false,
    code_isFocus: true,//控制input 聚焦
    code: [],
    focus_status: [],
    length: 0,//已经输入的长度
  },
  //验证码输入时获取验证码
  get_code(e) {
    var that = this;
    that.setData({
      code: e.detail.value
    });
    if (that.data.code.length >= 4 && that.data.phoneNum.length >= 11) {
      this.setData({
        login_btn_background: '#50CC99',
        loginFlag: true
      })
    } else {
      this.setData({
        login_btn_background: '#C0C0C0',
        loginFlag: false
      })
    }
    if (that.data.code.length == 0) {
      that.setData({
        focus_status: "1000"
      });
    }
    if (that.data.code.length == 1) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "0100"
      });
    }
    if (that.data.code.length == 2) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "0010"
      });
    }
    if (that.data.code.length == 3) {
      that.setData({
        length: e.detail.value.length,
        focus_status: "0001"
      });
    }
    if (that.data.code.length == 4) {
      that.setData({
        length: e.detail.value.length
      })
      console.log(that.data.code)
      //...
    }
  },

  set_Focus() { //聚焦input
    var that = this
    that.setData({
      code_isFocus: true
    })
  },


  //倒计时函数
  getCode: function (options) {
    var that = this;
    var currentTime = that.data.time
   var  interval = setInterval(function () {
      currentTime--;
      that.setData({
        time: currentTime
      })
      if (currentTime <= 0) {
        clearInterval(interval)
        that.setData({
          time: "",
          currentTime: 11,
          disabled: false,
          reget: true,//改变字体样式颜色
          currentTime: 61,
          disabled: false
        })
      }
    }, 1000)
  },
  bindKeyInput: function (e) {
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
    if (this.data.phoneNum.length >= 11) {
      this.setData({
        validation_btn_border: '#50CC99 1px solid',
        validation_btn_color: '#50CC99',
        login_btn_background: '#50CC99',
        captchaFlag: true
      })
      if (this.data.code.length >= 4){
        this.setData({
          login_btn_background: '#50CC99'
        })
      }
    } else {
      this.setData({
        validation_btn_border: '#989898 1px solid',
        validation_btn_color: '#989898',
        login_btn_background: '#C0C0C0',
        captchaFlag: true
      })
    }
  },
  bindKeyInput2: function (e) {
    this.setData({
      validation: e.detail.value
    })
    if (this.data.code.length >= 4 && this.data.phoneNum.length >= 11) {
      this.setData({
        login_btn_background: '#50CC99',
        loginFlag: true
      })
    } else {
      this.setData({
        login_btn_background: '#C0C0C0',
        loginFlag: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    this.set_Focus()
    this.getCode()
    this.setData({
      phoneNum: options.mobile,
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
  },

  // 短信倒计时
  // snsCountdown: function (snsTime) {
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
  getCaptcha: function () {
    var _this = this;
    this.setData({
      captchaFlag: false
    })
    var mobile = this.data.phoneNum.replace(/\s/g, ""); //去掉多余空格的手机号
    common.sendRequest("/user/msgCode.action", {
      phone: mobile
    }, (res) => {
      if (res.data.code == 1) {
        
        _this.setData({
          time:'60',
          reget: false
        })
        _this.getCode(_this.data.time);
        wx.showToast({
          title: '验证码获取成功',
        })
      } else {
        wx.showToast({
          title: '验证码获取失败',
          icon: 'none'
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
  login:function (){
    let that = this;
    var app = getApp();
    var flag = this.data.loginFlag;// 是否可以登录标志
    var ybdcUrl = app.globalData.ybdcUrl;// 请求路径
    var header = app.globalData.header;// 请求头
    var mobile = this.data.phoneNum.replace(/\s/g, "");// 去掉多余空格的手机号
    var validation = this.data.code;// 用户输入的验证码
    this.setData({
      loginFlag: !this.data.loginFlag,
      btnLoading:true,
      loginBtnText:'登录中...'
    })
    wx.login({
      success: function (res) {
        if(res.code){
          common.sendRequest("/user/regist.action", { 
            telphone: mobile, 
            telCode: validation, 
            smallCode: res.code,
             isQuanYu:1
             }, response => {
            console.log(response)
            if (response.data.code == 1) {
              wx.setStorageSync('token', response.data.data.token);
              wx.redirectTo({
                url: '../realName/realName',
              })
              // wx.login({
              //   success(res){
              //     common.sendRequest2yb('/user/weixinRegist', {
              //       code: res.code,
              //       phone: mobile,
              //       verifCode: 123456
              //     }, result => {
              //       wx.setStorageSync('access_token', result.data.data.token);
              //       wx.redirectTo({
              //         url: '../realName/realName',
              //       })
              //     })
              //   }
              // })
            }
            wx.showToast({
              title: '' + response.data.message,
            })
            that.setData({
              loginFlag: !that.data.loginFlag,
              btnLoading: false,
              loginBtnText: '注册'
            })

          })
        } else {
          wx.showToast({
            title: '获取用户登录态失败！' + res.errMsg,
            image: '../image/wallet_icon_wrong@3x.png',
          })
          wx.hideLoading();
        }
      }
    })

  //  wx.request(param);//发送请求
  },
})