
export default {
  namespace: 'bannerManage',

  state: {
    bannerlist:[],
    bannerread:{}
  },

  effects: {
    * bannerlist({payload},{put}){
      yield put({
        type:'save',
        payload:{bannerlist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *bannerread({payload},{put}){
      yield put({
        type:'save',
        payload:{bannerread:payload.info}
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
