/*******
 * @description: javascript 工具库导出配置
 * @author: 琴时
 */

// 转换类
export {
  numToChinese,
  moneyFormat,
  textTransform,
  convertSmallHump,
  lowercaseKeys,
  upperCaseKeys,
} from './utils/transform'

// 时间类
export {
  timeStamp,
  countDown,
  dateFormat,
  formatDate,
  getTimeDistance,
  transformDate,
} from './utils/time'

// 数组类
export {
  deWeightArray,
  treeLastChildSum,
  checkKeyEmpty,
  arrEleMove,
  arrExchange,
  arrayToTree,
  getValueFromArray,
  getPagination,
  sortByKeyAndTime,
  shuffleArray,
  invertSelection,
} from './utils/array'

// 计算类
export { exactAdd, summation, countNumber } from './utils/calculate'

// 其他类
export { IsType, deepCopy, isEmpty, isEqual, createUUID } from './utils/common'

// 字符类
export {
  getStrLength,
  checkPwdStrength,
  splitString,
  replacePath,
  splitToFileName,
} from './utils/string'

// 对象类
export { objectToQs } from './utils/object'
