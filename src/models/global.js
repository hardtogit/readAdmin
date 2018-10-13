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
          yield put({
            type:'classifyManage/classifylist',
            payload
          });
          yield put({
            type:'goodsDetail/classifylist',
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
          // goldmol
        case 'goldmollist':
          yield put({
            type:'integralGoldmolManage/goldmollist',
            payload
          });
          yield put({
            type:'goldManage/goldmollist',
            payload
          });
          break;
        case "goldmoladd":
          message.success('积分模板新增成功');
          break;
        case "goldmoldel":
          message.success('积分模板删除成功');
          break;
        case "goldmolread":
          yield put({
            type:'integralGoldmolManage/goldmolread',
            payload
          });
          break;
          // gold
        case 'goldlist':
          yield put({
            type:'goldManage/goldlist',
            payload
          });
          break;
        case "goldadd":
          message.success('积分卡新增成功');
          break;
        case "golddel":
          message.success('积分卡删除成功');
          break;
        case "goldread":
          yield put({
            type:'goldManage/goldread',
            payload
          });
          break;

          // role
        case 'rolelist':
          yield put({
            type:'roleManage/rolelist',
            payload
          });
          break;
        case "roleadd":
          message.success('角色新增成功');
          break;
        case "roleread":
          yield put({
            type:'roleManage/roleread',
            payload
          });
          break;
        case "roledel":
          message.success('角色删除成功');
          break;
          // classify
        case "classifyadd":
          message.success('分类新增成功');
          break;
        case "classifyread":
          yield put({
            type:'classifyManage/goldmolread',
            payload
          });
          break;
        // attribute
        case "attributelist":
          yield put({
            type:'classifyManage/attributelist',
            payload
          });
          yield put({
            type:'goodsDetail/attributelist',
            payload
          });
          break;
        case "attributeadd":
          message.success('属性新增成功');
          break;
        case "attributeread":
          yield put({
            type:'classifyManage/attributeread',
            payload
          });
          break;
        case "attributedel":
          yield put({
            type:'classifyManage/attributedel',
            payload
          });
          break;
          // freight
        case 'provincelist':
          yield put({
            type:'freightManage/provincelist',
            payload
          });
          break;
        case 'freightlist':
          yield put({
            type:'freightManage/freightlist',
            payload
          });
          break;
        case "freightadd":
          message.success('新增成功');
          break;
        case "freightread":
          yield put({
            type:'freightManage/freightread',
            payload
          });
          break;
        case "freightdel":
          message.success('删除成功');
          break;
          // admin
        case 'adminlist':
          yield put({
            type:'adminManage/adminlist',
            payload
          });
          break;
        case "adminadd":
          message.success('新增成功');
          break;
        case "adminread":
          yield put({
            type:'adminManage/adminread',
            payload
          });
          break;
        case "admindel":
          message.success('删除成功');
          break;
        // IM
        case "mailbox":
          yield put({
            type:'callCenterManage/peopleList',
            payload
          });
          break;
        case "chat_get":
          yield put({
            type:'callCenterManage/getPeopleList',
            payload
          });
          yield put({
            type:'callCenterManage/chatList',
            payload
          });
          break;
        case "chat_send":
          yield put({
            type:'callCenterManage/getChatList',
            payload
          });
          break;
        case "message_chat":
          yield put({
            type:'callCenterManage/getPeopleList',
            payload
          });
          yield put({
            type:'callCenterManage/getChatList',
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
