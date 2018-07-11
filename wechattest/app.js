//app.js
App({
  onLaunch: function () {
    var userId = wx.getStorageSync('userId');
    var userPwd = wx.getStorageSync('userPwd');
    console.log(userId+"userID");
    console.log(userPwd+'usrPwd');
  },
  globalData: {
    userInfo: null,
    userId: '17864154940',
    userPhoto: 'pages/images/wyz.png',
    userName: '吴彦祖',
    LoginUrl: 'http://121.250.222.82:8080/weixin/login',
    PlaceUrl: 'http://121.250.222.82:8080/weixin/getplace',
    VerificateUrl: 'http://121.250.222.82:8080/weixin/verificate',
    RegisterUrl: 'http://121.250.222.82:8080/weixin/register/1',
    UpdatePhotoUrl: 'http://121.250.222.82:8080/weixin/updatephoto',
    VisitApplyUrl: 'http://121.250.222.82:8080/weixin/apply',
    QueryApplyUrl: 'http://121.250.222.82:8080/weixin/queryapply',
    DeleteappluUrl: 'http://121.250.222.82:8080/weixin/deleteapply'
  }
})