
export default {
  namespace: 'classifyManage',

  state: {
    classifylist:[],
    classifyread:{},
    attributelist:[],
    attributeread:{}
  },

  effects: {
    * classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info,}
      })
    },
    *classifyread({payload},{put}){
      yield put({
        type:'save',
        payload:{classifyread:payload.info}
      })
    },
    * attributelist({payload},{put}){
      yield put({
        type:'save',
        payload:{attributelist:payload.info,}
      })
    },
    *attributeread({payload},{put}){
      yield put({
        type:'save',
        payload:{attributeread:payload.info}
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
