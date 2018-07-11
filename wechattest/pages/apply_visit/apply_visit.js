//获取应用实例
var app = getApp()
Page({
  data: {
    tabTxt: [
      {
        'text': '拜访地点',
        'originalText': '拜访地点',
        'active': false,
        'child': [
          { 'id': 1, 'text': 'place1' },
          { 'id': 2, 'text': 'place2' },
          { 'id': 3, 'text': 'place3' },
          { 'id': 4, 'text': 'place4' },
          { 'id': 5, 'text': 'place5' },
          { 'id': 6, 'text': 'place6' }
        ],
        'type': 0
      }
    ],
    searchParam: [],
    s_y: '',
    s_m: '',
    s_d: '',
    s_h: '',
    e_y: '',
    e_m: '',
    e_d: '',
    e_h: '',
    aim: '',
    pid: ''
  },
  s_y: function(e){
    this.data.s_y = e.detail.value;
  },
  s_m: function (e) {
    this.data.s_m = e.detail.value;
  },
  s_d: function (e) {
    this.data.s_d = e.detail.value;
  },
  s_h: function (e) {
    this.data.s_h = e.detail.value;
  },
  e_y: function (e) {
    this.data.e_y = e.detail.value;
  },
  e_m: function (e) {
    this.data.e_m = e.detail.value;
  },
  e_d: function (e) {
    this.data.e_d = e.detail.value;
  },
  e_h: function (e) {
    this.data.e_h = e.detail.value;
  },
  aim: function(e){
    this.data.aim = e.detail.value;
    //console.log(this.data.aim)
  },
  commit: function(){
    console.log(this.data.aim+'01');
    wx.request({
      url: getApp().globalData.VisitApplyUrl,
      data:{
        'uid':getApp().globalData.userId,
        'pid':this.data.pid,
        'stime':this.data.s_y+"/"+this.data.s_m+"/"+this.data.s_d+"/"+this.data.s_h,
        'etime':this.data.e_y+"/"+this.data.e_m+"/"+this.data.e_d+"/"+this.data.e_h,
        'aim':this.data.aim
      },
      method:'GET',
      header:{
        'content-type': 'application/json'
      },
      success: function(res){
        wx.redirectTo({
          url: '../visit_record/visit_record',
        })
      },
      fail: function(res){
        console.log(res.data)
      }
    })
  },
  onLoad: function (options) {
    var that = this
    var place =  null;
    wx.request({
      url: getApp().globalData.PlaceUrl,
      data: {
        
      },
      method: 'GET',
      header: {
        'content-type': 'application/text'
      },
      success: function(res){
        that.setData({
          tabTxt: [
            {
              'text': '拜访地点',
              'originalText': '拜访地点',
              'active': false,
              'child': res.data,
              'type': 0
            }
          ]
        })
        console.log(res.data);
      }
    })
  },
  filterTab: function (e) {
    var that = this;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    var index = e.currentTarget.dataset.index;
    var newTabTxt = data.map(function (e) {
      e.active = false;
      return e;
    });
    newTabTxt[index].active = !that.data.tabTxt[index].active;
    this.setData({
      tabTxt: data
    })

  },
  filterTabChild: function (e) {

    //我需要切换选中项 修改展示文字 并收回抽屉  
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = JSON.parse(JSON.stringify(that.data.tabTxt));
    if (typeof (e.target.dataset.id) == 'undefined' || e.target.dataset.id == '') {
      data[index].active = !that.data.tabTxt[index].active;
    }
    else {
      data[index].type = e.target.dataset.id;
      console.log("id" + e.target.dataset.id);
      this.data.pid = e.target.dataset.id;
      console.log(this.data.pid);
      data[index].active = !that.data.tabTxt[index].active;
      if (e.target.dataset.id == '0') {
        data[index].text = that.data.tabTxt[index].originalText;
        //不限删除条件
        delete that.data.searchParam[index];
      }
      else {
        data[index].text = e.target.dataset.txt;
        //更改删除条件
        that.data.searchParam[index] = data[index].text;
      }


    }

    that.setData({
      tabTxt: data
    })
    console.log(that.data.searchParam);
  }
})