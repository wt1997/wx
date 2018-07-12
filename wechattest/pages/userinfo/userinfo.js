// pages/userinfo/userinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '../images/wyz.png'
  },
  //注销登录响应函数，确定后清空用户数据缓存，返回登录界面
  logout: function(){
    wx.showModal({
      title: '提示',
      content: '确定注销登录',
      success: function(res){
        if(res.confirm){
          wx.clearStorage();
          wx.redirectTo({
            url: '../login/login',
          })
        }else if(res.cancel){
          console.log("取消")
        }
      }
    })
  },
  //进行头像更换的调用函数
  c_photo: function(){
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]

        wx.redirectTo({
          url: `../avatarUpload/upload/upload?src=${src}`
        })
      }
    })
  },
  //更改密码的调用函数
  change_pwd: function(){
    wx.navigateTo({
      url: '../change_pwd/get_verification_code/get_verification_code',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { avatar } = options
    console.log(avatar);
    if (avatar) {
      this.setData({
        src: avatar
      })
    }
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