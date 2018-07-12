// pages/main/main.js
var base = require("../images/base");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    icon: null,
    userId: ''
  },
  item_one: function(){
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  apply_visit: function(){
    wx.navigateTo({
      url: '../apply_visit/apply_visit',
    })
  },
  visit_record: function(){
    wx.navigateTo({
      url: '../visit_record/visit_record',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      icon: base.icon20,
      userId: getApp().globalData.userId
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