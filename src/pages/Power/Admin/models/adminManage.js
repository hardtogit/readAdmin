
export default {
  namespace: 'adminManage',

  state: {
    adminlist:[],
    adminread:{},
    rolelist:[]
  },

  effects: {
    * adminlist({payload},{put}){
      yield put({
        type:'save',
        payload:{adminlist:{total:payload.allpage,list:payload.info} }
      })
    },
    *rolelist({payload},{put}){
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
    *adminexport({payload},{put}){
      yield put({
        type:'save',
        payload:{adminexport:payload.info}
      })
    },
    *adminread({payload},{put}){
      yield put({
        type:'save',
        payload:{adminread:payload.info}
      })
    },
    *cleargoodsexport({payload},{put}){
      yield put({
        type:'cleargoods',
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
    cleargoods(state){
      return {
        ... state,
        adminexport:[]
      }
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
