import { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { getNumInLimit } from "@SRC/common/util";
import { useTaroBoundingRect } from "@SRC/common/hooks";
import { View, ScrollView } from "@tarojs/components";
import styles from "./index.module.scss";
export const BROADCAST_LIVE = Symbol();
export const BROADCAST_REBUILD = Symbol();
const wrapperPrefix = "wrapper";
const scrollviewPrefix = "scrollview";
let isIos = false;
Taro.getSystemInfo({
  success: (res) => {
    isIos = res.system.indexOf("iOS") > -1;
  },
});

export default (props) => {
  const {
    isReset,
    mode = BROADCAST_REBUILD, //rebuild live
    infoStr,
    bgColor = "#FEF6EAFF",
    fontColor = "#FF8800FF",
    fontSize = 12,
    startPercent = 0.5,
    presetId,
  } = props;

  let { offect = 1, ms = 10 } = props;
  offect = getNumInLimit(offect, -5, 5);
  ms = getNumInLimit(ms, -50, 50);
  const [viewWidth, setViewWidth] = useState(0);
  const [isShowInfo, setIsShowInfo] = useState(false);
  const warpperRef = useRef();
  // 滚动节点的key
  const [randomId] = useState(Date.now());
  const scrollviewId = `${scrollviewPrefix}${randomId}`;
  const wrapperId = `${wrapperPrefix}${randomId}`;
  const countTimer = useRef();
  const strLen = useRef(infoStr.length * 14);
  // 滚动content节点
  const scrollEleRef = useRef();

  const getDeaultWidth = () => {
    return warpperRef.current?.width - warpperRef.current?.width * startPercent;
  };
  // 移动偏移量
  const detla = useRef(0);
  let run = () => {
    if (countTimer.current) {
      return;
    }
    countTimer.current = setInterval(() => {
      if (detla.current >= strLen.current + warpperRef.current.width*1.5) {
        detla.current = 0;
      } else {
        detla.current += offect;
      }
      let value = detla.current;
      scrollEleRef.current.scrollTo({ left: value });
    }, ms);
  };
  const toStart = () => {
    detla.current = getDeaultWidth();
    run();
    setIsShowInfo(true);
  };

  useTaroBoundingRect((res) => {
    if (!warpperRef.current) {
      warpperRef.current = res;
      setViewWidth(warpperRef.current.width);
      getEle(() => {
        if (mode != BROADCAST_LIVE) {
          toStart();
        }
      });
    }
  }, wrapperId);

  useEffect(() => {
    // 为了防止初始化动画存在，优化的方法就是等做好了再显示
    if (mode == BROADCAST_LIVE) {
      if (!isReset) {
        setIsShowInfo(false);
        clearTimer();
      } else {
        if (!scrollEleRef.current) {
          getEle(() => {
            toStart();
          });
        } else {
          toStart();
        }
      }
    }
  }, [isReset]);

  const getEle = (callF) => {
    Taro.createSelectorQuery()
      .select("#" + scrollviewId)
      .node()
      .exec((res) => {
        if (!scrollEleRef.current) {
          if (res[0]) {
            scrollEleRef.current = res[0].node;
            scrollEleRef.current.scrollEnabled = false;
            callF();
          } else {
            setTimeout(() => {
              getEle(callF);
            }, 10);
          }
        }
      });
  };

  const clearTimer = () => {
    if (countTimer.current) {
      clearInterval(countTimer.current);
      countTimer.current = null;
    }
  };

  useEffect(() => {
    console.log("重新创建");
    return () => {
      clearTimer();
    };
  }, []);

  const processInfoStr = (str) => {
    strLen.current = str.length * 12;
    // 按道理讲，前后留白，留多少好看。应该取决于该广播条的长度
    let width = viewWidth;
    let blank1 = getBlankSpace(warpperRef.current.width);
    let blank2 = getBlankSpace(warpperRef.current.width * 1.5);
    let temp = blank1 + str + blank2;
    return temp;
  };

  // 获得留白
  const getSpace = () => {
    return "\xa0";
  };

  // 获得留白区域
  const getBlankSpace = (width) => {
    if(!isIos){
      width = width*1.5
    }
    let sum = ((width * 2) / fontSize) * 2; // 1.5倍差不多铺满整个屏幕
    let temp = " ";
    for (let i = 0; i < sum; i++) {
      temp += getSpace();
    }
    return temp;
  };

  return (
    <View
      className={styles.content}
      style={{ backgroundColor: bgColor, color: fontColor, fontSize: fontSize }}
    >
      <View className={styles.braIcon} />
      <View>公告：</View>
      <View
        id={wrapperId}
        className={`${styles.scroll},${styles.overflow},${styles.relative}`}
      >
        <ScrollView
          key={scrollviewId}
          enhanced={true}
          id={scrollviewId}
          scrollX
          scrollWithAnimation
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {viewWidth ? processInfoStr(infoStr) : ""}
        </ScrollView>
      </View>
    </View>
  );
};
