
export default {
  namespace: 'goodsManage',

  state: {
    goodslist:[],
    classifylist:[],
    goodsread:{}
  },

  effects: {
    * goodslist({payload},{put}){
      yield put({
        type:'save',
        payload:{goodslist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
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
