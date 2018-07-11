// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    count: '',
    password: '',
    unregister_phone: '../images/unregister_phone.png',
    pwd_error: '../images/pwd_error.png',
    phone_less: '../images/phone_less.png'
  },
  usercount: function(e){
    this.data.count = e.detail.value;
  },
  userpwd: function(e){
    this.data.password = e.detail.value;
  },
  userlogin: function(){
    console.log("账号：",this.data.count);
    console.log("密码：",this.data.password);
    try {
      wx.setStorageSync("userId", this.data.count);
      wx.setStorageSync("userPwd", this.data.password);
    } catch (e) {
      console.log("Error" + e);
    }
    /*if(this.data.count.length!=11){
      wx.showToast({
        title: '手机号错误',
        image: this.data.phone_less,
        duration: 1000,
        mask: true
      })
    }else{
      
    }
    wx.request({
      url: getApp().globalData.LoginUrl,
      data:{
        uid: this.data.count,
        password: this.data.password
      },
      method:'GET',
      header: {
        'content-type': 'application/text'
      },
      success: function(res){
        console.log(res);
        if(res.data == '1'){
          try{
            wx.setStorageSync("userId", this.data.count);
            wx.setStorageSync("userPwd", this.data.password);
          }catch(e){
            console.log("Error"+e);
          }
          getApp().globalData.userId=this.data.count;
          wx.navigateTo({
            url: '../main/main',
          })
        } else if (res.data == '0'){
            wx.showToast({
              title: '密码错误',
              image: "../images/pwd_error.png",
              duration: 1000,
              mask: true
            })
        }
        else{
            wx.showToast({
              title: '手机号未注册',
              image: '../images/unregister_phone.png',
              duration: 1000,
              mask: true
            })
          }
        console.log(res.data);
        /*wx.showModal({
          title: '提示',
          content: res.data,
          success: function(res1){
            if(res1.confirm){
              console.log("确定")
            }else if(res1.cancel){
              console.log("取消")
            }
          }
        })
      }
    })*/
    wx.redirectTo({
      url: '../main/main',
    })
  },
  user_register: function(){
    wx.navigateTo({
      url: '../register/register',
    })
  },
  forget_pwd: function(){
    wx.navigateTo({
      url: '../forget_pwd/forget_pwd',
    })
  },
  /**
   * 加载页面判断是否用户已登录过，然后进行跳转判断
   */
  onLoad: function (options) {
    var userId = wx.getStorageSync('userId');
    var userPwd = wx.getStorageSync('userPwd');
    console.log(userId + "userID");
    //
    if (userId != '') {
      getApp().globalData.userId = userId;
      wx.redirectTo({
        url: '../main/main',
      })
    } 
    console.log(userPwd + 'usrPwd');
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