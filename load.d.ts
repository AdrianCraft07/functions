declare function load(config?:{ loadingText: String, loadingAnimation:String[], loadingSpeed:Number, loadingFormat:String, endLoading: () => void }): {log: (...data: any[])=>void;end:() => void}
const animation = {
  loadingAnimation: [''],
  loadingSpeed: 0
}
load.animations = {
  bars: animation,
  dots: animation,
  dots2: animation,
  line: animation,
  line2: animation,
  line3: animation,
}
export = load;