// commponent/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
      cancelText:{
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
        value: '取消', // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
      confirmText: {
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
        value: '确认', // 属性初始值（可选），如果未指定则会根据类型选择一个
      },
      dialogShow:{
        type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
        value: true,
      },
      showConfirm:{
        type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
        value: false,
      },
      showTitle: {
         type: Boolean, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
         value: true,
      },
      contents:{
        type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null
        value: '',
      }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancel(){
      this.setData({
        dialogShow: false
      })
    },
    confirm(){
      
      this.triggerEvent('confirm',{})
    }
  }
})
