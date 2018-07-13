// pages/main/main.js
var base = require("../images/base");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: null,
    userId: '',
    userphoto: '',
    username: '',
  },
  //跳转至用户信息界面
  user_info: function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  //跳转至申请访问页面
  apply_visit: function(){
    wx.navigateTo({
      url: '../apply_visit/apply_visit',
    })
  },
  //跳转至记录查看页面
  visit_record: function(){
    wx.navigateTo({
      url: '../visit_record/visit_record',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      icon: base.icon20,
      userId: getApp().globalData.userId,
      username: getApp().globalData.userName,
      userphoto: getApp().globalData.userPhoto
    })
    wx.request({
      url: getApp().globalData.GetNameUrl,
      data: {
        'uid':getApp().globalData.userId
      },
      method:'GET',
      header: {
        'content-type':"application/json"
      },
      success: function(res){
        console.log(res);
        getApp().globalData.userName = res.name;
        that.setData({
          username: res.data.name,
        })
      },
      fail: function(res){
        console.log(res)
      }
    })
    wx.downloadFile({
      url: getApp().globalData.GetPhotoUrl + '?uid=' + getApp().globalData.userId,
      success: function(res){
        getApp().globalData.userPhoto = res.tempFilePath;
        that.setData({
          userphoto: res.tempFilePath
        })
      }
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
    getApp().onHide();
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
  onShareAppMessage: function () {
  
  }
})