import { Component, useState } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtTabs } from "taro-ui";
import { G_Log } from "@SRC/common/util";
import List from "./list";
import Map from "./map";
import { observer, inject } from "mobx-react";
import { fetchNoticeTop } from "./service";
import styles from "./index.module.scss";
@inject("globalStore")
@observer
export default class Index extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      current: 0,
      flag: false,
      posData: null,
      noticeArr: [],
    };
  }

  onLoad(options){
    debugger
  }
  componentDidHide() {
    this.setState({
      posData: null,
    });
  }

  onReady() {
    const {
      globalStore: { setNoticeArr, noticeArr },
    } = this.props;
    
    if (!noticeArr.length) {
      fetchNoticeTop().then((res) => {
        setNoticeArr([res?.data?.content]);
      });
    }
  }

  componentDidMount() {
    const { globalStore } = this.props;
    const { setPosData } = globalStore;
    let self = this;
    G_Log("定位中。。。");
    Taro.getLocation({
      type: "gcj02",
      success(res) {
        self.setState({
          posData: res,
        });
        setPosData(res);
        G_Log("定位成功" + res);
      },
      fail: (err) => {
        G_Log("定位失败" + err);
        let temp = {
          longitude: 120.78,
          latitude: 32.11,
        };
        self.setState({
          posData: temp,
        });
        setPosData(temp);
      },
    });
  }

  handleClick(value) {
    if (!this.state.flag && value == 1) {
      this.setState({
        flag: true,
      });
    }
    this.setState({
      current: value,
    });
  }

  render() {
    const tabList = [{ title: "列表" }, { title: "地图" }];
    return (
      <View on className={styles.content}>
        <View>
          <AtTabs
            className={styles.tabView}
            swipeable={false}
            current={this.state.current}
            tabList={tabList} //asdasd
            onClick={this.handleClick.bind(this)}
          ></AtTabs>
        </View>
        <View className={styles.tabView}>
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              visibility: this.state.current == 1 ? "hidden" : "",
            }}
          >
            <List isCurrent={this.state.current == 0} />
          </View>
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              visibility: this.state.current != 1 ? "hidden" : "",
            }}
          >
            {this.state.flag && <Map isCurrent={this.state.current == 1} />}
          </View>
        </View>
      </View>
    );
  }
}
