import { View } from "@tarojs/components";
import styles from "./index.module.scss";
export default () => {
  return (
    <View className={styles.content} >
      <View style={{display:'flex',justifyContent:'center',marginTop:"30%"}}>
        <View className={styles.empty}></View>
      </View>
      <View className={styles.info} >无数据</View>
    </View>
  );
};
