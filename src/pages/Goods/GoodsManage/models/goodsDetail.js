
export default {
  namespace: 'goodsDetail',

  state: {
    classifylist:[],
    goodsread:{},
    attributelist:[]
  },

  effects: {
    *classifylist({payload},{put}){
      yield put({
        type:'save',
        payload:{classifylist:payload.info}
      })
    },
    *attributelist({payload},{put}){
      yield put({
        type:'save',
        payload:{attributelist:payload.info}
      })
    },
    *goodsread({payload},{put}){
      yield put({
        type:'save',
        payload:{goodsread:payload.info}
      })
    },
    *clearState({payload},{put}){
      yield put({
        type:'clear',
        payload:''
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
        classifylist:[],
        goodsread:{},
        attributelist:[]
      };
    },
  },
};
