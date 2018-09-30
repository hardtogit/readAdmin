import { queryNotices } from '@/services/api';
import {message} from 'antd'

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    notices: [],
  },

  effects: {
    *onResponse({ payload }, { put }){
      console.log(payload);
      switch (payload.act) {
        case "classifylist":
          yield put({
          type:'discountCouponManage/classifylist',
          payload
        });
          break;
        case 'couponlist':
          yield put({
            type:'discountCouponManage/couponlist',
            payload
          });
          break;
        case "couponadd":
          message.success('优惠卷新增成功')
        default:
          break
      }
      if(payload.act==="classifylist" ){

      }

      yield put({
          type:'discountCouponManage/receiveList',
           payload
      })
    },
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: 'saveNotices',
        payload: data,
      });
      yield put({
        type: 'user/changeNotifyCount',
        payload: data.length,
      });
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: 'saveClearedNotices',
        payload,
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: 'user/changeNotifyCount',
        payload: count,
      });
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload,
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload,
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload),
      };
    },
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== 'undefined') {
          window.ga('send', 'pageview', pathname + search);
        }
      });
    },
  },
};
