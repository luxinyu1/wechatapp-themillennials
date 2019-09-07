// pages/userinfo/settings/renewUserinfo/renewUserinfo.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "更新个人信息"
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

  getUserInfo(e) {
    let _id = wx.getStorageSync("_id");
    const userInfo = e.detail.userInfo;
    wx.setStorage({
      key: "avatarUrl",
      data: userInfo.avatarUrl,
    })
    wx.setStorage({
      key: "nickName",
      data: userInfo.nickName,
    })
    db.collection("userinfo").doc(_id).update({
        data: {
          avatarUrl: userInfo.avatarUrl,
          nickName: userInfo.nickName,
          city: userInfo.city,
          province: userInfo.province,
          gender: userInfo.gender,
          language: userInfo.language,
          country: userInfo.country
        }
      }).then(res => {
        console.log(res);
        wx.showToast({
          title: "更新成功",
        })
        wx.navigateBack({});
      })
      .catch(console.error)
  }
})