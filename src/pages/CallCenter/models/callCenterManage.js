
export default {
  namespace: 'callCenterManage',

  state: {
    fromId:undefined,
    nextId:undefined,
    isHistory:false,
    peopleList:[

    ],
    chatList:[],
  },

  effects: {
    * peopleList({payload},{put}){
      yield put({
        type:'save',
        payload:{peopleList:payload.mailbox,}
      })
    },
    *chatList({payload},{put,select}){
      const {nextId,chatList} = yield select(({ callCenterManage }) => callCenterManage);
      console.log(nextId)
      if(nextId===payload.block._id){
        yield put({
          type:'save',
          payload:{isHistory:true,chatList:[...payload.block.entries,...chatList]}
        });
      }else{
        yield put({
          type:'save',
          payload:{chatList:payload.block.entries,isHistory:false}
        });
      }
      yield put({
        type:'save',
        payload:{nextId:payload.block.next_id}
      })
    },
    *fromId({payload},{put}){
      yield put({
        type:'save',
        payload:{fromId:payload}
      })
    },
    *getChatList({payload},{select}){
      const fromId = yield select(({ callCenterManage }) => callCenterManage.fromId);
      if(fromId){
        window.apiconn.send_obj({
          obj: "message",
          act: "chat_get",
          header_id:fromId
        });
      }

},
    *getPeopleList({payload},{select}){
      window.apiconn.send_obj({
        obj: "message",
        act: "mailbox",
      });
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
