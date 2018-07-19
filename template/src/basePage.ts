import wepy from 'wepy';
export default class basePage extends wepy.page {
  baseShareInfo = {
    title: "开心熊百宝箱",
    pathInfo: {
      path: "",
      params: {},
    },
    imageUrl: "",
    path:"",
  }
  basePageKey = undefined;
  ChangeParam(url, name, value) {
    if (!url || url.replace(" ", "") == "")
      return url;
    var newUrl = "";
    var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
    var tmp = name + "=" + value;
    if (url.match(reg) != null) {
      newUrl = url.replace(reg, tmp);
    } else {
      if (url.match("[\?]")) {
        newUrl = url + "&" + tmp;
      } else {
        newUrl = url + "?" + tmp;
      }
    }
    return newUrl;
  }
  routeExist(routeString) {
    let exist = false;
    this.getCurrentPages().forEach((element, index) => {
      if (element.route == routeString) {
        exist = true;
        return;
      }
    });
    return exist;
  }
  canBack() {
    return this.getCurrentPages().length > 1;
  }
  goToHome() {
    if (this.routeExist("pages/index"))
      wepy.navigateBack({
        delta: 10
      })
    else {
      wepy.reLaunch({
        url: '/pages/index'
      })
    }
  }
  BaseOnShareAppMessage:(shareOptions:any,baseShareInfo?:any)=>Promise<any>;
  onShareAppMessage = (shareOptions) => {
    this.BaseOnShareAppMessage && this.BaseOnShareAppMessage(shareOptions, this.baseShareInfo);
    this.baseShareInfo.path = this.ChangeParam(this.baseShareInfo.pathInfo.path, "pathInfo", JSON.stringify(this.baseShareInfo.pathInfo));
    console.log(this.baseShareInfo);
    return this.baseShareInfo;
  }
  async GetUserInfoHandle(e) {
    this.$parent.globalData.wxUserInfo = e.detail.userInfo;
    let wxUserInfo = this.$parent.globalData.wxUserInfo;
    if (wxUserInfo) {
      let avatarUrl = wxUserInfo.avatarUrl.replace("/132", "/0");
      let res = await wepy.downloadFile({
        url: avatarUrl
      });
      wxUserInfo.avatarFilePath640 = res.tempFilePath;
    }
    return wxUserInfo;
  }
  LoadingPromise(promise) {
    wepy.showLoading({
      title: '加载中',
    });
    try {
      promise.then((res) => {
        wepy.hideLoading();
    })
      .catch(() => {
        wepy.hideLoading();
      });
    } catch (error) {
      wepy.hideLoading();
    }
  }
  headerHeight:Number;
  baseOnLoad:(options:any,data?:any)=>Promise<any>;
  async onLoad(options,data) {
    if (!this.$parent.globalData.systemInfo)
      this.$parent.globalData.systemInfo = wepy.getSystemInfoSync();
    this.headerHeight = this.$parent.globalData.systemInfo.statusBarHeight + 50;
    if (options.pathInfo)
      options.pathInfo = JSON.parse(options.pathInfo);
    this.baseOnLoad && this.baseOnLoad(options);
    if (this.onShareAppMessage) {
      if (this.basePageKey) {
        // shareInfoApi.GetMPShareInfo(this.basePageKey).then((res) => {
        //   if (res.shareInfo) {
        //     this.baseShareInfo.title = res.shareInfo.title;
        //     this.baseShareInfo.imageUrl = res.shareInfo.imageUrl;
        //     this.baseShareInfo.pathInfo.path = res.shareInfo.path;
        //   }
        // });
      }
    }
  }
}