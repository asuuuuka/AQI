// components/component-tag-name.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    city: {
      type: String,
      value: 'default value',
    },
    pm: {
      type: String,
      value: 'default value'
    },
    pmtf: {
      type: String,
      value: 'default value'
    },
    aqi: {
      type: String,
      value: 'default value'
    },
    quality: {
      type: String,
      value: 'default value'
    },
  },





  /**
   * 组件的初始数据
   */
  data: {
    /*city: null,
    quality: null,
    pm2_5_1: null,
    api: null,
    pm2_5_24: null,
    city: shanghai,
    quality: 优,
    pm2_5_1: 15,
    api: 88,
    pm2_5_24: 17,*/
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChangeCity:function(e){
      wx.navigateTo({
        url: '/cities/cities',
      })
    }

  }
})