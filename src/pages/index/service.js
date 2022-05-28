import myReuqest from "@SRC/common/myReuqest";

export const fetchListUrl = "/checkPoint/selectPage";
export const fetchMapMarkerListUrl = "/checkPoint/selectMapMarkerList";
export const fetchDetailUrl = "/checkPoint/detail";
export const fetchNoticeTopUrl = "/notice/top";


// 查询列表
export const fetchList = (params) => {
  const temp = { criteria: {}, ...params };
  return myReuqest.post("/checkPoint/selectPage", temp);
};

// 查询地图标记点列表
export const fetchMapMarkerList = (params) => {
  return myReuqest.post("/checkPoint/selectMapMarkerList", { ...params });
};

// 查询地图标记点详情
export const fetchDetail = (params) => {
  return myReuqest.get("/checkPoint/detail", params);
};

// 置顶公告
export const fetchNoticeTop = (params) => {
  return myReuqest.get("/notice/top");
};
