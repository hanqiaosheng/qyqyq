//获取应用实例
var app = getApp();
var utils = require("../../utils/utils.js")
var common = require("../common.js");
import {
  iLock
} from '../../utils/iLock.js'
import {
  bleUtils
} from '../../utils/bleUtils.js'
import {
  ab2hex
} from '../../utils/utils.js'
import {
  cmd
} from '../../utils/cmd.js'
var amapFile = require('../../lib/amap/amap-wx.js');

var amapFile = require('../../lib/amap/amap-wx.js');
var myAmapFun = new amapFile.AMapWX({
  key: getApp().globalData.amapKey
});
var timer;
Page({
  data: {
    text: "请在指定还车点还车；未在指定还车点还车，系统将持续扣费！",
    ismapno:false,
    isShow:false,
    //地图的宽高
    mapHeight: '100%',
    showTrip: false,
    mapWidth: '100%',
    mapTop: '0',
    unitPrice: '',
    insurancePrice: '',
    cardWidth: '0',
    scale: 19, // 地图的缩放层级
    cardLeft: 30, //计时框距离容器左边30rpx
    //isCanGetBikeList:true,
    isDeposit: false, // 是否低押
    needRelogin: false, // 是否需要重新登录
    markers: [],
    progress: '',
    //用户当前位置
    whiteButton: {
      pain: "",
      loading: "",
      hoverClass: "white-btn-",
      disabled: false
    },
    isIntrip: false,
    point: {
      lat: '',
      lon: ''
    },
    bicycleCode: '',
    currentRideTime: '',
    currentPay: '',
    startPlace: '',
    //已登录的地图组件
    controls: [],
    password: '',
    macAdd: '',
    key: '',
    noRidingcontrols: [ // 未骑行地图控件
      { // 定位按钮
        id: 1,
        position: {
          left: 40 * wx.getStorageSync("kScreenW"),
          top: 730 * wx.getStorageSync("kScreenH"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/home_icon_dingwei1.png',
        clickable: true,
      },
      { // 个人中心按钮
        id: 2,
        position: {
          left: 620 * wx.getStorageSync("kScreenW"),
          top: 730 * wx.getStorageSync("kScreenH"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/home_icon_mine1.png',
        clickable: true,
      },
      //扫码按钮

      {
        id: 3,
        position: {
          left: 175 * wx.getStorageSync("kScreenW"),
          top: 725 * wx.getStorageSync("kScreenH"),
          width: 420 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/index-bike-sao.png',
        clickable: true,
      },
      //中心坐标ICON
      {
        id: 4,
        position: {
          left: 370 * wx.getStorageSync("kScreenW") - 18 * wx.getStorageSync("kScreenW"),
          top: 420 * wx.getStorageSync("kScreenH") - 70 * wx.getStorageSync("kScreenW"),
          width: 36 * wx.getStorageSync("kScreenW"),
          height: 70 * wx.getStorageSync("kScreenW")

        },
        iconPath: '../image/home_icon_zhen.png',
        clickable: false,
      },
      { // 报修按钮
        id: 6,
        position: {
          left: 626 * wx.getStorageSync("kScreenW"),
          top: 1000 * 0.7 * wx.getStorageSync("kScreenH") - 100 * wx.getStorageSync("kScreenW"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/4.png',
        clickable: true,
      },
      { // 客服按钮
        id: 5,
        position: {
          left: 626 * wx.getStorageSync("kScreenW"),
          top: 860 * 0.7 * wx.getStorageSync("kScreenH") - 100 * wx.getStorageSync("kScreenW"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/home_icon_phone1.png',
        clickable: true,
      }, 
      //计价规则ICON
      {
        id: 7,
        position: {
          left: 40 * wx.getStorageSync("kScreenW"),
          top: 1000 * 0.7 * wx.getStorageSync("kScreenH") - 100 * wx.getStorageSync("kScreenW"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/1.png',
        clickable: true,
      },
    ],
    //没有登录的地图组件
    ridingControls: [{ // 客服按钮
      id: 5,
      position: {
        left: 626 * wx.getStorageSync("kScreenW"),
        top: 840 * 0.7 * wx.getStorageSync("kScreenH") - 100 * wx.getStorageSync("kScreenW"),
        width: 100 * wx.getStorageSync("kScreenW"),
        height: 100 * wx.getStorageSync("kScreenW")
      },
      iconPath: '../image/home_icon_phone1.png',
      clickable: true,
    }, 
      { // 报修按钮
        id: 6,
        position: {
          left: 626 * wx.getStorageSync("kScreenW"),
          top: 720 * 0.7 * wx.getStorageSync("kScreenH") - 100 * wx.getStorageSync("kScreenW"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/4.png',
        clickable: true,
      },
      { // 定位按钮
        id: 1,
        position: {
          left: 626 * wx.getStorageSync("kScreenW"),
          top: 600 * 0.7 * wx.getStorageSync("kScreenH") - 100 * wx.getStorageSync("kScreenW"),
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        },
        iconPath: '../image/home_icon_dingwei1.png',
        clickable: true,
      },
    ],
    polyline:[]

  },
  controltap(e) {
    const that = this;
    const id = e.controlId;
    let token = wx.getStorageSync("token")

    if (id == 1) { //定位接钮
      that.getUserCurrentLocation()
    } else if (id == 5) {
      wx.makePhoneCall({
        phoneNumber: app.globalData.tel //仅为示例，并非真实的电话号码
      })
    } else {
      if (!token) {

        common.wxLogin(() => {
          that.mapController(id);
        })
      } else {

        that.mapController(id);
      }

    }
  },
  checkBikeStatus(bikeCode, callback) {
    common.sendRequest('/bikeRent/checkBike.action', {
      bikeCode
    }, res => {
      if (res.data.code != 0) {
        callback(res.data)
      } else {
        wx.showModal({
          title: '',
          content:res.data.message,
        })

      }
    })
  },
  mapController(id) { //地图控件功能
    const that = this;
    if (id == 3) {
      wx.scanCode({
        onlyFromCamera: false,
        success: (res) => {
          // wx.showLoading({
          //   mask: true
          // })
          let point = that.data.point;
          let qrCode = res.result.split("=")[1];
          console.log("当前坐标", point)
    // wx.setStorageSync("bikeState", bikeState)
          wx.setStorageSync("bikecode", qrCode)
          if (qrCode) {
            let codeArr = qrCode.split('')
            if (codeArr[0] == 'y') {
              wx.navigateToMiniProgram({
                appId: 'wx0b30ad196e91fce4',
                envVersion: 'release',
                success(res) {
                  console.log("/////打开成功/////////////" )
                }
              })
            }else{
            
              that.scan2OpenLock(point.lat, point.lon, qrCode);
            }
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
    } else if (id == 2) {
      wx.navigateTo({
        url: '../userCenter/userCenter',
      })
    }else if(id == 6){
      wx.navigateTo({
        url: '../repair/repair',
      })
    }else if(id == 7){
      wx.navigateTo({
        url: '../picerule/picerule',
      })
    }
  },

  scan2OpenLock(lat, lon, qrCode) {
    let that = this;
    var param = {
      lon,
      lat,
      bikeCode: qrCode
    }
    common.sendRequest("/bikeRent/unlock.action", param, (res) => {
      console.log("|||||||||||||||||||||||||||||||||||||||||||||",res.data)
      if (res.data.data.success) {
        let data = res.data.data,
          bikeState = data.bikeState,
          password = data.pass.split(',').map(n => +n),
          macAdd = data.mac,
          key = new Uint8Array(data.key.split(',').map(n => +n));
         wx.setStorageSync("bikeState", bikeState)
        wx.setStorageSync("password", password)
        wx.setStorageSync("macAdd", macAdd)
        wx.setStorageSync("reskey", data.key)
        app.globalData.lockOption = {
          password,
          macAdd,
          key,
          bikeState
        }
        this.setData({
          password,
          macAdd,
          key,
          bikeState
        })
        that.checkBikeStatus(qrCode, ({
          code,
          data
        }) => {
          app.globalData.rentOption = {
            bikeDeposit: data.bikeDeposit,//预付款
            bikeCode: data.bike.bikeCode,//
            rentPriceOption: data.models.modelRentPrice.rentPriceOption,//1代表单位是一小时  2代表单位是半小时
            lastPrice: data.models.modelRentPrice.lastPrice,//代表最后时段 20元/单位
            bikeAddress: data.bike.bikeAddress,//景区名
            modelsName: data.models.modelsName,//车类型
            accountAvailableBalance: data.account.accountAvailableBalance,//余额 (会员的余额)
            priceList: data.models.modelRentPrice.priceList,//收费标准
            rentPriceMax: data.models.modelRentPrice.rentPriceMax,//封顶费用(元/天)
            isVip: data.isVip
          }
          if (code == 6) {
            if (data.isVip){
              wx.navigateTo({
                url: '../recharge/recharge',
              })
            }else{
              wx.navigateTo({
                url: '../preCharge/preCharge',
               //url: `../confirm2Use/confirm2Use`
              })
            }

          } else if(code==9){
            if (data.isVip) {
              wx.navigateTo({
                url: '../recharge/recharge',
              })
            } else {
              wx.navigateTo({
                url: '../preCharge/preCharge',
              })
            }
          } else {
            console.log(code)
            wx.navigateTo({
              url: `../confirm2Use/confirm2Use`
              // url: `../unlockWithBle/unlockWithBle`
            })
          }
        })

      } else {
wx.showModal({
  title: '',
  content: '此车不存在',
})
      }

    })
  },

  //位置变化的时候
  regionchange: function(e) {
    //得到地图中心点的位置
    var that = this
    that.mapCtx.getCenterLocation({
      success: function(res) {
        //调试发现地图在滑动屏幕开始和结束的时候都会走这个方法,需要判断位置是否真的变化来判断是否刷新单车列表
        //经纬度保留6位小数
        var longitudeFix = res.longitude.toFixed(6)
        var latitudeFix = res.latitude.toFixed(6)
        if (e.type == "begin") {
          console.log('位置相同,不执行刷新操作')
        } else {
          console.log("位置变化了")
          // app.globalData.initLocation = {
          //   lat : latitudeFix,
          //   lon : longitudeFix
          // }
          //刷新单车列表
          // if (that.data.isCanGetBikeList && (longitudeFix != 0 && latitudeFix != 0)) {
          if (longitudeFix != 0 && latitudeFix != 0) {
            that.getBikeList(longitudeFix, latitudeFix)
          }
        }
      }
    })
  },

  //请求附近单车列表
  getBikeList(lon, lat) {
    var that = this;
    var param = {
      lon: lon,
      lat: lat,
    }
    common.sendRequest("/bike/aroundIcon.action", param, (res) => {
      let result = res.data;
      let bikeList = result.mac;
      // let bleList = result.data.mac;
      //let markers = []
      let markers = bikeList.map(({
        lon,
        lat,
        name
      }) => {
        return {
          latitude: lat,
          longitude: lon,
          title:name,
          iconPath: "../image/home_icon_p1.png",
          width: 100 * wx.getStorageSync("kScreenW"),
          height: 100 * wx.getStorageSync("kScreenW")
        }
      })
  
      if (markers) {
        markers.forEach(function (v, i) {
          v.id = i + 1
        })
      }
      that.setData({
        bikeList: result.mac,
        markers
      })
      console.log('e.markerId', markers)

    })

  },

  markertap(e) {
    var that = this
    let mark = {}
    that.data.markers.map((ele) => {
      if (ele.id == e.markerId)
        mark = ele
    })
    console.log('e.markerId', mark._distance)
    console.log('e.markerId', mark.address)
    let mylat = wx.getStorageSync("mylat");
    let mylon = wx.getStorageSync("mylon");
    that.setData({
      polyline: [{
        points: [{
          longitude:mylon,
          latitude: mylat
        }, {
            longitude: mark.longitude,
            latitude: mark.latitude
        }],
        color: "red",
        width: 3,
        dottedLine: true
      }],
    })
    wx.showModal({
      title: '',
      content: '确定要导航到该站点？',
      confirmText:'导航',
      confconfirmColor:"#50cc99",
      success:function(res){
        if(res.confirm){
          wx.openLocation({
            latitude: mark.latitude,
            longitude: mark.longitude,
            name: mark.title,
            scale: 12
          })
        }
      }
    })

  },


  //事件处理函数
  bindViewTap: function() {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  openLock() {
    let bicycleCode = this.data.bicycleCode,
      password = this.data.password,
      macAdd = this.data.macAdd,
      key = this.data.key;
    let bikeState = wx.getStorageSync('bikeState')
    console.log(bikeState)
    wx.navigateTo({
      url: `../unlockWithBle/unlockWithBle?delta=1&bikeState=${bikeState}`,
    })
  },
  overTrip: function(e) {
    let that = this,
      bikeCode = wx.getStorageSync('bikecode'),
      password = wx.getStorageSync('password'),
      macAdd = wx.getStorageSync('macAdd'),
      key = new Uint8Array(wx.getStorageSync('reskey').split(',').map(n => +n));
    console.log("++++++++++++++++++",macAdd)
    wx.showLoading({
      title: '正在处理中',
      mask: true
    })

let bikeState = wx.getStorageSync('bikeState')
if(bikeState==1){ 
  common.getLocation(res=>{
    let userAtitude = res.latitude, //结束地点的纬度
      userLongitude = res.longitude;
      common.sendRequest('/bikeRent/rentBike.action', {
        userLongitude,
        userAtitude
      }, res => {
        console.log("?????????/bikeRent/rentBike.action'????????????", res.data.code)
        if (res.data.code == 1) {
          let rentInfo = res.data.data.bikeRentInfo,
            rentPrice = rentInfo.rentPrice,
            startPlace = rentInfo.startFixedName,
            startTime = utils.formatTime(new Date(rentInfo.rentStarttime)),
            deposite = res.data.data.account.accountDeposit,
            lastPrice = that.data.unitPrice,
            insurancePrice = that.data.insurancePrice,
            endTime = utils.formatTime(new Date(rentInfo.rentEndtime));
          wx.navigateTo({
            url: `../confirm2Trip/confirm2Trip?bikeCode=${bikeCode}&rentPrice=${rentPrice}&deposite=${deposite}&startPlace=${startPlace}&startTime=${startTime}&endTime=${endTime}&lastPrice=${lastPrice}&insurancePrice=${insurancePrice}`
          })

        } else if(res.data.code==0){
          wx.showLoading({
            title: '正在处理中',
            mask: true
          })
          bleUtils.canParking(bikeCode, macAdd, key, password, this, ({
            bleMarker
          }) => {

            common.getLocation(res => {
              let userAtitude = res.latitude, //结束地点的纬度
                userLongitude = res.longitude,
                lat = res.latitude,
                lon = res.longitude,
                mac = bleMarker,
                code = bikeCode,
                param = {
                  lat,
                  lon,
                  mac,
                  code
                };
              console.log(param)
              common.sendRequest('/bikeRent/parkingCheck.action', param, res => {
                console.log("请将车停放到指定的蓝牙桩位置______________", res.data)
                if (!res.data.canParking) {
                  wx.showModal({
                    title: '',
                    content: "请将车辆停至全域骑游指定还车点",
                  })
                  wx.hideLoading();
                  return;
                }
                common.sendRequest('/bikeRent/rentBike.action', {
                  userLongitude,
                  userAtitude
                }, res => {
                  console.log("?????????/bikeRent/rentBike.action'????????????", res.data)
                  if (res.data.code == 1) {
                    let rentInfo = res.data.data.bikeRentInfo,
                      rentPrice = rentInfo.rentPrice,
                      startPlace = rentInfo.startFixedName,
                      startTime = utils.formatTime(new Date(rentInfo.rentStarttime)),
                      deposite = res.data.data.account.accountDeposit,
                      lastPrice = that.data.unitPrice,
                      insurancePrice = that.data.insurancePrice,
                      endTime = utils.formatTime(new Date(rentInfo.rentEndtime));
                    wx.navigateTo({
                      url: `../confirm2Trip/confirm2Trip?bikeCode=${bikeCode}&rentPrice=${rentPrice}&deposite=${deposite}&startPlace=${startPlace}&startTime=${startTime}&endTime=${endTime}&lastPrice=${lastPrice}&insurancePrice=${insurancePrice}`
                    })

                  } else {
                    wx.showModal({
                      title: '',
                      content: res.data.message,
                    })
                  }
                  wx.hideLoading();

                })
              }, () => {
                common.sendRequest('/bikeRent/rentBike.action', {
                  userLongitude,
                  userAtitude
                }, res => {
                  wx.showLoading({
                    title: '处理中...',
                  })
                  console.log(res.data)
                  if (res.data.code == 1) {
                    let rentInfo = res.data.data.bikeRentInfo,
                      rentPrice = rentInfo.rentPrice,
                      startPlace = rentInfo.startFixedName,
                      startTime = utils.formatTime(new Date(rentInfo.rentStarttime)),
                      deposite = res.data.data.account.accountDeposit,
                      lastPrice = that.data.unitPrice,
                      insurancePrice = that.data.insurancePrice,
                      endTime = utils.formatTime(new Date(rentInfo.rentEndtime));
                    wx.navigateTo({
                      url: `../confirm2Trip/confirm2Trip?bikeCode=${bikeCode}&rentPrice=${rentPrice}&deposite=${deposite}&startPlace=${startPlace}&startTime=${startTime}&endTime=${endTime}&lastPrice=${lastPrice}&insurancePrice=${insurancePrice}`
                    })

                  } else {
                    wx.showModal({
                      title: '',
                      content: res.data.message,
                    })
                  }
                  wx.hideLoading();

                })
              })
            }, res => {
              wx.hideLoading();
              console.log(res)
            })
          }, ({
            msg
          }) => {
              wx.hideLoading();
              bleUtils.lanya0();
              wx.showModal({
                title: '',
                content: '' + msg,
              })
            });
        } else if(res.data.code==12){
          wx.showModal({
            title: '',
            content: '未上锁！',
          })
        } else {
          wx.showModal({
            title: '',
            content: res.data.message,
          })
        }
        // wx.hideLoading();

      })
  })
}else{
  bleUtils.canParking(bikeCode, macAdd, key, password, this, ({
    bleMarker
  }) => {

    common.getLocation(res => {
      let userAtitude = res.latitude, //结束地点的纬度
        userLongitude = res.longitude,
        lat = res.latitude,
        lon = res.longitude,
        mac = bleMarker,
        code = bikeCode,
        param = {
          lat,
          lon,
          mac,
          code
        };
      console.log(param)
      common.sendRequest('/bikeRent/parkingCheck.action', param, res => {
        console.log("请将车停放到指定的蓝牙桩位置______________", res.data)
        if (!res.data.canParking) {
          wx.showModal({
            title: '',
            content: "请将车辆停至全域骑游指定还车点",
          })
          wx.hideLoading();
          return;
        }
        common.sendRequest('/bikeRent/rentBike.action', {
          userLongitude,
          userAtitude
        }, res => {
          console.log("?????????/bikeRent/rentBike.action'????????????", res.data)
          if (res.data.code == 1) {
            let rentInfo = res.data.data.bikeRentInfo,
              rentPrice = rentInfo.rentPrice,
              startPlace = rentInfo.startFixedName,
              startTime = utils.formatTime(new Date(rentInfo.rentStarttime)),
              deposite = res.data.data.account.accountDeposit,
              lastPrice = that.data.unitPrice,
              insurancePrice = that.data.insurancePrice,
              endTime = utils.formatTime(new Date(rentInfo.rentEndtime));
            wx.navigateTo({
              url: `../confirm2Trip/confirm2Trip?bikeCode=${bikeCode}&rentPrice=${rentPrice}&deposite=${deposite}&startPlace=${startPlace}&startTime=${startTime}&endTime=${endTime}&lastPrice=${lastPrice}&insurancePrice=${insurancePrice}`
            })

          } else if (res.data.code == 12) {
            wx.showModal({
              title: '',
              content: '未上锁！',
            })
          } else {
            wx.showModal({
              title: '',
              content: res.data.message,
            })
          }
          wx.hideLoading();

        })
      }, () => {
        common.sendRequest('/bikeRent/rentBike.action', {
          userLongitude,
          userAtitude
        }, res => {
          wx.showLoading({
            title: '处理中...',
          })
          console.log(res.data)
          if (res.data.code == 1) {
            let rentInfo = res.data.data.bikeRentInfo,
              rentPrice = rentInfo.rentPrice,
              startPlace = rentInfo.startFixedName,
              startTime = utils.formatTime(new Date(rentInfo.rentStarttime)),
              deposite = res.data.data.account.accountDeposit,
              lastPrice = that.data.unitPrice,
              insurancePrice = that.data.insurancePrice,
              endTime = utils.formatTime(new Date(rentInfo.rentEndtime));
            wx.navigateTo({
              url: `../confirm2Trip/confirm2Trip?bikeCode=${bikeCode}&rentPrice=${rentPrice}&deposite=${deposite}&startPlace=${startPlace}&startTime=${startTime}&endTime=${endTime}&lastPrice=${lastPrice}&insurancePrice=${insurancePrice}`
            })

          } else {
            wx.showModal({
              title: '',
              content: res.data.message,
            })
          }
          wx.hideLoading();

        })
      })


    }, res => {
      wx.hideLoading();
      console.log(res)
    })
  }, ({
    msg
  }) => {
      wx.hideLoading();
      bleUtils.lanya0();
      wx.showModal({
        title: '',
        content: '' + msg,
      })
    });
}
  },

  // 展示 行程中 样式
  showTriping: function(data) {
    var bicycle_code, creat_time, price, unit_min, unit_price, is_free;
    bicycle_code = data.bicycle_code
    creat_time = data.created
    unit_min = data.unit_min
    unit_price = data.unit_price
    is_free = data.is_free
    this.setData({
      bicycleCode: bicycle_code
    });

    this.getCurrentTime(creat_time, unit_min, unit_price)
  },

  // 通过服务器，获取当前时间
  getCurrentTime: function(creat_time, unit_min, unit_price) {

    // 获取服务器时间; 如果返回yy-mm--dd格式，将其转成时间戳

    // 获取当前时间
    var timestamp = Date.parse(new Date());
    var countTime = timestamp - creat_time >= 0 ? timestamp - creat_time : 0;
    //Date.parse(new Date(creat_time)
    this.setTripingTime(countTime, unit_min, unit_price)


  },

  // 统计行程时间，及相应价钱
  setTripingTime: function(time, unit_min, unit_price) {
    var format_time;
    var price;
    var currentRideTime;
    var _this = this;
    //var timer = ;
    if (app.globalData.tripTimer) {
      clearInterval(app.globalData.tripTimer);
      app.globalData.tripTimer = null;
    }
    app.globalData.tripTimer = setInterval(function() {
      if (_this.data.isIntrip) {

        time += 1000
        //计算时间
        format_time = utils.getTimeDiff(time)
        // 计算价格
        price = utils.onPirce(time, unit_min, unit_price)
        currentRideTime = utils.towDigit(format_time[0]) + ':' + utils.towDigit(format_time[1]) + ":" + utils.towDigit(format_time[2]);
        _this.setData({
          currentPay: price,
          currentRideTime: currentRideTime
        })
      } else {
        clearInterval(app.globalData.tripTimer);
        app.globalData.tripTimer = null;
        return;
      }

    }, 1000)
  },
  // checkLocationAuth() {  // 检测小程序定位是否被授权，


  // },

  onShow: function() {
 
    let token = wx.getStorageSync("token");
    let that = this;
    //强制用户授权， 获取当前位置
    this.getLocationAuth(() => {

      common.getLocation(res => {
        console.log("000000000000000000000000",res)
        wx.setStorageSync('mylat', res.latitude);
        wx.setStorageSync('mylon', res.longitude);
        that.getBikeList(res.longitude, res.latitude)
        that.setData({
          point: {
            lon: res.longitude,
            lat: res.latitude
          }
        })

      }, res => {
        console.log(res)
      })

    })

    common.checkNetWorkStatus(() => {
      if (!token) {
        that.setData({
          controls: that.data.noRidingcontrols
        })
        return;
      } else {
        console.log('hastoken')
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        common.wxLogin(() => {
          common.sendRequest("/bikeRent/renting.action", {}, res => {

            var data = res.data.data;

            if (data.rentInfo) {
              // 行程中

              if (!data.rentInfo.rentEndtime) {
                if (timer) {
                  wx.hideLoading();
                  return;
                }
                let startTime = data.rentInfo.rentStarttime,
                  unitPrice = data.models.modelRentPrice.lastPrice,
                  insurancePrice = data.insurancePrice.inPrice,
                  unitMin = data.models.modelRentPrice.rentPriceOption == 1 ? 60 : 30;
                that.setData({
                  mapHeight: "70%",
                  ismapno:true,
                  isIntrip: true,
                  unitPrice,
                  insurancePrice,
                  //   isCanGetBikeList: false,
                  bicycleCode: data.bike.bikeCode,
                  startPlace: data.rentInfo.startFixedName,
                  currentPay: data.rentMoney,
                  controls: that.data.ridingControls,
                  markers: [] // 进入行程，消除地图上的单车标记
                })
                that.getCurrentTime(startTime, unitMin, unitPrice)
                wx.setNavigationBarTitle({
                  title: '骑行中...'
                })
                let param = {
                  ...this.data.point,
                  bikeCode: data.bike.bikeCode
                }

                common.sendRequest("/bikeRent/unlock.action", param, (res) => {
                  if (res.data.success) {
                    let result = res.data.data,
                      password = result.pass.split(',').map(n => +n),
                      macAdd = result.mac,
                      key = new Uint8Array(result.key.split(',').map(n => parseInt(n)));
                    app.globalData.lockOption = {
                      password,
                      macAdd,
                      key
                    }
                    app.globalData.rentOption.bikeCode = data.bike.bikeCode;

                    that.setData({
                      password,
                      macAdd,
                      key
                    })
                  } else {

                  }
                  wx.hideLoading();
                })
                //  that.showTriping(data.trip || data.payment)

              } else {
                let rentInfo = data.rentInfo,
                  bikeCode = data.bike.bikeCode,
                  //  deposite = data.account.accountDeposit, //
                  rentPrice = rentInfo.rentPrice,
                  startPlace = rentInfo.startFixedName,
                  insurancePrice = data.insurancePrice.inPrice,
                  deposite = res.data.data.account.accountDeposit,
                  startTime = utils.formatTime(new Date(rentInfo.rentStarttime)),
                  lastPrice = data.models.modelRentPrice.lastPrice,
                  endTime = utils.formatTime(new Date(rentInfo.rentEndtime));
                wx.navigateTo({
                  url: `../confirm2Trip/confirm2Trip?bikeCode=${bikeCode}&rentPrice=${rentPrice}&deposite=${deposite}&startPlace=${startPlace}&startTime=${startTime}&endTime=${endTime}&lastPrice=${lastPrice}&insurancePrice=${insurancePrice}`
                })
                wx.hideLoading();
              }


            } else {
              wx.setNavigationBarTitle({
                title: '全域骑游'
              })
              that.setData({
                mapHeight: "100%",
                ismapno:false,
                controls: that.data.noRidingcontrols,
                isIntrip: false,
                bicycleCode: '',
                currentRideTime: '',
                currentPay: '',
                //  isCanGetBikeList: true

              })
              wx.hideLoading();
            }

          })
        })

      }

    });
  },

  // 强制用户开启定位权限
  getLocationAuth(callback) {
    const that = this;
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success() {
              console.log(222)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              callback();
            },
            fail() {
              console.log(222)
              wx.openSetting({
                success: (res) => {
                  console.log(res)
                  res.authSetting = {
                    "scope.userLocation": true
                  }

                }
              })
            }
          })
        } else {
          callback();
        }
      }
    })
  },

  onLoad: function(options) {
    let param = decodeURIComponent(options.q),
      qrCode = param.split("=")[1],
      token = wx.getStorageSync("token");

    if (qrCode && token) {
      common.getLocation(res => {
        let lon = res.longitude,
          lat = res.latitude;
        this.scan2OpenLock(lat, lon, qrCode)
      }, res => {
        console.log(res)
      })

    }
  },
  onReady: function(e) {

    this.mapCtx = wx.createMapContext("map");
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
  },
  //定位到用户当前位置
  getUserCurrentLocation: function() {
    var scale = this.data.scale;
    this.mapCtx.moveToLocation();
    this.setData({
      'mapScale': scale
    })
  },
  displayfun:function(){
    this.setData({
      isShow: true
    })
  }
})