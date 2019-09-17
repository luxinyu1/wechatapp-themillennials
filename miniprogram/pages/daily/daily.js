const util = require("../../utils/util.js");
const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    greetingMessageChinese:"早安",
    backgroundSrc: "https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/backgrounds/3.jpg?sign=e844e2724859c66335abe8bb8d561a2d&t=1567818841",
    date: "",
    sentenceBlock: "簌簌一梦 游于其中\n一游生根 一梦消沉\n日月变换 热闹不断\n一断而立 一幻期颐",
    informationBlock: "Photo by Vincent Zhu. All rights reserved.",
    iconStatus: "musicfill",
    musicSrc: "https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/background_music/Lana%20Del%20Rey%20-%20Summer%20Wine.mp3?sign=3f3cd482360fae5099116ce41c509d50&t=1568730143",
    musicTitle: "Summer Wine",
    musicEPName: "Summer Wine",
    musicSinger: "Lana Del Rey",
    musicCoverImgUrl: "",
    musicOnOff: true,
    loveIconOnOff: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    let hour = util.getHour(new Date());
    if (4<=hour&&hour<=11){
      wx.setNavigationBarTitle({
        title: "早安",
      })
    }else if(11<=hour&&hour<=15){
      wx.setNavigationBarTitle({
        title: "午安",
      })
    }else if(21<=hour||hour<=2){
      wx.setNavigationBarTitle({
        title: "晚安",
      })
    }else{
      wx.setNavigationBarTitle({
        title: "日签",
      })
    }
    let date = util.formatDate(new Date());
    this.setData({
      date: date
    });
    backgroundAudioManager.title = this.data.musicTitle;
    backgroundAudioManager.epname = this.data.musicEPName;
    backgroundAudioManager.singer = this.data.musicSinger;
    backgroundAudioManager.coverImgUrl = this.data.musicCoverImgUrl;
    // 设置了 src 之后会自动播放
    backgroundAudioManager.src = this.data.musicSrc;
    wx.showModal({
      title: "日签征集",
      content: "日签板块需要更多的素材才能持续运作😊",
      showCancel: true,
      confirmText: "投稿",
      success: function (res) {
        if (res.cancel) {
        } else {
          wx.navigateTo({
            url: "/pages/userinfo/upload/dailyUpload/dailyUpload",
          })
        }
      },
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  musicStatusChanged: function() {
    let previousStatus = this.data.musicOnOff;
    let nowStatus = !previousStatus;
    this.setData({
      musicOnOff: nowStatus
    })
    if (this.data.musicOnOff) {
      backgroundAudioManager.play();
      this.setData({
        iconStatus: "musicfill"
      })
    } else {
      backgroundAudioManager.pause();
      this.setData({
        iconStatus: "musicforbidfill",
      })
    }
  },
  loveIconStatusChanged: function() {
    let previousStatus = this.data.loveIconOnOff;
    let nowStatus = !previousStatus;
    this.setData({
      loveIconOnOff: nowStatus
    })
    wx.showToast({
      image: "/images/icons/施工中.png",
      title: "暂未开放",
    })
  }
});