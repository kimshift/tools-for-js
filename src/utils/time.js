/*******
 * @description: 生成时间格式化
 * @author: 琴时
 * @param {params} 需要格式化的时间串（''/null/undefined ==> 默认当前时间）
 * @param {format} 格式化样式标识（年-月-日：YYYY-MM-DD）(不传默认返回年-月-日 时:分:秒)
 * @return {*} 返回格式化后的时间字符串
 */
export const dateFormat = (params, format = 'YYYY-MM-DD hh:mm:ss') => {
  //如果params是时间字符串：2021-05-20 00:00:00 为了兼容ios需要将其转换成 2021/05/20 00:00:00
  const pattern = /^(?=.*T)(?=.*).*$/
  const patternNum = /^\d*$/
  if (!params) {
    params = new Date()
  } else if (patternNum.test(params)) {
    params = parseInt(params)
  } else if (typeof params === 'string' && !pattern.test(params)) {
    params = `${params}`.replace(/-/g, '/')
  }
  /* 处理格式化时间 */
  const dt = new Date(params) //创建时间对象
  const yy = dt.getFullYear() //年
  const qt = Math.floor((dt.getMonth() + 3) / 3) //季度
  const mm = (dt.getMonth() + 1 + '').padStart(2, '0') //月(padStart:字符串不满2位数,开头补全'0')
  const dd = (dt.getDate() + '').padStart(2, '0') //日
  const wk = '星期' + '日一二三四五六'.charAt(dt.getDay()) //星期
  const hh = (dt.getHours() + '').padStart(2, '0') //时
  const mi = (dt.getMinutes() + '').padStart(2, '0') //分
  const ss = (dt.getSeconds() + '').padStart(2, '0') //秒
  const ms = dt.getMilliseconds() //毫秒
  const timeObj = {
    date1: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${qt}${wk}`, //年-月-日 时:分:秒 季度星期
    date2: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${qt}`, //年-月-日 时:分:秒 季度
    date3: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss} ${wk}`, //年-月-日 时:分:秒 星期
    date4: `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}`, //年-月-日 时:分:秒
    date5: `${yy}-${mm}-${dd}`, //年-月-日
    date6: `${yy}-${mm}`, //年-月
    date7: `${mm}-${dd}`, //月-日
    date8: `${hh}:${mi}:${ss}`, //时:分:秒
    date9: `${yy}`, //年
    date10: `${mm}`, //月
    date11: `${dd}`, //日
    date12: `${hh}`, //时
    date13: `${mm}`, //分
    date14: `${ss}`, //秒
    date15: `${qt}`, //季度
    date16: `${wk}`, //星期
    date17: `${yy}${mm}${dd}${hh}${mi}${ss}`, //时间串
  }
  /* 检测时间格式的标识 */
  const list = [
    /^YYYY\-MM\-DD hh\:mm\:ss qtwk$/, //年-月-日 时:分:秒 季度星期
    /^YYYY\-MM\-DD hh\:mm\:ss qt$/, //年-月-日 时:分:秒 季度
    /^YYYY\-MM\-DD hh\:mm\:ss wk$/, //年-月-日 时:分:秒 星期
    /^YYYY\-MM\-DD hh\:mm\:ss$/, //年-月-日 时:分:秒
    /^YYYY\-MM\-DD$/, //年-月-日
    /^YYYY\-MM$/, //年-月
    /^MM\-DD$/, //月-日
    /^hh\:mm\:ss$/, //时:分:秒
    /^YYYY$/, //年
    /^MM$/, //月
    /^DD$/, //日
    /^hh$/, //时
    /^mm$/, //分
    /^ss$/, //秒
    /^qt$/, //季度
    /^ss$/, //星期
    /^YYYYMMDDhhmmss$/, //时间串
  ]
  let newDate = ''
  const news = list.some((item, index) => {
    if (item.test(format)) {
      newDate = timeObj[`date${index + 1}`]
      return true
    }
    return false
  })
  if (!news) newDate = `${yy}-${mm}-${dd} ${hh}:${mi}:${ss}` //如果传过来的格式化标识符异常则默认返回:年-月-日 时:分:秒
  return newDate
}

/*******
 * @description: 获取时间间隔
 * @author: 琴时
 * @param {start_Time} [开始时间]
 * @param {end_Time} [结束时间]
 * @return {*} 处理好的时间间隔相关对象
 */
export const getTimeDistance = (start_Time, end_Time) => {
  const startTime = +new Date(start_Time) // 开始时间戳
  const endTime = +new Date(end_Time) // 结束时间戳
  const times = (endTime - startTime) / 1000 // 剩余时间总的秒数
  const dd = parseInt(times / 60 / 60 / 24)
    .toString()
    .padStart(2, '0') //天
  const hh = parseInt(((times / 60 / 60) % 24) + '')
    .toString()
    .padStart(2, '0') //时
  const mm = parseInt(((times / 60) % 60) + '')
    .toString()
    .padStart(2, '0') //分
  const ss = parseInt((times % 60) + '')
    .toString()
    .padStart(2, '0') //秒
  if (ss < 0 || mm < 0 || hh < 0 || dd < 0) return null
  return {
    timeStr: `${dd}天${hh}时${mm}分${ss}秒`,
    timeStamp: times, //剩余时间秒数
    timeDistance: {
      dd,
      hh,
      mm,
      ss,
    },
    week: dd > 0 && dd < 7, //7天内
    month: dd > 0 && dd < 30, //30天内
    year: dd > 0 && dd < 365, //一年内
  }
}

/*******
 * @description: 转换时间戳
 * @author: 琴时
 * @param {*}  params [时间字符串]/[时间对象]
 * @return {*} [时间戳,当前时间戳]
 */
/*  */
export const timeStamp = params => {
  const date = +new Date(params) //转换成时间戳
  const newDate = Date.now() //H5-生成当前时间戳
  return { date, newDate }
}

/*******
 * @description: 倒计时
 * @author: 琴时
 * @param {params} [截止时间]
 * @return {*} [倒计时间/结束将返回null]
 */
export const countDown = (params, sign = 'cn') => {
  const nowTime = +new Date() // 当前时间戳
  const endTime = +new Date(params) // 结束时间戳
  const times = (endTime - nowTime) / 1000 // 剩余时间总的秒数
  const dd = parseInt(times / 60 / 60 / 24)
    .toString()
    .padStart(2, '0') // 天
  const hh = parseInt(((times / 60 / 60) % 24) + '')
    .toString()
    .padStart(2, '0') //时
  const mm = parseInt(((times / 60) % 60) + '')
    .toString()
    .padStart(2, '0') // 分
  const ss = parseInt((times % 60) + '')
    .toString()
    .padStart(2, '0') // 当前的秒
  if (times <= 0) return null //结束返回null
  const result = {
    cn: `${dd}天${hh}时${mm}分${ss}秒`,
    ss: parseInt(times),
  }
  return result[sign]
}

/*******
 * @description: 距离当前时间状况
 * @author: 琴时
 * @param {*} date
 * @return {String}
 */
export const transformDate = date => {
  const createAt = new Date(date)
  const interval = new Date().getTime() - createAt.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (interval < 0) {
    return ''
  } else if (interval / 1000 < 60) {
    return '刚刚'
  } else if (interval / 60000 < 60) {
    return parseInt(interval / 60000) + '分钟前'
  } else if (interval / 3600000 < 24) {
    return parseInt(interval / 3600000) + '小时前'
  } else if (interval / 86400000 < 31) {
    return parseInt(interval / 86400000) + '天前'
  } else if (interval / 2592000000 < 12) {
    return parseInt(interval / 2592000000) + '月前'
  } else {
    return parseInt(interval / 31536000000) + '年前'
  }
}
