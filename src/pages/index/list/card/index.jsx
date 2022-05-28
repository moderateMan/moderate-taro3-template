import { View } from "@tarojs/components";
import { Item, DetailContent, StationInfo } from "@SRC/common/components";
import styles from "./index.module.scss";

const headerRedner = (props) => {
  const { data } = props;
  const { address, name, healthCode, status, closed, distance } = data;
  // 根据closed判断当前显示什么status
  let type;
  if (closed) {
    type = 3;
  } else {
    type = status;
  }
  return (
    <View style={{ width: "100%" }}>
      <StationInfo address={address} healthCode={healthCode} />
      <View className={styles.headerTop}>
        <View className={styles.headerTopContent}>
          <Item type={type} />
          <View className={styles.fontC}>{name}</View>
        </View>
        <View className={styles.distance}>{`离我 ${(distance / 1000).toFixed(
          2
        )}km`}</View>
        <View className={styles.iconImg}></View>
      </View>
    </View>
  );
};
export default (props) => {
  const { data, handleClick } = props;
  const {
    cityName,
    districtName,
    streetName,
    name, //点名
    servePeople, //服务人群
    status, //状态
    closed,
    count, // 台数
    contactPhone, //电话,
    contactDesc, // 联系方式
    estimateQueue, //预估排队
    longitude,
    latitude,
    healthCode, //健康码 0：绿码；1：黄码；2：红码
    serviceTime,
    distance,
  } = data;

  let address = cityName + districtName + " " + streetName;
  const headerData = {
    address,
    name,
    longitude,
    latitude,
    healthCode,
    status,
    closed,
    distance,
  };

  const detailData = {
    servePeople,
    contactPhone,
    contactDesc,
    count,
    estimateQueue,
    serviceTime,
  };

  return (
    <View
      onClick={() => {
        handleClick?.();
        wx.openLocation({
          longitude: parseFloat(longitude),
          latitude: parseFloat(latitude),
          name: name,
          address: address,
        });
      }}
      className={styles.content}
    >
      {headerRedner({ data: headerData })}
      <View className={styles.line}></View>
      <DetailContent data={detailData} />
    </View>
  );
};
