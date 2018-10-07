/**
 * 共享工具方法
 * add by gjun
 * 2018-06-21
 */
import cloneDeep from 'clone-deep';

/**
 * 日期格式化方法
 */
export function formatDate(dt, patter) {
  let format = patter;
  let date = dt;
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date);
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : (`00${o[k]}`).substr(`${o[k]}`.length));
    }
  });
  return format;
}


/**
 * @param  name {String}
 * @return  {String}
 */
export function queryURL(name) {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i');
  const r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]);
  return null;
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
export function queryArray(array, key, keyAlias = 'key') {
  if (!(array instanceof Array)) {
    return null;
  }
  const item = array.filter(_ => _[keyAlias] === key);
  if (item.length) {
    return item[0];
  }
  return null;
}
/**
 *
 * @param {*} array
 */
export function getRealArray() {
  const result = [];
  return function deep(array, dp) {
    if (result.length > 0 && !dp) return result;
    for (let i = 0; i < array.length; i += 1) {
      result.push(array[i]);
      if (array[i].children && array[i].children.length > 0) {
        deep(array[i].children, true);
      }
    }

    return result;
  };
}
const cacheArray = getRealArray();
export function queryDeepArray(array, key, keyAlias) {
  const searchArray = cacheArray(array);
  return queryArray(searchArray, key, keyAlias);
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
export function arrayToTree(array, id = 'id', pid = 'pid', children = 'children') {
  const data = cloneDeep(array);
  const result = [];
  const hash = {};
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashVP = hash[item[pid]];
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = []);
      hashVP[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

/**
 * 判断是否是对象
 * @param {*} obj obj
 */
export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

/**
 *
 * @param {*} a 对象深比较A
 * @param {*} b 对象深比较A
 */
export function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = Array.isArray(a);
      const isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(key => looseEqual(a[key], b[key]));
      }
      /* istanbul ignore next */
      return false;
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}
// 保留两位小数，四舍五入
export const toPercent = number => Math.round(number * 100) / 100;

/* eslint-disable */
// 生成随机字符串
export function createUUID() {
  return 'xy-4yx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}