
export default {
  namespace: 'discountCouponManage',

  state: {
    couponlist:[],
    classifylist:[],
    couponread:{}
  },

  effects: {
    * couponlist({payload},{put}){
      yield put({
        type:'save',
        payload:{couponlist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *couponread({payload},{put}){
      yield put({
        type:'save',
        payload:{couponread:payload.info}
      })
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
