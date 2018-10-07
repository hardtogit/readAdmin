
export default {
  namespace: 'roleManage',

  state: {
    rolelist:[],
    classifylist:[],
    roleread:{}
  },

  effects: {
    * rolelist({payload},{put}){
      yield put({
        type:'save',
        payload:{rolelist:payload.info,}
      })
    },
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *roleread({payload},{put}){
      yield put({
        type:'save',
        payload:{roleread:payload.info}
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
