/*******
 * @description: 将对象转换为查询字符串
 * @author: 琴时
 * @param {*} obj
 * @return {String}
 * @example: objectToQs({a: 1, b: 2}) => 'a=1&b=2'
 */
export const objectToQs = obj => {
  return Object.keys(obj)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
    .join('&')
}

/*******
 * @description: 根据key获取对象值
 * @author: 琴时
 * @param {Object} obj
 * @param {String} key
 * @return {*}
 * @example: getValByKey({a: {b: {c: 1}}}, 'a.b.c') => 1
 */
export const getValByKey = (obj, key) => {
  let keys = key.split('.')
  let value = obj
  for (let i = 0; i < keys.length; i++) {
    value = value[keys[i]]
  }
  return value
}
