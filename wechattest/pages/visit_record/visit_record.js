// pages/visit_record/visit_record.js
Page({
  data: {
    visit_record:'',
    uhide: 0,
    isDelete: 0
  },
 /* onLoad: function (options) {
    var that = this;
    var data = {
      "datas": [
        {
          "id": 1,
          "imgurl": "../images/wyz.png",
          "people": "山大软件-吴彦祖",
          "time": "2018-06-17",
          "s_time": "2018-06-19 11:30",
          "e_time": "2018-06-19 12:30",
          "reason": "请教于老先生关于哲学的问题。",
          "state": "待审核"
        },
        {
          "id": 2,
          "imgurl": "../images/wyz.png",
          "people": "山大软件-吴彦祖",
          "time": "2018-06-17",
          "s_time": "2018-06-19 11:30",
          "e_time": "2018-06-19 12:30",
          "reason": "请教于老先生关于哲学的问题。",
          "state": "审核通过"
        },
        {
          "id": 3,
          "imgurl": "../images/wyz.png",
          "people": "山大软件-吴彦祖",
          "time": "2018-06-17",
          "s_time": "2018-06-19 11:30",
          "e_time": "2018-06-19 12:30",
          "reason": "请教于老先生关于哲学的问题。",
          "state": "已结束"
        },
        {
          "id": 4,
          "imgurl": "../images/wyz.png",
          "people": "山大软件-吴彦祖",
          "time": "2018-06-17",
          "s_time": "2018-06-19 11:30",
          "e_time": "2018-06-19 12:30",
          "reason": "请教于老先生关于哲学的问题。请教于老先生关于哲学的问题。请教于老先生关于哲学的问题。请教于老先生关于哲学的问题。请教于老先生关于哲学的问题。",
          "state": "已结束"
        },
      ]
    };
    that.setData({
      visit_record: data.datas
    })
  },*/
  detail_btn: function(event){
    var that = this;
    var value = that.data.uhide;
    var itemId = event.currentTarget.id;
    //console.log(itemId+"0");
    if(value == itemId){
      that.setData({
        uhide: 0
      })
      console.log(that.data.uhide+"1");
    }else{
      that.setData({
        uhide: itemId
      })
      console.log(that.data.uhide+"2");
    }
  },
  delete_btn: function(event){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定此条记录删除？',
      success: function (res1) {
        if (res1.confirm) {
          var itemId = event.currentTarget.id;
          that.setData({
            uhide: 0
          })
          console.log(itemId);
          wx.request({
            url: getApp().globalData.DeleteappluUrl,
            data: {
              'vid': itemId
            },
            method: 'GET',
            header: {
              'content-type': 'application/text'
            },
            success: function (res) {
              if(res.data==true){
                that.onShow();
              }
              console.log(res.data)
            },
            fali: function (res1) {
              console.log(res1.data)
            }
          })
          console.log("确定")
        } else if (res1.cancel) {
          console.log("取消")
        }
      }
    })
  },
  onLoad: function(){
    var that = this;
    wx.request({
      url: getApp().globalData.QueryApplyUrl,
      data: {
        'uid':getApp().globalData.userId
      },
      method: 'GET',
      header: {
        'content-type': 'application/text'
      },
      success: function(res){
        that.setData({
          visit_record: res.data
        })
        console.log(res.data)
      },
      fail: function(res){

      }
    })
  },
  onShow: function(){
    this.onLoad();
  }
})