/**
 * video 0.0.1
 */
//img.mumiweixin.com/v11.mp4
//3gimg.qq.com/mig_market/activity/act/asset/wifi_steward_h5/video/miss_video_20180929_3.mp4
const videoUrl = 'https://img.mumiweixin.com/v11.mp4';

interface I_V {
  wrap: HTMLElement;
  video: HTMLVideoElement;
  init: () => void; // 初始化
  getEle: (name: string) => Element; // 获取元素
  playHr: () => void; // 视频播放
  poster: () => void; // 封面
}

interface I_V_arg {
  wrap: string;
  target: string;
  posterImg?: HTMLImageElement;
}

class V_player implements I_V {
  wrap: HTMLElement;
  video: HTMLVideoElement;
  posterImg: HTMLImageElement;
  constructor(arg: I_V_arg) {
    const { wrap, target }: I_V_arg = arg;
    this.wrap = this.getEle(wrap) as HTMLElement;
    this.video = this.getEle(target) as HTMLVideoElement;
  }
  init() {
    const video = this.video;
    // video.addEventListener('loadeddata', () => {
    //   console.log('loadeddata'); // 2
    // }, false);
    // video.addEventListener('canplay', () => {
    //   console.log('canplay'); // 3
    // }, false);
    // video.addEventListener('loadedmetadata', () => {
    //   console.log('loadedmetadata'); // 1
    // }, false);
    // video.addEventListener('ended', () => {
    //   console.log('loadedmetadata'); // 1
    // }, false);
    this.poster(); // 封面
    this.playHr(); // 播放
    // video.src = videoUrl;
  }
  getEle(name: string) {
    /** 
     * 获取元素
     */
    return document.querySelector(name);
  }
  playHr() {
    /**
     * 视频播放
     * iOS和Android都存在兼容问题
     */
    const video = this.video;
    video.addEventListener('canplay', () => {
      console.log('-> canplay');
      this.posterImg && this.posterImg.classList.remove('action'); // 隐藏封面
      video.play(); // 开始播放
    }, false)
  }
  poster() {
    /**
     * 封面
     * Android poster属性存在兼容问题，解决方案是使用一张图片覆盖在video上
     * 统一处理：获取视频第一帧，作为封面图片，播放时隐藏
     */
    this.video.addEventListener(
      'loadeddata', // 第一帧加载完毕事件
      (e: Event) => {
        console.log('-> loadeddata');
        const video = e.target as HTMLVideoElement, // 获取视频元素
          vWidth = video.videoWidth, // 视频源宽
          vHeight = video.videoHeight, // 视频源高
          canvas: HTMLCanvasElement = document.createElement('canvas'), // 创建画布
          context: CanvasRenderingContext2D = canvas.getContext('2d'); // 上下文
        canvas.width = vWidth; // 画布默认宽300
        canvas.height = vHeight; // 画布默认高150
        context.drawImage(video, 0, 0, vWidth, vHeight); // 首帧绘制到画布
        const base64: string = canvas.toDataURL(); // 画布内容转base64
        const img: HTMLImageElement = new Image(); // 空图片
        this.posterImg = img;
        img.className = 'poster_img action'; // 封面样式
        img.onload = () => {
          this.wrap.appendChild(img); // 封面追加进视图
        };
        img.src = base64;
      },
      false
    );
  }
}

const v = new V_player({
  wrap: '.wrap',
  target: '#video'
});
v.init();
