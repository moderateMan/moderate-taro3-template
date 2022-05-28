import { View } from "@tarojs/components";
import styles from "./index.module.scss";
import { AtFloatLayout } from "taro-ui";

export default (props) => {
  const { title = "title", handleClose, children, popupVisable } = props;
  return (
    <View className={styles.content}>
      <AtFloatLayout
        title={title}
        onClose={handleClose}
        isOpened={popupVisable}
      >
        <View
          style={{
            overflowY: "auto",
          }}
        >
          {children}
        </View>
      </AtFloatLayout>
    </View>
  );
};
