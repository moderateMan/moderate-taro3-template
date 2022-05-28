/**
 * 网络请求配置
 */
import Taro from "@tarojs/taro";
import { G_Log } from "@SRC/common/util";
/*联调服务器地址，前提是该地址的服务支持跨域请求*/

let isMock = true;
let publicPath = "http://127.0.0.1:9527"
class Request {
  /**
   * 封装get方法
   * @param url  请求url
   * @param params  请求参数
   * @returns {Promise}
   */
  get(url, params = {}) {
    let temp = {
      url: publicPath + url, //仅为示例，并非真实的接口地址
      method: "get",
      data: params,
      header: {
        "content-type": "application/json", // 默认值
      },
      success: function(res) {
        G_Log(res.data);
      },
    };
    return Taro.request(temp);
  }

  /**
   * 封装post请求
   * @param url
   * @param params
   * @returns {Promise}
   */
  post(url, params = {}, config = {}) {
    let temp = {
      url: publicPath + url, //仅为示例，并非真实的接口地址
      method: "post",
      data: params,
      header: {
        "content-type": "application/json", // 默认值
      },
      success: function(res) {
        G_Log(res.data);
      },
    };
    return Taro.request(temp);
  }
}

export default new Request();
