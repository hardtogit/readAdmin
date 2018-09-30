
export default {
  namespace: 'discountCouponManage',

  state: {
    couponlist:[],
    classifylist:[]
  },

  effects: {
    * couponlist({payload},{put}){
      yield put({
        type:'save',
        payload:{couponlist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      console.log(payload)
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
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
