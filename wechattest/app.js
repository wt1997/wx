//app.js
App({
  onLaunch: function () {
    wx.getStorage({
      key: 'IsLogin',
      success: function(res) {
        console.log(res.data);
      },
      fail: function(res){
        console.log(res.data+'--')
      }
    })
  },
  globalData: {
    userInfo: null,
    userId: '',
    userPhoto: '',
    userName: '',
    userPwd:'',
    r_name:'',
    r_phone:'',
    r_vc:'',
    r_pwd:'',
    r_svc:'',
    r_right: '',
    LoginUrl: 'http://121.250.222.82:8080/weixin/login',
    PlaceUrl: 'http://121.250.222.82:8080/weixin/getplace',
    VerificateUrl: 'http://121.250.222.82:8080/weixin/verificate',
    RegisterUrl: 'http://121.250.222.82:8080/weixin/register/1',
    UpdatePhotoUrl: 'http://121.250.222.82:8080/weixin/updatephoto',
    VisitApplyUrl: 'http://121.250.222.82:8080/weixin/apply',
    QueryApplyUrl: 'http://121.250.222.82:8080/weixin/queryapply',
    DeleteappluUrl: 'http://121.250.222.82:8080/weixin/deleteapply',
    GetNameUrl: 'http://121.250.222.82:8080/weixin/getname',
    GetPhotoUrl: 'http://121.250.222.82:8080/weixin/getphoto'
  }
})