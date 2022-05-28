import { useRef, useState, useCallback, useEffect } from "react";
import { useDidShow } from "@tarojs/taro"; // Taro 专有 Hooks
import { CustomWrapper, View } from "@tarojs/components";
import { ScrollView } from "@tarojs/components";
import { AtActivityIndicator } from "taro-ui";
import { observer } from "mobx-react";
import { SelectPro, Empty, BROADCAST_LIVE } from "@SRC/common/components";
import { G_Log } from "@SRC/common/util";
import { useStores } from "@SRC/common/hooks";
import { fetchList } from "../service";
import Card from "./card";
import styles from "./index.module.scss";

const pageCount = 200; //接口请求数量
let isLimit = false; //当一个页码请求为空，限制翻页

const ListView = (props) => {
  const { isCurrent } = props;
  const { globalStore } = useStores();
  const { posData, noticeArr } = globalStore;
  const [isFresh, setIsFresh] = useState(0); // 触发请求接口effect的flag
  const [isInit, setIsInit] = useState(true); // 是否初始化地图
  const [pageIndex, setPageIndex] = useState(1); //请求页面的页数 TODO 目前没有翻页，直接全部请求
  const [selectProData, setSelectProData] = useState({}); // 组件的参数
  const [infoItemType, setInfoItemType] = useState(); // 组件的参数
  const [isShowBannar, setIsShowBannar] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateRef = useRef(1);
  const ref = useRef();
  const listState = useState([]);
  const [cardArr, setCards] = listState;
  const toFetchList = useCallback((params = {}) => {
    setIsLoading(true);
    let temp = {
      page: {
        pageNo: pageIndex,
        pageSize: pageCount,
      },
      criteria: {},
    };
    if (infoItemType === 3) {
      temp.criteria.closed = 1;
    } else {
      if (!isNaN(infoItemType * 1)) {
        temp.criteria.closed = 0;
      }
      temp.criteria.status = infoItemType;
    }
    const { dataA = {}, dataB = {}, dataC = {} } = selectProData;
    if (dataA.name) {
      temp.criteria.districtName = dataA.name;
    }
    if (dataB.name) {
      temp.criteria.streetName = dataB.name;
    }
    if (!isNaN(dataC.code)) {
      temp.criteria.serveType = dataC.code;
    }
    if (posData) {
      params.centerLng = posData.longitude;
      params.centerLat = posData.latitude;
    }
    temp.criteria = { ...temp.criteria, ...params, valid: 1 };
    fetchList(temp)
      .then((res) => {
        const { list = [] } = res?.data?.data || {};
        debugger
        let tempArr = [...cardArr, ...list];
       
        setCards(tempArr);
        let isEmpty = tempArr.length == 0;
        if (list.length) {
          updateRef.current = temp.page.pageNo;
        }
        setIsEmpty(isEmpty);
        if (list.length == 0) {
          isLimit = true;
        } else {
          isLimit = false;
        }
      })
      .catch((err) => {
        G_Log(err);
        setIsEmpty(true);
      })
      .finally(() => {
        setIsLoading(false);
        if (isInit) {
          setIsInit(false);
        }
      });
  });

  useEffect(() => {
    if (posData) {
      toFetchList();
    }
  }, [selectProData, pageIndex, infoItemType, isFresh, posData]);

  const handleSelectChange = useCallback((data) => {
    setPageIndex(1);
    setCards([]);
    setSelectProData(data);
    setIsFresh(Date.now());
  }, []);
  const handleScroll = () => {
    let newPageIndex = pageIndex;
    //当限制了，说明当前的页面请求的数据为空，不应该再翻页了。
    if (!isLimit) {
      newPageIndex += 1;
    }
    setPageIndex(newPageIndex);
  };
  return (
    <View className={styles.content}>
      <SelectPro
        noticeArr={noticeArr}
        handleRefresh={() => {
          setCards([]);
          toFetchList();
        }}
        infoItemType={infoItemType}
        handleInfoItemClick={(type) => {
          setPageIndex(1);
          setCards([]);
          if (infoItemType === type) {
            setInfoItemType(undefined);
          } else {
            setInfoItemType(type);
          }
          setIsFresh(Date.now());
        }}
        handleChange={handleSelectChange}
        isShowBannar={isShowBannar}
      ></SelectPro>
      {/* <Broadcast
          noticeText={"温馨提示"}
          fontColor={"#21CC5A"}
          bgColor={"#21CC5A"}
        /> */}

      <View className={styles.listWrapper}>
        {isEmpty && <Empty />}
        <CustomWrapper>
          <ScrollView
            lowerThreshold={100}
            onScrollToLower={() => {
              handleScroll();
            }}
            onScroll={(e) => {
              const { scrollTop } = e.detail;
              let flag = scrollTop < 500;
              if (isShowBannar != flag) {
                setIsShowBannar(flag);
              }
            }}
            scrollY
            className={styles.tabView}
            ref={ref}
          >
            {cardArr.map((item, index) => {
              return (
                <Card
                  data={item}
                  key={item.id}
                ></Card>
              );
            })}
          </ScrollView>
        </CustomWrapper>
      </View>
      <AtActivityIndicator
        mode="center"
        isOpened={isLoading}
        size={32}
      ></AtActivityIndicator>
    </View>
  );
};

export default observer(ListView);
