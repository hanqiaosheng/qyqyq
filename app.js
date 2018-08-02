//app.js
App({
  onLaunch: function () {
    var kScreenH;
    //调用API从本地缓存中获取数据
    wx.getSystemInfo({
      success: function (res) {
        var kScreenW = res.windowWidth / 750
        kScreenH = res.windowHeight/ 840
        wx.setStorageSync('kScreenW', kScreenW)
        wx.setStorageSync('kScreenH', kScreenH)
      }
    })
  },
 
  globalData:{
   
   // ybdcUrl: "http://ybdc.tunnel.qydev.com/ybb-mobile",
   // ybdcUrl: "http://106.14.113.199:20402/ybb-mobile",//  请求URL
   // ybdcUrl: "https://testapi.1bgx.com",//  请求URL
ybdcUrl: "https://test-wechat.letulife.com",//  请求URL
  // ybdcUrl: "https://wechat.letulife.com",//  请求UR\L
    ybUrl:'https://qy.1bgx.com',
   // ybdcUrl:'http://192.168.0.187:8083',   
    // amapKey:'23a779506a97a19ab8261d922e076049',
    mapKey:'X4JBZ-5BMW2-MSWU3 - CCDQZ - CKIMV - JVFKU',
   // ybdcUrl: "https://v2.api.bicycle.windward.com.cn",
    //请求头，测试服务器暂时没有验证
   

    header:{
      fromFlag: 3,
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      token:''
    },
    ybHeader:{
      'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      token:'',
      version:'1'
    },
    tel:'0571-56231981',
    initLocation:{}, // 初始化坐标
    startPlace: '', // 行程起点地址
    endPlace:'',
    bleDeviceId:'',
    bleToken:'', //蓝牙命令的TOKEN值
    tripTimer:null, //行程计时状态
    searchBleList:[],
    lockOption:{
      password:'',
      macAdd:'',
      key:'',
      bikeState:''
    },
    rentOption:{
      bikeDeposit:'',
      bikeCode:'',
      rentPriceOption:'',
      lastPrice:'',
      isVip:'',
      modelsName:'',
      accountAvailableBalance:'',
      bikeAddress:'',
      priceList:'',
      rentPriceMax:''//封顶费用(元/天)
    } //租赁相关信息
  }

})
