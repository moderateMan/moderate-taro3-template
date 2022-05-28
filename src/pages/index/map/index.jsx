import { useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { View, Map } from "@tarojs/components";
import { AtButton, AtIcon } from "taro-ui";
import { observer } from "mobx-react";
import { useStores } from "@SRC/common/hooks";
import {
  DetailContent,
  StationInfo,
  SelectPro,
  Popup,
  BROADCAST_LIVE,
} from "@SRC/common/components";
import { getDistance, G_Log } from "@SRC/common/util";
import { fetchMapMarkerList, fetchDetail } from "../service";
import { imgPathA, imgPathB, imgPathC, imgPathD } from "@SRC/assets/img";
import styles from "./index.module.scss";

let imgs = [imgPathA, imgPathB, imgPathC, imgPathD];
let btnInfoStr = ["查看周边", "查看全部"];

const MapView = (props) => {
  const { globalStore } = useStores();
  const { posData, noticeArr } = globalStore;
  const { isCurrent } = props;
  const testFlag = useRef(false);
  const allGeometrieList = useRef();
  const surroundMap = useRef();
  const [markerList, setMarkerList] = useState([]);
  const [disFlag, setDisFlag] = useState(false);
  const [currentPos, setCurrentPos] = useState(null);
  const [isFresh, setIsFresh] = useState(0);
  const [selectProData, setSelectProData] = useState({});
  const [detailContent, setDetailContent] = useState({});
  const [popupVisable, setPopupVisable] = useState(false);
  const [infoItemType, setInfoItemType] = useState();
  const handleInfoItemClick = (type) => {
    if (infoItemType === type) {
      setInfoItemType(undefined);
    } else {
      setInfoItemType(type);
    }
    setIsFresh(Date.now());
  };

  const toAddMarker = (geometrieList) => {
    setMarkerList(geometrieList);
  };
  const getDisMarker = () => {
    testFlag.current = true;
    return new Promise((resolve) => {
      surroundMap.current.getCenterLocation().then((data) => {
        const { longitude, latitude } = data;
        let centerpos = {
          latitude,
          longitude,
        };
        let list =
          allGeometrieList.current.filter((item) => {
            let pos1 = centerpos;
            let pos2 = { latitude: item.latitude, longitude: item.longitude };
            let dis = getDistance(
              parseFloat(pos1.latitude),
              parseFloat(pos1.longitude),
              parseFloat(pos2.latitude),
              parseFloat(pos2.longitude)
            );
            return dis < 2000.0;
          }) || [];
        console.log("两公里内有" + list.length);
        resolve({ list, centerpos });
      });
    });
  };
  const toShowDisMarker = () => {
    getDisMarker().then(({ list, centerpos }) => {
      toAddMarker(list);
    });
  };

  const toFetchMapMarkerList = (callF) => {
    let temp = {
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
    fetchMapMarkerList(temp).then((res) => {
      const { data } = res.data;
      const { list = [] } = data || {};
      let geometrieList = [];
      list.forEach((item) => {
        const { latitude, longitude, closed, status } = item;
        let styleId;
        if (closed) {
          styleId = imgs[3];
        } else {
          styleId = imgs[status * 1];
        }
        geometrieList.push({
          width: 25, // 样式宽
          height: 36, // 样式高
          latitude,
          longitude,
          // 标记位置(纬度，经度，高度)
          id: item.id,
          iconPath: styleId,
        });
      });
      allGeometrieList.current = geometrieList;
      if (testFlag.current) {
        toAddMarker(geometrieList);
      }
      if (callF) {
        callF();
      } else {
        moveToOnePoint(list);
      }
      if (disFlag) {
        setDisFlag(false);
      }
    });
  };
  const moveToOnePoint = (list) => {
    if (!list.length) return;
    let temp = currentPos;
    const listLen = list.length;
    if (listLen) {
      let tempId = 0;
      if (listLen > 2) {
        tempId = parseInt(listLen / 2);
      }
      temp = {
        latitude: list[tempId].latitude,
        longitude: list[tempId].longitude,
      };
    }
    surroundMap.current.moveToLocation({
      latitude: temp?.latitude,
      longitude: temp?.longitude,
    });
  };
  const hadleSwitchDis = (params = {}) => {
    const { isNotMove = false } = params;
    let flag = false;
    if (disFlag) {
      flag = false;
      toAddMarker(allGeometrieList.current);
      if (!isNotMove) {
        moveToOnePoint(allGeometrieList.current);
      }
    } else {
      flag = true;
      toShowDisMarker();
    }
    setDisFlag(flag);
  };
  useEffect(() => {
    if (!surroundMap.current && posData) {
      surroundMap.current = Taro.createMapContext("surroundMap");
      G_Log(surroundMap.current);
      setCurrentPos(posData);
      let callF = () => {
        hadleSwitchDis();
      };
      toFetchMapMarkerList(callF);
    }
  }, [posData]);
  useEffect(() => {
    if (surroundMap.current && currentPos) {
      toFetchMapMarkerList();
    }
  }, [selectProData, infoItemType, isFresh]);

  const {
    latitude,
    longitude,
    cityName,
    districtName,
    streetName,
    healthCode,
    name,
    address: addressBase,
  } = detailContent;
  let address = cityName + districtName + " " + streetName;
  return (
    <View className={styles.content}>
      <SelectPro
        noticeArr={noticeArr}
        handleRefresh={() => {
          toFetchMapMarkerList(() => {
            console.log("刷新，并且不移动");
          });
        }}
        infoItemType={infoItemType}
        handleChange={(data) => {
          setSelectProData(data);
          setIsFresh(Date.now());
        }}
        handleInfoItemClick={handleInfoItemClick}
        isShowInfo={true}
      ></SelectPro>
      {currentPos?.latitude && (
        <Map
          scale={9}
          onRegionChange={({ type }) => {
            if (type == "end" && disFlag) {
              toShowDisMarker();
            }
          }}
          onMarkerTap={(data) => {
            if (popupVisable) return;
            const { detail } = data;
            fetchDetail({ id: detail.markerId }).then((res) => {
              const { data } = res.data;
              setPopupVisable(true);
              setDetailContent(data);
            });
          }}
          latitude={currentPos?.latitude}
          longitude={currentPos?.longitude}
          id="surroundMap"
          className={styles.map}
          enableZoom={true}
          markers={markerList}
        />
      )}
      <View
        style={{
          position: "absolute",
          left: "calc(50% - 17Px)",
          bottom: "calc(50% - 55Px)",
          zIndex: 100,
        }}
      >
        {<View className={styles.disMarkerIcon}></View>}
      </View>

      <View
        style={{
          position: "absolute",
          bottom: "50px",
          left: 10,
          zIndex: 100,
          width: "92rpx",
        }}
      >
        <AtButton
          type="primary"
          circle
          onClick={() => {
            surroundMap.current.moveToLocation({
              latitude: currentPos?.latitude,
              longitude: currentPos?.longitude,
            });
          }}
        >
          <AtIcon value="map-pin" size="30"></AtIcon>
        </AtButton>
      </View>
      <View
        style={{
          position: "absolute",
          bottom: "50px",
          right: 10,
          zIndex: 100,
          width: "150rpx",
        }}
      >
        <AtButton
          type="primary"
          onClick={() => {
            hadleSwitchDis({ isNotMove: true });
          }}
        >
          {btnInfoStr[disFlag ? 1 : 0]}
        </AtButton>
      </View>
      <Popup
        title={address}
        handleClose={(e) => {
          setPopupVisable(false);
        }}
        popupVisable={popupVisable}
      >
        <View style={{ padding: "5px 5px 0px 5px" }}>
          <StationInfo address={name} healthCode={healthCode} />
        </View>
        <DetailContent data={detailContent} />
        <AtButton
          onClick={() => {
            wx.openLocation({
              longitude: parseFloat(longitude + ""),
              latitude: parseFloat(latitude + ""),
              name: name,
              address: addressBase,
            });
          }}
          block
          shape="rounded"
          type="primary"
        >
          导航前往
        </AtButton>
      </Popup>
    </View>
  );
};

export default observer(MapView);
