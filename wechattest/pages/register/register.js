// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    name: '',
    pwd: '',
    photo: null,
    user_vc: '',
    server_vc: ''
  },
  get_vc: function(){
    wx.request({
      url: getApp().globalData.VerificateUrl,
      data:{
        'uid':this.data.phone,
      },
      method: 'GET',
      header: {
        'content-type': 'application/text'
      },
      success: function(res){
        this.data.server_vc = res.data;
        console.log(vc);
      }
    })
  },
  user_phone: function(e){
    this.data.phone = e.detail.value;
    if(e.detail.value.length != 11){
      wx.showToast({
        title: '手机号错误',
        image: "../images/pwd_error.png",
        duration: 1000,
        mask: true
      })
    }
  },
  user_name: function(e){
    this.data.name = e.detail.value;
    if(e.detail.value == ''){
      wx.showToast({
        title: '用户名不能为空',
        image: "../images/warn1.png",
        duration: 1000,
        mask: true
      })
    }
  },
  user_pwd: function(e){
    this.data.pwd = e.detail.value;
    if(e.detail.value == ''){
      wx.showToast({
        title: '密码不能为空',
        image: "../images/warn1.png",
        duration: 1000,
        mask: true
      })
    }
  },
  user_vc: function(e){
    this.data.user_vc = e.detail.value;
    if(this.data.server_vc != this.data.user_vc){
      wx.showToast({
        title: '验证码错误',
        image: "../images/pwd_error.png",
        duration: 1000,
        mask: true
      })
    }
  },
  userregister: function(){
    if(this.data.name == '' || this.data.photo == null || this.data.pwd == '' || this.data.phone == ''){
      wx.showToast({
        title: '信息不完整',
        image: "../images/warn1.png",
        duration: 1000,
        mask: true
      })
    }else{
      this.uplod_photo()
    }
  },
  choose_photo: function(){
    let _this = this;
    wx.showActionSheet({
      itemList: ["从相册选取","拍照"],
      success: function(res){
        console.log(res.tapIndex);
        if(res.tapIndex == 0){
          _this.chooseWxImage('album')
        }else if(res.tapIndex == 1){
          _this.chooseWxImage('camera')
        }
      },
      fail: function(res){
        console.log(res.errMsg)
      }
    })
  },
  chooseWxImage: function(type){
    let _this = this;
    //console.log("5");
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: [type],
      success: function(res) {
        //console.log("6");
        console.log(res);
        _this.setData({
          photo: res.tempFilePaths[0],
        })
        //console.log(this.data.photo);
       /* wx.showModal({
          title: '路径',
          content: res.tempFilePaths[0],
          success: function(res){
            if (res.confirm) {
              console.log("确定")
            } else if (res.cancel) {
              console.log("取消")
            }
          }
        })*/
        console.log(res.tempFilePaths[0]);
      },
    })
  },
  uplod_photo: function(){
    let _this = this;
    wx.uploadFile({
      url: getApp().globalData.RegisterUrl,
      filePath: this.data.photo,
      name: 'file',
      formData:{
        'uid': this.data.phone,
        'password': this.data.pwd,
        'name': this.data.name
      },
      success: function(res){
        if(res.data == 1){
          //注册成功后，将用户名和密码缓存到本地
          try {
            wx.setStorageSync("userId", this.data.phone);
            wx.setStorageSync("userPwd", this.data.pwd);
          } catch (e) {
            console.log("Error" + e);
          }
          //显示注册成功的提示
          wx.showToast({
            title: '注册成功',
            image: "../images/register_sucess.png",
            duration: 1000,
            mask: true
          })
          //将注册的phone设置成全局变量，供用户操作时使用
          getApp().globalData.userId=this.data.phone;
          //注册成功后将页面跳转那至主页面
          wx.redirectTo({
            url: '../main/main',
          })
        }else if(res.data == 2){
          wx.showToast({
            title: '手机号已被注册',
            image: "../images/warn1.png",
            duration: 1000,
            mask: true
          })
        }else if(res.data == 0){
          wx.showToast({
            title: '手机号两次不一致',
            image: "../images/pwd_error.png",
            duration: 1000,
            mask: true
          })
        }else{
          wx.showToast({
            title: '未知错误',
            image: "../images/warn1.png",
            duration: 1000,
            mask: true
          })
        }
        console.log(res.data)
      },
      fail: function(res){
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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