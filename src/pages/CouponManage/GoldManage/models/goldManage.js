
export default {
  namespace: 'goldManage',

  state: {
    goldlist:[],
    goldmollist:[],
    goldread:{}
  },

  effects: {
    * goldlist({payload},{put}){
      yield put({
        type:'save',
        payload:{goldlist:payload.info,}
      })
    },
    * goldmollist({payload},{put}){
      yield put({
        type:'save',
        payload:{goldmollist:payload.info,}
      })
    },
    *goldread({payload},{put}){
      yield put({
        type:'save',
        payload:{goldread:payload.info}
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
