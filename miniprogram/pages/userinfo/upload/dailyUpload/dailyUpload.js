// pages/userinfo/upload/dailyUpload/dailyUpload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [],
    name: null,
    urlList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "投稿"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    this.data.imgList.splice(e.currentTarget.dataset.index, 1);
    this.setData({
      imgList: this.data.imgList
    })
  },
  uploadImg(count, length) {
    let that = this;
    const db = wx.cloud.database();
    const openid = wx.getStorageSync("openid");
    const _id = wx.getStorageSync("_id");
    let time = Date.now();
    wx.showLoading({
      title: "上传中",
      mask: true,
    })
    console.log(that.data.imgList[count]);
    wx.cloud.uploadFile({
      cloudPath: openid + time + ".png",
      filePath: that.data.imgList[count], // 文件路径
      complete: res => {
        // get resource ID
        let imgUrl = "urlList[" + count + "]";
        console.log(res.fileID);
        that.setData({
          [imgUrl]: res.fileID
        })
        if (count == length) {
          wx.hideLoading();
          wx.showToast({
            title: "上传成功",
            mask: true
          })
          db.collection("picture").add({
            data: {
              name: that.data.name,
              fileUrl: that.data.urlList
            }
          }).then(res => {
            console.log("发射成功啦！", res)
            db.collection("userinfo").doc(_id).update({
              data: {
                submitTotal: db.command.inc(1)
              }
            })
          }).catch(res => {
            console.log("发射失败", res)
          })
          that.setData({
            imgList: [],
            textValue: "",
          })
        } else {
          count++;
          that.uploadImg(count, length);
        }
      },
      fail: err => {
        console.error(err);
        wx.hideLoading();
        wx.showToast({
          title: "上传失败",
          image: "/images/icons/icon_fail.png",
          mask: true
        })
      }
    })
  },
  formSubmit: function(e) {
    let that = this;
    //_id为数据库为每个用户分配的唯一标识，不同于openid
    let name = e.detail.value.name;
    that.setData({
      name: name
    })
    if (name && this.data.imgList.length) {
      that.uploadImg(0, that.data.imgList.length-1);
    }
  }
})