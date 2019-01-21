
export default {
  namespace: 'shoppingManage',

  state: {
    shoppinglist:[],
  },

  effects: {
    * shoppinglist({payload},{put}){
      yield put({
        type:'save',
        payload:{shoppinglist:payload.info,}
      })
    }
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
