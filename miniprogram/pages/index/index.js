Page({
  /**
   * 页面的初始数据
   */
  data: {
    newsList: {},
    total_count: null,
    item_count: null,
    index: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.setNavigationBarTitle({
      title: "往期推送"
    })
    let that = this;
    wx.showLoading({
      title: "加载中",
      mask: true,
    })
    wx.request({
      url: "https://luxinyu.xyz:3000",
      success(res) {
        that.setData({
          newsList: res.data.item,
          item_count: res.data.item_count,
          total_count: res.data.total_count
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    wx.setBackgroundTextStyle({
      textStyle: "dark"
    });
    let that = this;
    wx.request({
      url: "https://luxinyu.xyz:3000",
      success(res) {
        that.setData({
          newsList: res.data.item,
          item_count: res.data.item_count,
          total_count: res.data.total_count
        })
        wx.stopPullDownRefresh();
      }
    })
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

  navigateToBody: function(e) {
    //当发生bindtap事件后，wxml将事件e传递到此函数中
    //e.currentTarget.id即为被bindtap的post对应的微信页面url
    let onTapPostUrl = e.currentTarget.id;
    wx.setStorage({
      key: "onTapPostUrl",
      data: onTapPostUrl,
    })
    wx.navigateTo({
      url: "/pages/index/body/body",
    })
  },

  navigateToDiscuss: function(e){
    //当发生bindtap事件后，wxml将事件e传递到此函数中
    //e.currentTarget.id即为被bindtap的post对应的微信页面url
    let onTapPostUrl = e.currentTarget.id;
    wx.setStorage({
      key: "onTapPostUrl",
      data: onTapPostUrl,
    })
    wx.navigateTo({
      url: "/pages/index/discuss/discuss",
    })
  },

  onTapMark: function(e){
    wx.showToast({
      image: "/images/icons/施工中.png",
      title: "暂未开放",
    })
  }
})