import myReuqest from "@SRC/common/myReuqest";
// 查询地区
export const fetchRegion = (params) => {
  return myReuqest.post("/region/list", { criteria: { ...params, valid: 1 } });
};
