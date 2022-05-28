import { observable, action } from "mobx";

class GlobalStore {
  @observable posData = null;
  @observable noticeArr = [];
  @observable counter = 0;

  @action.bound
  setNoticeArr(data) {
    this.noticeArr = data;
  }

  @action.bound
  setPosData(data) {
    this.posData = data;
  }

  @action.bound
  setCounter(data) {
    this.counter = data;
  }

}

export default new GlobalStore();
