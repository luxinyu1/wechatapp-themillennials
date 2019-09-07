// pages/userinfo/upload/wxOfficalAccount/wxOfficalAccount.js
const db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressValue: "",
    textValue: ""
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
    wx.showShareMenu({
      withShareTicket: true
    })
    return {
      title: "向21世纪旗手投稿",
      imageUrl: "/images/转发封面.png",
    }
  },

  CopyLink(e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.link,
      success: res => {
        console.log(res);
      }
    })
  },
  formSubmit: function(e) {
    let that = this;
    let _id = wx.getStorageSync("_id");
    let jsonData = e.detail.value;
    const address = jsonData.address;
    const article = jsonData.article;
    const addressResult = verifyAddress(address);
    const articleResult = verifyArticle(article);
    // If adress is invalid
    if (addressResult == false && articleResult == false) {
      openAlert("看起来你输错了什么哦");
    } else if (addressResult == false) {
      openAlert("邮箱地址输错啦");
    } else if (articleResult == false) {
      openAlert("作品内容不能为空哦");
    } else {
      db.collection("article").add({
        data: {
          address: address,
          article: article,
        }
      }).then(res => {
        console.log("发射成功啦！", res)
        wx.showModal({
          title: "提示",
          content: "发射成功啦",
          showCancel: false
        })
        that.setData({
          addressValue: "",
          textValue: "",
        })
        db.collection("userinfo").doc(_id).update({
          data:{
            "submitTotal": db.command.inc(1)
          }
          
        })
      }).catch(res => {
        console.log("发射失败", res)
      })
    }
  }
})

function verifyAddress(address) {
  const verifier = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  return verifier.test(address);
}

function verifyArticle(article) {
  return (!article == "");
}

function openAlert(content) {
  wx.showModal({
    content: content,
    showCancel: false
  });
}