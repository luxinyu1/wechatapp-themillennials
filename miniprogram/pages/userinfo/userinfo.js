const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starCount: 0,
    loveCount: 0,
    submitTotal: 0,
    nickName: "未登录",
    avatarUrl: "/images/icons/icon_anonymous.jpg",
    _id: "",
    city: "",
    country: "",
    gender: "",
    language: "",
    province: "",
    btn: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: "加载中",
      mask: true,
    })
    let openid = wx.getStorageSync("openid");
    let that = this;
    db.collection("userinfo").where({
      _openid: openid
    }).get().then(res => {
      if (res.data.length != 0) {
        that.setData({
          nickName: res.data[0].nickName,
          avatarUrl: res.data[0].avatarUrl,
          _id: res.data[0]._id,
          starCount: res.data[0].starCount,
          loveCount: res.data[0].loveCount,
          submitTotal: res.data[0].submitTotal,
          btn: false
        })
        wx.setStorage({
          key: "avatarUrl",
          data: that.data.avatarUrl,
        })
        wx.setStorage({
          key: "nickName",
          data: that.data.nickName,
        })
        wx.setStorage({
          key: '_id',
          data: that.data._id,
        })
        wx.showToast({
          title: "自动登录",
        })
      }
    })
    wx.hideLoading();
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
    let that = this;
    let openid = wx.getStorageSync("openid");
    db.collection("userinfo").where({
      _openid: openid
    }).get().then(res => {
      if (res.data.length !== 0) {
        that.setData({
          nickName: res.data[0].nickName,
          avatarUrl: res.data[0].avatarUrl,
          _id: res.data[0]._id,
          starCount: res.data[0].starCount,
          loveCount: res.data[0].loveCount,
          submitTotal: res.data[0].submitTotal,
        })
      }
    })
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
  getUserInfo(e) {
    let that = this;
    let openid = wx.getStorageSync("openid");
    const userInfo = e.detail.userInfo;
    that.setData({
      avatarUrl: userInfo.avatarUrl,
      nickName: userInfo.nickName,
      city: userInfo.city,
      province: userInfo.province,
      gender: userInfo.gender,
      language: userInfo.language,
      country: userInfo.country,
      btn: false
    })
    wx.setStorage({
      key: "avatarUrl",
      data: userInfo.avatarUrl
    })
    wx.setStorage({
      key: "nickName",
      data: userInfo.nickName
    })
    db.collection("userinfo").add({
      data: {
        avatarUrl: that.data.avatarUrl,
        nickName: that.data.nickName,
        city: that.data.city,
        province: that.data.province,
        gender: that.data.gender,
        language: that.data.language,
        country: that.data.country,
        starContent: [],
        loveContent: [],
        starCount: 0,
        loveCount: 0,
        submitTotal: 0
      }
    }).then(res => {
      console.log(res);
      that.setData({
        _id: res._id
      })
      wx.setStorage({
        key: "_id",
        data: res._id
      })
    }).catch(err => {
      console.error(err)
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  showQrcode() {
    wx.previewImage({
      urls: ["https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/images/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.JPG?sign=aa43abce29cf14518a3468c94364978b&t=1567818987"],
      current: "https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/images/%E5%BE%AE%E4%BF%A1%E8%B5%9E%E8%B5%8F%E7%A0%81.JPG?sign=aa43abce29cf14518a3468c94364978b&t=1567818987" // 微信赞赏码      
    })
  },
})