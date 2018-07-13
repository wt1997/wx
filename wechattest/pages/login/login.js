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
    phone_less: '../images/phone_less.png',
    userImageBase64: ''
  },
  //监听input框的输入获取用户输入数据
  usercount: function(e){
    this.data.count = e.detail.value;
    if (this.data.count.length != 11) {
      wx.showToast({
        title: '手机号错误',
        image: this.data.pwd_error,
        duration: 1000,
        mask: true
      })
    }
  },
  userpwd: function(e){
    this.data.password = e.detail.value;
    if(this.data.password.length<1){
      wx.showToast({
        title: '密码不能为空',
        image: '../images/warn1.png',
        duration: 1000,
        mask: true
      })
    }
  },
  //
  userlogin: function(){
    try {
      wx.setStorage({
        key: 'userId',
        data: this.data.count,
      })
      wx.setStorage({
        key: 'userPwd',
        data: this.data.password,
      })
      wx.setStorage({
        key: 'IsLogin',
        data: true,
      })
    } catch (e) {
      console.log("Error" + e);
    }
    /*
    //发起登录的网络请求
    wx.request({
      //服务器端接口url
      url: getApp().globalData.LoginUrl,
      //携带的用户数据
      data:{
        uid: this.data.count,
        password: this.data.password
      },
      method:'GET',
      header: {
        'content-type': 'application/text'
      },
      //响应成功后的操作
      success: function(res){
        console.log(res);
        //res.data=1代表登录申请通过
        if(res.data == '1'){
          //执行到这里代表用户登录成功，所以在这里添加用户数据的缓存
          try{
            wx.setStorage({
              key: 'userId',
              data: this.data.count,
            })
            wx.setStorage({
              key: 'userPwd',
              data: this.data.password,
            })
            wx.setStorage({
              key: 'IsLogin',
              data: true,
            })
          }catch(e){
            console.log("Error"+e);
          }
          //设置全局变量的用户ID,为本次登录操作使用
          getApp().globalData.userId=this.data.count;
          //跳转到主页面
          wx.navigateTo({
            url: '../main/main',
          })

        } else if (res.data == '0'){//res.data=0用户密码不正确
            wx.showToast({
              title: '手机号或密码错误',
              image: "../images/pwd_error.png",
              duration: 1000,
              mask: true
            })
        }
        else{//res.data=-1代表手机号未注册
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
    wx.navigateTo({
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