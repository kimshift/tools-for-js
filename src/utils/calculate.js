/**
 * @description: 精确加法：
 * js的加法结果会有丢失精度的情况，例如两个浮点数相加的时候
 * @author: 琴时
 * @param {Number|String} arg1
 * @param {Number|String} arg2
 * @return {Number}
 */
export const exactAdd = (arg1, arg2) => {
  if (isNaN(arg1)) arg1 = 0
  if (isNaN(arg2)) arg2 = 0
  arg1 = Number(arg1)
  arg2 = Number(arg2)
  let r1, r2, m, c
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  c = Math.abs(r1 - r2)
  m = Math.pow(10, Math.max(r1, r2))
  if (c > 0) {
    let cm = Math.pow(10, c)
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''))
      arg2 = Number(arg2.toString().replace('.', '')) * cm
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm
      arg2 = Number(arg2.toString().replace('.', ''))
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''))
    arg2 = Number(arg2.toString().replace('.', ''))
  }
  return (arg1 + arg2) / m
}
/*******
 * @description: 计算数组元素的和
 * @author: 琴时
 * @param {Array} list
 * @return {Number}
 */
export const summation = list => {
  let sum = 0
  if (list && list.length > 0) {
    sum = list.reduce((n, m) => exactAdd(n, m))
  }
  return sum
}

/*******
 * @description: 计算两个参数
 * @param {Number|String} arg1
 * @param {Number|String} arg2
 * @param {String} type [计算类型:sum-加,subtract-减,multiply-乘,divide-除]
 * @return {Number}
 */
export const countNumber = (arg1, arg2, type = 'sum') => {
  if (arg1 === undefined || arg2 === undefined) {
    console.log('参数格式不正确')
    return NaN
  }
  if (isNaN(arg1)) arg1 = 0
  if (isNaN(arg2)) arg2 = 0

  // 转字符串类型
  arg1 = arg1.toString()
  arg2 = arg2.toString()

  // 获取小数点位置
  let index1 = arg1.indexOf('.')
  let index2 = arg2.indexOf('.')

  // 获取小数点位数
  let ws1 = 0
  let ws2 = 0
  if (index1 !== -1) {
    ws1 = arg1.split('.')[1].length
  }
  if (index2 !== -1) {
    ws2 = arg2.split('.')[1].length
  }
  let bigger = ws1 > ws2 ? ws1 : ws2 //位数较大值
  let small = ws1 < ws2 ? ws1 : ws2 //位数较小值
  let zeroCount = bigger - small //位数差

  // 去除小数点
  arg1 = arg1.replace('.', '')
  arg2 = arg2.replace('.', '')

  // 位数差额补0
  if (ws1 === small) {
    for (let i = 0; i < zeroCount; i++) {
      arg1 += '0'
    }
  } else {
    for (let i = 0; i < zeroCount; i++) {
      arg2 += '0'
    }
  }

  let result = 0 //结果
  let multiple = 1 //倍数
  for (let i = 0; i < bigger; i++) {
    multiple = multiple * 10
  }

  // 计算结果
  if (type === 'sum') {
    result = parseInt(arg1) + parseInt(arg2)
    result = result / multiple
  } else if (type === 'subtract') {
    result = parseInt(arg1) - parseInt(arg2)
    result = result / multiple
  } else if (type === 'multiply') {
    result = parseInt(arg1) * parseInt(arg2)
    result = result / multiple / multiple
  } else if (type === 'divide') {
    result = parseInt(arg1) / parseInt(arg2)
  }
  return result
}
