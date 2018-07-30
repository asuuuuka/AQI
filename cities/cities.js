import "../app.js"
//index.js
//获取应用实例
var tcity = require("../cities/cityinfo.js");
var app = getApp();

Page({
  data: {
    provinces: [],
    province: "",
    cities: [],
    city: "",
    countys: [],
    county: '',
    value: [0, 0, 0],
    values: [0, 0, 0],
    condition: true,
  },
  bindChange: function(e) {
    //console.log(e);
    var val = e.detail.value
    var t = this.data.values;
    var cityData = this.data.cityData;

    if (val[0] != t[0]) {
      console.log('province no ');
      const cities = [];
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub.length; i++) {
        cities.push(cityData[val[0]].sub[i].name)
      }
      for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
        countys.push(cityData[val[0]].sub[0].sub[i].name)
      }

      this.setData({
        province: this.data.provinces[val[0]],
        city: cityData[val[0]].sub[0].name,
        cities: cities,
        county: cityData[val[0]].sub[0].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], 0, 0]
      })

      return;
    }
    if (val[1] != t[1]) {
      console.log('city no');
      const countys = [];

      for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
        countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
      }

      this.setData({
        city: this.data.cities[val[1]],
        county: cityData[val[0]].sub[val[1]].sub[0].name,
        countys: countys,
        values: val,
        value: [val[0], val[1], 0]
      })
      return;
    }
    if (val[2] != t[2]) {
      console.log('county no');
      this.setData({
        county: this.data.countys[val[2]],
        values: val
      })

      return;
    }
  


  },
  open: function() {
    this.setData({
      condition: !this.data.condition
    })
    var t = this.data.city;
    app.globalData.defaultCity = t;



    //settingcity;
    //app.globalData.settingcity = this.data.city;

    wx.redirectTo({

      url: '/index/index',
    })
  
  },
  cancel:function(){
    wx.redirectTo({

      url: '/index/index',
    })
  },
  onLoad: function() {
    console.log("onLoad");
    var that = this;

    tcity.init(that);

    var cityData = that.data.cityData;


    const provinces = [];
    const cities = [];
    const countys = [];

    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name);
    }
    console.log('省份完成');
    for (let i = 0; i < cityData[0].sub.length; i++) {
      cities.push(cityData[0].sub[i].name)
    }
    console.log('city完成');
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    that.setData({
      'provinces': provinces,
      'cities': cities,
      'countys': countys,
      'province': cityData[0].name,
      'city': cityData[0].sub[0].name,
      'county': cityData[0].sub[0].sub[0].name
    })
    console.log('初始化完成');


  },

    


})