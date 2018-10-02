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
          message.success('优惠卷新增成功');
          break;
        case "couponread":
          yield put({
            type:'discountCouponManage/couponread',
            payload
          });
          break;
        case "coupondel":
          message.success('删除成功');
          break;
        case 'goldmollist':
          yield put({
            type:'integralGoldmolManage/goldmollist',
            payload
          });
          break;
        case "goldmoladd":
          message.success('积分卷新增成功');
          break;
        case "goldmolread":
          yield put({
            type:'integralGoldmolManage/goldmolread',
            payload
          });
          break;
        default:
          break
      }
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
