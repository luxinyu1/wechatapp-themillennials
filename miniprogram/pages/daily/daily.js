const util = require("../../utils/util.js");
const backgroundAudioManager = wx.getBackgroundAudioManager();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backgroundSrc: "https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/backgrounds/3.jpg?sign=e844e2724859c66335abe8bb8d561a2d&t=1567818841",
    date: "",
    sentenceBlock: "簌簌一梦 游于其中\n一游生根 一梦消沉\n日月变换 热闹不断\n一断而立 一幻期颐",
    informationBlock: "Photo by Vincent Zhu. All rights reserved.",
    iconStatus: "musicfill",
    musicSrc: "https://7468-themillennials-yw6qu-1259666961.tcb.qcloud.la/background_music/%E9%82%B5%E5%A4%B7%E8%B4%9D%20-%20%E6%88%91%E4%BB%AC.mp3?sign=a12d9fd655ccefacdec024f7b39e85d6&t=1567818810",
    musicTitle: "我们",
    musicEPName: "我们",
    musicSinger: "邵夷贝",
    musicCoverImgUrl: "",
    musicOnOff: true,
    loveIconOnOff: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: "日签"
    })
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
      title: "公告",
      content: "由于小程序目前处于试运行阶段，日签板块仍然缺少素材,暂时无法做到日更。\n我们十分希望你能通过小程序将符合要求的图片投递给我们。😊",
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