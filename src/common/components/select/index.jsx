import { useEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import { AtButton, AtIcon } from "taro-ui";
import PopupItem from "@SRC/common/components/popupItem";
import PopupComp from "@SRC/common/components/popup";
import { debounce } from "@SRC/common/util";
import styles from "./index.module.scss";

let typeA = 0;
let typeB = 1;
let typeC = 2;
export default (props) => {
  const callRef = useRef();
  const callWrapperRef = useRef();
  const [type, setType] = useState(typeA);

  let {
    handleClick,
    list = [],
    handleItemClick = () => {},
    infos = [],
    handleRefresh,
  } = props;
  callRef.current = handleRefresh;
  if (!callWrapperRef.current && handleClick) {
    callWrapperRef.current = debounce(() => {
      callRef.current();
    }, 1000);
  }
  list = [
    { name: ["全市区", "全市街道", "全部"][type], _value: "all" },
    ...list,
  ];
  const [popupVisable, setPopupVisable] = useState(false);
  const handleSelectClick = (type) => {
    setType(type);
    handleClick(type, () => {
      setPopupVisable(true);
    });
  };

  return (
    <View className={styles.content}>
      <View style={{ display: "flex", justifyContent: "space-between" }}>
        <AtButton
          size="small"
          className={styles.item}
          onClick={() => {
            handleSelectClick(typeA);
          }}
        >
          {infos[0] || "全市区"}
          <View className={styles.btnIcon}></View>
        </AtButton>
        <AtButton
          size="small"
          className={styles.item}
          onClick={() => {
            handleSelectClick(typeB);
          }}
        >
          {infos[1] || "全市街道"}
          <View className={styles.btnIcon}></View>
        </AtButton>
        <AtButton
          size="small"
          className={styles.item}
          onClick={() => {
            handleSelectClick(typeC);
          }}
          key={Date.now()}
        >
          {infos[2] || "查询服务"}
          <View className={styles.btnIcon}></View>
        </AtButton>
        <AtButton
          size="small"
          className={styles.itemEx}
          onClick={() => {
            callWrapperRef.current();
          }}
        >
          <View style={{ position: "relative", left: "-3px" }}>{"刷新"}</View>
        </AtButton>
        <PopupComp
          title={["选择区域", "选择街道", "查询服务"][type]}
          handleClose={() => {
            setPopupVisable(false);
          }}
          popupVisable={popupVisable}
        >
          {list.map((item, index) => {
            return (
              <PopupItem
                handleClick={() => {
                  const { _value } = item;
                  if (_value == "all") {
                    item = {};
                  }
                  handleItemClick(type, item);
                  setPopupVisable(false);
                }}
                data={item}
                key={item.name}
              />
            );
          })}
        </PopupComp>
      </View>
    </View>
  );
};
