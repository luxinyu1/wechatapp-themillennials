// pages/daily/comments/comments.js
const util = require("../../../utils/util.js");
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    date: "",
    openid: "",
    avatarUrl: "",
    nickName: "",
    messages: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setBackgroundTextStyle({
      textStyle: "dark"
    });
    wx.setNavigationBarTitle({
      title: "留言板"
    })
    let date = util.formatDate(new Date());
    this.setData({
      date: date
    });
    this.getMessages();
    this.setData({
      openid: wx.getStorageSync("openid"),
      avatarUrl: wx.getStorageSync("avatarUrl"),
      nickName: wx.getStorageSync("nickName")
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
    this.getMessages();
    wx.stopPullDownRefresh();
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

  getMessages: function() {
    db.collection("messages").where({
      date: this.data.date
    }).get().then(res => {
      this.setData({
        messages: res.data
      })
    })
  },
  formSubmit: function(e) {
    if (this.data.openid && this.data.nickName && this.data.avatarUrl) {
      if (e.detail.value.text != "") {
        db.collection("messages").add({
          data: {
            text: e.detail.value.text,
            avatarUrl: this.data.avatarUrl,
            nickName: this.data.nickName,
            date: this.data.date,
            likeList: []
          }
        }).then(res => {
          console.log(res)
          this.onPullDownRefresh();
        }).catch(err => {
          console.error(err)
        })
        this.setData({
          inputText: ""
        })
      }
    } else {
      let that = this;
      if (e.detail.value.text !== "") {
        wx.showModal({
          title: "你没有登录哦",
          content: "将以匿名方式发送留言",
          success: function(res) {
            if (res.confirm) {
              db.collection("messages").add({
                data: {
                  text: e.detail.value.text,
                  avatarUrl: "https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/images/icon_anonymous.jpg?sign=926828e7b0b1af5b33b0758e397e8884&t=1567820458",
                  nickName: "匿名",
                  date: that.data.date
                }
              }).then(res => {
                console.log(res)
                that.onPullDownRefresh();
              }).catch(err => {
                console.error(err)
              })
              that.setData({
                inputText: ""
              })
            }
          }
        })
      }
    }
  }
})