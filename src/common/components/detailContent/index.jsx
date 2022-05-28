import styles from "./index.module.scss";
import { View } from "@tarojs/components";
import Item from "@SRC/common/components/item";

export default (props) => {
  const { data = {} } = props;
  const { status, closed, servePeople, count, serviceTime } = data;
  let type;
  if (closed) {
    type = 3;
  } else {
    type = status;
  }
  return (
    <View className={styles.content}>
      {!isNaN(status * 1) && (
        <View className={styles.detailItem}>
          <View className={styles.left}>测试：</View>
          <View className={styles.right}>
            <View style={{ position: "absolute" }}>
              <Item type={type} />
            </View>
          </View>
        </View>
      )}
      <View className={styles.detailItem}>
        <View className={styles.left}>测试：</View>
        <View className={styles.right}>{serviceTime}</View>
      </View>
      <View className={styles.detailItem}>
        <View className={styles.left}>测试：</View>
        <View className={styles.right}>{servePeople}</View>
      </View>

      <View className={styles.detailItem}>
        <View className={styles.left}>测试：</View>
        <View className={styles.right}>{count}</View>
      </View>
    </View>
  );
};
