import { summation } from './calculate'
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
