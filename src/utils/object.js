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
