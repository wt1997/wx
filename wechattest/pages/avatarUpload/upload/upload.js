import WeCropper from '../../we-cropper/we-cropper.js'

const device = wx.getSystemInfoSync()
const width = device.windowWidth
const height = device.windowHeight - 50

Page({
  data: {
    cropperOpt: {
      who: '',
      id: 'cropper',
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }
  },
  touchStart (e) {
    this.wecropper.touchStart(e)
  },
  touchMove (e) {
    this.wecropper.touchMove(e)
  },
  touchEnd (e) {
    this.wecropper.touchEnd(e)
  },
  getCropperImage () {
    this.wecropper.getCropperImage((avatar) => {//获取图片成功
      if(this.data.who==1){
        if (avatar) {
          //  获取到裁剪后的图片
          wx.uploadFile({
            url: getApp().globalData.UpdatePhotoUrl,
            filePath: avatar,
            name: 'file',
            formData: {
              'uid': getApp().globalData.userId,
            },
            success: function (res) {
              if (res.data == 'true') {
                getApp().globalData.userPhoto = avatar;
                wx.redirectTo({
                  url: '../../userinfo/userinfo',
                })
              } else {
                console.log("修改失败！")
              }
              console.log(res.data);
            },
            fail: function (res) {
              console.log(res.data);
            }
          })
        } else {
          console.log('获取图片失败，请稍后重试')
        }
      }else if(this.data.who==2){
        wx.redirectTo({
          url: '../../register/register?src='+avatar,
        })
      }
      /*if (avatar) {
        //  获取到裁剪后的图片
        wx.uploadFile({
          url: getApp().globalData.UpdatePhotoUrl,
          filePath: avatar,
          name: 'file',
          formData: {
            'uid':getApp().globalData.userId,
          },
          success: function(res){
            if(res.data == 'true'){
              getApp().globalData.userPhoto = avatar;
              wx.redirectTo({
                url: '../../userinfo/userinfo',
              })
            }else{
              console.log("修改失败！")
            }
            console.log(res.data);
          },
          fail: function(res){
            console.log(res.data);
          }
        })
      } else {
        console.log('获取图片失败，请稍后重试')
      }*/
    })
  },
  uploadTap () {
    const self = this

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.wecropper.pushOrign(src)
      }
    })
  },
  onLoad (option) {
    const { cropperOpt } = this.data
    this.setData({
      who: option.who
    })
    if (option.src) {
      cropperOpt.src = option.src
      new WeCropper(cropperOpt)
        .on('ready', (ctx) => {
          console.log(`wecropper is ready for work!`)
        })
        .on('beforeImageLoad', (ctx) => {
          console.log(`before picture loaded, i can do something`)
          console.log(`current canvas context:`, ctx)
          wx.showToast({
            title: '上传中',
            icon: 'loading',
            duration: 20000
          })
        })
        .on('imageLoad', (ctx) => {
          console.log(`picture loaded`)
          console.log(`current canvas context:`, ctx)
          wx.hideToast()
        })
        .on('beforeDraw', (ctx, instance) => {
          console.log(`before canvas draw,i can do something`)
          console.log(`current canvas context:`, ctx)
        })
        .updateCanvas()
    }
  }
})
