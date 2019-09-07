// pages/userinfo/settings/cleanUserinfo/cleanUserinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  cleanUserinfo:function(){
    let _id = wx.getStorageSync("_id");
    const db = wx.cloud.database();
    db.collection("userinfo").doc(_id).remove({
      success: function (res) {
        console.log(res.data)
        wx.showToast({
          title: "清除成功啦",
          mask: true
        })
      }
    })
    wx.clearStorageSync();
  },

})