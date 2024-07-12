import { summation } from './calculate'
import { isEmpty, deepCopy } from './common'
import { getValByKey } from './object'
/*******
 * @description: 数组去重
 * @author: 琴时
 * @param {Array} list [需要去重的数组对象]
 * @param {String} key [指定数组对象元素主键]
 * 以该主键的值为标准判断数据是否重复|如果数组元素是一般数据类型,key传空即可
 * @param {Function} callback [回调函数,用于处理去重后重复的数据(可不传)]
 * @return {Array} 去重后的新数组对象
 */
export const deWeightArray = (list, key, callback) => {
  /* 如果数组的元素是基本数据类型那就不传第二个参数 */
  if (!key) {
    const set = new Set(list)
    return [...set]
  }
  const tempList = [] //重复数据
  const map = new Map() //创建Map对象数据结构
  // 遍历需要去重的数组对象
  list.forEach(item => {
    // 判断map对象中该key是否已经存在
    if (!map.has(item[key])) {
      map.set(item[key], item) //如果不存在，将该数据插入
    } else {
      tempList.push(item)
    }
  })
  IsType('Function', callback) && callback(tempList)
  return [...map.values()] //将map对象转换回数组再返回
}

/*******
 * @description: [递归]计算树的最后节点某字段的总和
 * @author: 琴时
 * @param {Array}  tree            [数组树对象]
 * @param {Object} config          [配置参数]
 * @param {String} config.key      [目标节点名称]
 * @param {String} config.children [递归树节点名称]
 * @returns {Number} [目标节点某字段的总和]
 * @example: treeLastChildSum(tree, { key: 'price', children: 'children' })
 */

export const treeLastChildSum = (tree, config) => {
  const { key = 'id', children = 'children' } = config || {}
  const sumList = [] //缓存目标节点值
  const traverseTree = (tree, list, key, children) => {
    tree.forEach(item => {
      if (item[children] && item[children].length > 0) {
        traverseTree(item[children], list, key, children)
      } else if (item[key]) {
        list.push(item[key])
      }
    })
  }
  traverseTree(tree, sumList, key, children)
  return summation(sumList)
}

/*******
 * @description: 校验数组对象中是否存在指定的字段为空
 * @author: 琴时
 * @param {Array} list    [校验的数组对象]
 * @param {Array} keyList [校验指定的字段-数组形式]
 * @return {Array} 返回存在空的字段数组
 * @example: checkKeyEmpty(tree, ['id', 'name'])
 */
export const checkKeyEmpty = (list, keyList) => {
  const temp = []
  const loops = (array, key) => {
    array.some(item => {
      if (isEmpty(item[key])) {
        // 存在空的字段
        temp.push(key)
        return true
      } else if (item.children && item.children.length > 0) {
        loops(item.children, key)
      }
    })
  }
  keyList.forEach(key => {
    loops(list, key)
  })
  return temp
}

/*******
 * @description: 移动数组元素
 * @author: 琴时
 * @param {Array} list
 * @param {Number} from [移动的位置]
 * @param {Number} to   [目标位置]
 * @return {Array}
 */
export const arrEleMove = (list, from, to) => {
  list = list.slice()
  list.splice(to < 0 ? list.length + to : to, 0, list.splice(from, 1)[0])
  return list
}

/*******
 * @description: 数组元素交换位置
 * @author: 琴时
 * @param {Array} list
 * @param {Number} i1
 * @param {Number} i2
 * @return {Array}
 */
export const arrExchange = (list, i1, i2) => {
  list = list.slice()
  const item = list[i1]
  list[i1] = list[i2]
  list[i2] = item
  return list
}

/*******
 * @description: 数组格式转树状结构
 * @author: 琴时
 * @param {Array} array
 * @param {Object} config
 * @param {String} config.id        [主键名]
 * @param {String} config.pid       [父级主键名]
 * @param {String} config.children  [子级数组名]
 * @return {Array}                  [树状结构数组]
 */
export const arrayToTree = (array, config) => {
  const { id = 'id', pid = 'pid', children = 'children' } = config || {}
  let data = deepCopy(array)
  let result = []
  let hash = {}
  data.forEach((_, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

/*******
 * @description: 根据label的值获取value
 * @author: 琴时
 * @param {Array} list
 * @param {String} labelVal [label的值]
 * @return {*}
 */
export const getValueFromArray = (list, labelVal, label = 'label', value = 'value') => {
  list = deepCopy(list)
  let res = list.find(item => item[label] == labelVal) || {}
  return res[value]
}

/*******
 * @description: 随机抽取数组中的n个值
 * @author: 琴时
 * @param {Array} array
 * @param {Number} num
 * @return {Array}
 */
export const randomNumEnum = (array, num) => {
  let shuffled = array.slice(0),
    i = array.length,
    min = i - num,
    temp,
    index
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random())
    temp = shuffled[index]
    shuffled[index] = shuffled[i]
    shuffled[i] = temp
  }
  return shuffled.slice(min)
}

/*******
 * @description: 计算数据分页
 * @author: 琴时
 * @param {Array} list
 * @param {Number}  params.page [当前页码]
 * @param {Number}  params.pageSize [每页显示条数]
 * @return {Array}
 */
export const getPagination = (list, params) => {
  const { page, pageSize } = params
  list = deepCopy(list)
  return list.slice((page - 1) * pageSize, page * pageSize)
}

/*******
 * @description: 根据[key]值排序，相同时则根据时间[timeKey]值排序
 * @author: 琴时
 * @param {*} list
 * @param {String} config.key  [排序字段]
 * @param {String} config.timeKey [时间字段]
 * @param {String} config.order [排序方式，默认升序]
 * @param {String} config.timeOrder [时间排序方式，默认降序]
 * @return {Array}
 */
export const sortByKeyAndTime = (list, config) => {
  const { key = 'sticky', timeKey = 'date', order = 'asc', timeOrder = 'desc' } = config || {}
  list = deepCopy(list)
  return list.sort((a, b) => {
    let a_val = getValByKey(a, key)
    let a_time = +new Date(getValByKey(a, timeKey))
    let b_val = getValByKey(b, key)
    let b_time = +new Date(getValByKey(b, timeKey))
    if (a_val === b_val) {
      return timeOrder === 'desc' ? b_time - a_time : a_time - b_time
    }
    return order === 'asc' ? a_val - b_val : b_val - a_val
  })
}

/*******
 * @description: 数组随机打乱
 * @author: 琴时
 * @param {Array} arr
 * @return {Array}
 */
export function shuffleArray(arr) {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}
