
import { View } from "@tarojs/components";
import styles from "./index.module.scss";
import Item from "./item";
let datas = [
  { type: 0, info: "描述1" },
  { type: 1, info: "描述2" },
  { type: 2, info: "描述3" },
  { type: 3, info: "描述4" },
];
export default (props) => {

  const { handleClick = () => {},infoItemType } = props;

  return (
    <View className={styles.content}>
      <View className={styles.table}>
        {datas.map((item, index) => {
          return (
            <Item
              currentKey={infoItemType}
              handleClick={() => {
                handleClick(index);
              }}
              data={item}
              key={index}
            />
          );
        })}
      </View>
    </View>
  );
};
