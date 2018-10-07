
export default {
  namespace: 'discountfreightManage',

  state: {
    freightlist:[],
    classifylist:[],
    freightread:{}
  },

  effects: {
    * freightlist({payload},{put}){
      yield put({
        type:'save',
        payload:{freightlist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *freightread({payload},{put}){
      yield put({
        type:'save',
        payload:{freightread:payload.info}
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
