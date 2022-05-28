/**
 * @function 通过传入两个经纬度，计算出实际距离（单位：m）
 * @param {function} lat1  纬度1
 * @param {number} lng1  经度1
 * @param {number} lat2  纬度2
 * @param {number} lng2  经度2
 * @return {number} 返回距离（单位：m）
 */
export function getDistance(lat1, lng1, lat2, lng2) {
  // 地球平均半径
  const EARTH_RADIUS = 6378137;
  // 把经纬度转为度（°）
  // 纬度
  let degree_lat1 = (lat1 * Math.PI) / 180.0;
  let degree_lat2 = (lat2 * Math.PI) / 180.0;
  let a = degree_lat1 - degree_lat2;
  // 经度
  let degree_lng1 = (lng1 * Math.PI) / 180.0;
  let degree_lng2 = (lng2 * Math.PI) / 180.0;
  let b = degree_lng1 - degree_lng2;
  // 距离 （单位：米）
  let s =
    2 *
    Math.asin(
      Math.sqrt(
        Math.pow(Math.sin(a / 2), 2) +
          Math.cos(degree_lat1) *
            Math.cos(degree_lat2) *
            Math.pow(Math.sin(b / 2), 2)
      )
    );
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;
}

// 全局封住的log，这样可以统一注释，防止到处都是log
export function G_Log(str) {
  console.log(str);
}


/**
 * @function 防抖，直接执行，间隔内防止再执行
 * @param {function} fn  目标的函数
 * @param {number} delay  延迟
 * @param {number} target  this对象
 * @return {function} 包裹后的函数
 */
export function debounce(fn, delay, target) {
  // 定时器，用来 setTimeout
  let timer;
  return function() {
    // 存在timer说明不久前执行了操作
    if (!timer) {
      // 立刻执行，不等的那种
      fn.apply(target, Array.from(arguments));
      // 下面的单纯就是一个切换flag的逻辑
      timer = setTimeout(function() {
        clearTimeout(timer);
        timer = null;
      }, delay);
    }
  };
}



export const getNumInLimit = (value,min,max)=>{
  return Math.min(Math.max(value,min),max)
}