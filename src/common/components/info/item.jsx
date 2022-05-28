import { View } from "@tarojs/components";
// import StatusItem from "@SRC/common/components/item";
import styles from "./index.module.scss";

let statusMap = {
  [0]: {
    info: "条件1",
    style: {
      background: "#21CC5A",
      backgroundBottom: "#21CC5A29",
      fontColor: "#199944FF",
    },
  },
  [1]: {
    info: "条件2",
    style: {
      background: "#FFAD33",
      backgroundBottom: "#FFAD3333",
      fontColor: "#B37924FF",
    },
  },
  [2]: {
    info: "条件3",
    style: {
      background: "#FF5533",
      backgroundBottom: "#FF55331F",
      fontColor: "#E64C2EFF",
    },
  },
  [3]: {
    info: "条件4",
    style: {
      background: "#CCCCCC",
      backgroundBottom: "#CCCCCC33",
      fontColor: "#999999FF",
    },
  },
};

export default (props) => {
  const { data, handleClick, currentKey } = props;
  const { type, info } = data;
  const statusItem = statusMap[type];
  const { info: statusInfo, style } = statusItem;
  return (
    <View
      className={styles.content}
      onClick={() => {
        handleClick(type);
      }}
    >
      <View
        style={{
          backgroundColor: style.background,
        }}
        className={styles.card}
      >
        {statusInfo}
      </View>
      <View
        style={{
          backgroundColor: style.backgroundBottom,
          color: style.fontColor,
        }}
        className={styles.cardNBottom}
      >
        <view className={styles.infoB1}>{info}</view>
      </View>
      {
        type === currentKey&&<View className={styles.checkIcon} />
      }
    </View>
  );
};
