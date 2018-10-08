
export default {
  namespace: 'freightManage',

  state: {
    freightlist:[],
    provincelist:[],
    freightread:{}
  },

  effects: {
    * freightlist({payload},{put}){
      yield put({
        type:'save',
        payload:{freightlist:payload.info,}
      })
    },
    * provincelist({payload},{put}){
      yield put({
        type:'save',
        payload:{provincelist:payload.info,}
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
