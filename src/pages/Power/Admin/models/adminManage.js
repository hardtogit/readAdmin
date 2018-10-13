
export default {
  namespace: 'adminManage',

  state: {
    adminlist:[],
    adminread:{}
  },

  effects: {
    * adminlist({payload},{put}){
      yield put({
        type:'save',
        payload:{adminlist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *adminread({payload},{put}){
      yield put({
        type:'save',
        payload:{adminread:payload.info}
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
