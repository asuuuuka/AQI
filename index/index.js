const util = require('../utils/util.js')
const app = getApp()

Page({
  data: {
    logs: [],
    cityUrl: '',
    city: '',
    quality: '',
    pm2_5_1: '',
    aqi: '',
    pm2_5_24: '',
    time: '',
    flower: '',
    sentence: '',
    img: '',
    error: ''
  },
  onLoad: function (event) {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    });
    var allFlowerWord = this.getAllData();
    var today = this.data.logs[0];
    this.setData({
      flower: allFlowerWord[today].name,
      sentence: allFlowerWord[today].kotoba,
      img: allFlowerWord[today].img
    });



    var city = app.globalData.defaultCity;
    this.setCityUrl(city);
    this.getAqiData();



  },

  setCityUrl: function (city) {
    this.setData({
      cityUrl: "http://tchu.brainex.cn/aqi/?city=" + city
    });
  },

  getAqiData: function () {
    var that = this;
    wx.request({
      url: this.data.cityUrl,
      method: 'GET',
      header: {
        "content-type": "json"
      },
      success: function (res) {
        console.log(res.data);
        var t = res.data;
        if (t.error == "该城市还未有PM2.5数据") {
          wx.showModal({
            title: '提示',
            content: '该城市还未有PM2.5数据',
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
          that.processUnKnow();
        }
        else {
          that.processAqiData(res.data);
        }


      },
      fail: function (error) {
        that.processUnKnow();
        wx.showModal({
          title: '提示',
          content: '网络错误',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            }
            
          }
         

        })
      }
    })
  },

  processUnKnow: function () {
    var data = {
      city: app.globalData.defaultCity,
      quality: "未知",
      pm2_5_1: "未知",
      aqi: "未知",
      pm2_5_24: "未知",
      time: "未知",
    }
    this.setData(data);
  },
  processAqiData: function (aqiData) {
    var info = aqiData[0];
    var data = {
      city: info.area,
      quality: info.quality,
      pm2_5_1: info.pm2_5,
      aqi: info.aqi,
      pm2_5_24: info.pm2_5_24h,
      time: info.time_point,
    }
    this.setData(data);
  },

  getAllData() {
    var res = require('../DB/db.js').hanakotoba;
    return res;
  }
})