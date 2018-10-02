
export default {
  namespace: 'integralGoldmolManage',

  state: {
    goldmollist:[],
    goldmolread:{}
  },

  effects: {
    * goldmollist({payload},{put}){
      yield put({
        type:'save',
        payload:{goldmollist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *goldmolread({payload},{put}){
      yield put({
        type:'save',
        payload:{goldmolread:payload.info}
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
