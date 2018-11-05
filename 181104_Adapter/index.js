console.log('0.0.8');

function Adapter() {}

Adapter.prototype = {
  constructor: Adapter,
  planW: 375, // 设计稿宽
  planH: 812, // 设计稿高
  safeW: 375, // 安全区宽
  safeH: 603, // 安全区高
  innerWidth: 0, // 可视区宽
  innerHeight: 0, // 可视区高
  wrap: null, // 容器元素
  init: function() {
    this.wrap = this.getEle('.wrap');
    this.getDeviceMsg();
    this.loadImg();
  },
  getEle: function(eleName) {
    return document.querySelector(eleName);
  },
  getDeviceMsg: function() {
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight;
  },
  loadImg: function() {
    const img = new Image();
    img.crossOrigin = '';
    const _self = this;
    img.onload = function() {
      _self.wrap.appendChild(img);
      _self.autoFit(); // 自适应
    }
    // img.src = '//3gimg.qq.com/mig_market/activity/act/h/1810/x.jpg';
    // img.src = '//3gimg.qq.com/mig_market/activity/act/h/x_2.jpg';
    img.src = './x_2.jpg';
  },
  autoFit: function() {
    const planW = this.planW,
      planH = this.planH,
      safeW = this.safeW,
      safeH = this.safeH,
      innerWidth = this.innerWidth,
      innerHeight = this.innerHeight;
    // 计算缩放比
    // const safeScale = safeH / safeW; // 安全区
    // const innerScale = innerHeight / innerWidth; // 可视区
    // 等比例换算
    const scale = innerWidth / planW;
    const zoomPlanH = planH * scale; // 等比缩放后的设计稿高度
    // 未优化的偏移量
    const moveStep = (zoomPlanH - innerHeight) / 2;
    console.log('moveStep -> ' + moveStep);
    this.wrap.firstElementChild.style.top = -moveStep +'px';
  }
};

const pageAdapter = new Adapter();
pageAdapter.init();
