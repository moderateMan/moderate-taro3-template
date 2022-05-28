import { View } from "@tarojs/components";
import styles from "./index.module.scss";

let datas = {
  [0]: {
    info: "畅通",
    style: {
      background: "#21CC5A"
    }
  },
  [1]: {
    info: "忙碌",
    style: {
      background: "#FFAD33"
    }
  },
  [2]: {
    info: "拥堵",
    style: {
      background: "#FF5533"
    }
  },
  [3]: {
    info: "休息",
    style: {
      background: "#CCCCCC"
    }
  }
};
export default props => {
  const { type = 0 } = props;
  const data = datas[type];
  return (
      <View className={styles.content}>
        <View style={data.style} className={styles.infoA}>
          {data.info}
        </View>
      </View>
  );
};
