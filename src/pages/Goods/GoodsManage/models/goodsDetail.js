
export default {
  namespace: 'goodsDetail',

  state: {
    classifylist:[],
    goodsread:{},
    attributelist:[]
  },

  effects: {
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *attributelist({payload},{put}){
      yield put({
        type:'save',
        payload:{attributelist:payload.info}
      })
    },
    *goodsread({payload},{put}){
      yield put({
        type:'save',
        payload:{goodsread:payload.info}
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
