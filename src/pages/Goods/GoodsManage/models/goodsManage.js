
export default {
  namespace: 'goodsManage',

  state: {
    goodslist:[],
    classifylist:[],
    goodsread:{},
  },

  effects: {
    * goodslist({payload},{put}){
      yield put({
        type:'save',
        payload:{goodslist:{total:payload.allpage,list:payload.info}}
      })
    },
    * goodsexport({payload},{put}){
      yield put({
        type:'save',
        payload:{goodsexport:payload.info}
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
        goodsexport:[]
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
