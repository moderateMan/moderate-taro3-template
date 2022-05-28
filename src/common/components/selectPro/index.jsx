import { useState } from "react";
import { View } from "@tarojs/components";
import { Select, Info, Broadcast } from "@SRC/common/components";
import styles from "./index.module.scss";
import { fetchRegion } from "./servcie";

// 区域级别 1：国家；2：省；3：市；4：区县；5：街道
const LEVEL_A = 4;
const LEVEL_B = 5;
export default (props) => {
  const {
    isShowInfo = true,
    isShowBannar = false,
    handleChange,
    handleInfoItemClick,
    infoItemType,
    handleRefresh,
    noticeOption,
    noticeArr,
  } = props;
  const noticeInfo = noticeArr?.[0];

  const [selectlist, setSelectlist] = useState([]);
  // 地图
  const regionStateA = useState({});
  const regionStateB = useState({});
  const regionStateC = useState({});

  const handleClickA = (callF) => {
    fetchRegion({
      grade: LEVEL_A,
      parentCode: "320600",
    }).then((res) => {
      const { data } = res.data;
      setSelectlist(data?.list || []);
      callF?.();
    });
  };
  const handleClickB = (callF) => {
    let temp = {
      grade: LEVEL_B,
    };
    let parentCode = regionStateA[0].code;
    if (parentCode) {
      temp.parentCode = parentCode;
    }
    fetchRegion(temp).then((res) => {
      const { data } = res.data;
      setSelectlist(data?.list || []);
      callF?.();
    });
  };
  const handleClickC = (callF) => {
    setSelectlist([
      {
        name: "选项1",
        code: 1,
      },
      {
        name: "选项2",
        code: 2,
      },
    ]);
    callF?.();
  };
  const handlers = [handleClickA, handleClickB, handleClickC];
  const handleClick = async (type, callF) => {
    setSelectlist([]);
    handlers[type]?.(callF);
  };

  // 点击设置区域
  const handleSelectItemClick = (type, data) => {
    let temp = {
      dataA: regionStateA[0],
      dataB: regionStateB[0],
      dataC: regionStateC[0],
    };
    if (type === 0) {
      if (!data.name) {
        regionStateB[1]({});
      }
      temp.dataA = data;
      regionStateA[1](data);
    } else if (type === 1) {
      temp.dataB = data;
      regionStateB[1](data);
    } else {
      temp.dataC = data;
      regionStateC[1](data);
    }
    handleChange?.(temp);
  };

  return (
    <View className={styles.content}>
      <View className={styles.topPart}>
        {isShowInfo && (
          <View>
            {isShowBannar && (
              <View className={styles.bannar}>
                <View className={styles.logo}></View>
                <View className={styles.title}>Moderate</View>
              </View>
            )}
            <Info
              infoItemType={infoItemType}
              handleClick={handleInfoItemClick}
            />
          </View>
        )}
        {noticeInfo && (
          <Broadcast {...noticeOption} infoStr={noticeInfo || ""} ms={25} />
        )}
        <View className={styles.warnInfo}></View>
        <Select
          handleRefresh={handleRefresh}
          list={selectlist}
          infos={[
            regionStateA[0].name,
            regionStateB[0].name,
            regionStateC[0].name,
          ]}
          handleItemClick={handleSelectItemClick}
          handleClick={handleClick}
        />
      </View>
    </View>
  );
};
