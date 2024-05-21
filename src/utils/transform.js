const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
const chnUnitSection = ['', '万', '亿', '万亿', '亿亿']
const chnUnitChar = ['', '十', '百', '千']
// 如果数字含有小数部分，那么可以将小数部分单独取出,将小数部分的数字转换为字符串的方法
const numToChn = function (params) {
  const index = params.toString().indexOf('.')
  if (index != -1) {
    const str = params.toString().slice(index)
    let a = '点'
    for (let i = 1; i < str.length; i++) {
      a += chnNumChar[parseInt(str[i])]
    }
    return a
  } else {
    return ''
  }
}

// 定义在每个小节的内部进行转化的方法，其他部分则与小节内部转化方法相同
const sectionToChinese = section => {
  let str = '',
    chnstr = '',
    zero = false,
    count = 0 //zero为是否进行补零， 第一次进行取余由于为个位数，默认不补零
  while (section > 0) {
    const v = section % 10 //对数字取余10，得到的数即为个位数
    if (v == 0) {
      //如果数字为零，则对字符串进行补零
      if (zero) {
        zero = false //如果遇到连续多次取余都是0，那么只需补一个零即可
        chnstr = chnNumChar[v] + chnstr
      }
    } else {
      zero = true //第一次取余之后，如果再次取余为零，则需要补零
      str = chnNumChar[v]
      str += chnUnitChar[count]
      chnstr = str + chnstr
    }
    count++
    section = Math.floor(section / 10)
  }
  return chnstr
}
/* 定义整个数字全部转换的方法，需要依次对数字进行10000为单位的取余，然后分成小节，按小节计算，当每个小节的数不足1000时，则需要进行补零 */

/*******
 * @description: 阿拉伯数字转中文数字
 * @author: 琴时
 * @param {Number} params
 * @return {*}
 * @example transformToChinese(123456)
 * 输出：一十二万三千四百五十六
 */
export const numToChinese = params => {
  let a = numToChn(params)
  params = Math.floor(params)
  let unitPos = 0
  let strIns = '',
    chnStr = ''
  let needZero = false

  if (params === 0) {
    return chnNumChar[0]
  }
  while (params > 0) {
    const section = params % 10000
    if (needZero) {
      chnStr = chnNumChar[0] + chnStr
    }
    strIns = sectionToChinese(section)
    strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0]
    chnStr = strIns + chnStr
    needZero = section < 1000 && section > 0
    params = Math.floor(params / 10000)
    unitPos++
  }
  return chnStr + a
}

/*******
 * @description: 金额格式化函数
 * @author: 琴时
 * @param {*} value          [金额]
 * @param {*} currency       [货币符号]
 * @param {*} decimals       [小数位数]
 * @return {String}   [返回格式好的金额]
 * @example: moneyFormat(123456.789, '￥', 2) => ￥123,456.79
 */
export const moneyFormat = (value, currency, decimals) => {
  const digitsRE = /(\d{3})(?=\d)/g //匹配数字之前的3个数字
  value = parseFloat(value) //转换成数值保留小数
  // 如果传过来的值不是有限数值或者值不存在且值不等于0
  if (!isFinite(value) || (!value && value !== 0)) return '' //isFinite判断是否是有限数值
  currency = currency ? currency : '$' //如果有指定金币符号就直接用，否则使用美元符号
  decimals = decimals ? decimals : 2 //如果有指定小数位就直接用，否则使用2位小数
  const stringified = Math.abs(value).toFixed(decimals) //取数值的绝对值后decimals位小数
  const _int = stringified.slice(0, -1 - decimals) //取整数部分
  const remainder = _int.length % 3 //因为金额都是每3个划分,划分后取剩余的（整数部分取余）
  const head = remainder > 0 ? _int.slice(0, remainder) + (_int.length > 3 ? ',' : '') : ''
  // 计算划分后头部(整数部分超过三位头部加上逗号)
  const _float = stringified.slice(-1 - decimals) //取小数部分加上小数点
  const sign = value < 0 ? '-' : '' //判断正负数
  return (
    sign +
    currency +
    head +
    _int.slice(remainder).replace(digitsRE, '$1,') + //digitsRE, '$1,'==>每3位加1逗号
    _float
  )
}

/*******
 * @description: Txt 转数组对象
 * 将txt文件内容转化成定制数组对象
 * 将ZFB账号---运动账号---运动密码==>[{'antName','username','password','remark'}]
 * 将运动账号---运动密码==>[{'username','password','remark'}]
 * @author: 琴时
 * @param {Object} params
 * @return {*}
 */
export const textTransform = params => {
  const { content = '', symbol, sign = 'ants', password, remark = '', index = 0 } = params
  // 将每行字符进行切割成数组
  let list = content.split(/[(\r\n)\r\n]+/) // 根据换行或者回车进行识别
  const arrayTemp = []
  list.forEach(item => {
    item = item.trim() // 去除首尾空格
    if (item) {
      // 将每行数据通过[symbol]定制符合进行切割
      let newList = item.split(symbol).map(ele => ele.trim())
      let tempData = {}
      if (sign === 'ants') {
        tempData = {
          antName: newList[index],
          username: index === 1 || newList.length === 1 ? newList[0] : newList[1],
          password: password || newList[2],
          remark: newList[3] || remark,
        }
      } else {
        tempData = {
          username: newList[0],
          password: password || newList[1],
          remark: newList[2] || remark,
        }
      }
      arrayTemp.push(tempData)
    }
  })
  return arrayTemp
}