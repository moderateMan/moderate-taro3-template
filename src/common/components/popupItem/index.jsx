import { View } from "@tarojs/components";
import styles from "./index.module.scss";

export default (props = {}) => {
  const { handleClick, data } = props;
  const { name = "info" } = data;
  return (
    <View onClick={handleClick} className={styles.content}>
      {name}
    </View>
  );
};
