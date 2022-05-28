import Taro from "@tarojs/taro";
import { useCallback, useEffect, useRef } from "react";

export default (callF, id) => {
  const callRef = useRef();
  callRef.current = callF;
  // 超级好用，获得taro节点的盒模型信息
  const getEleClientRect = useCallback((id) => {
    if (!id) {
      return;
    }
    Taro.createSelectorQuery()
      .select("#" + id)
      .boundingClientRect((res) => {
        if (res) {
          callRef.current(res);
        } else {
          setTimeout(() => {
            getEleClientRect(id);
          }, 10);
        }
      })
      .exec();
  });
  useEffect(() => {
    getEleClientRect(id);
  }, [id]);
};
