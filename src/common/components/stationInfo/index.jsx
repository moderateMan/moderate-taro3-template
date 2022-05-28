import { View } from "@tarojs/components";
import styles from "./index.module.scss";
// 0：绿码；1：黄码；2：红码
const healthCodeItems = [
  <View className={styles.fontB}>
    <View className={styles.point}></View>信息1
  </View>,
  <View className={styles.fontBYellow}>
    <View className={styles.pointYellow}></View>信息2
  </View>,
  <View className={styles.fontBRed}>
    <View className={styles.pointRed}></View>信息3
  </View>
];

export default props => {
  const { address, healthCode } = props;
  return (
    <View className={styles.content}>
      <View className={styles.fontA}>{address}</View>
      {healthCodeItems[healthCode]}
    </View>
  );
};
