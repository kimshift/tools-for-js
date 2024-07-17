import 'dayjs/locale/zh-cn' // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.locale('zh-cn') // 全局使用

/*******
 * @description: 生成时间格式化
 * @author: 琴时
 * @param {date} 需要格式化的时间串（''/null/undefined ==> 默认当前时间）
 * @param {fmt} 格式化样式标识（年-月-日：YYYY-MM-DD）(不传默认返回年-月-日 时:分:秒)
 * @return {*} 返回格式化后的时间字符串
 */
export const dateFormat = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  const pattern = /^(?=.*T)(?=.*).*$/
  const patternNum = /^\d*$/
  if (!date) {
    // 不传参数
    date = new Date()
  } else if (patternNum.test(date)) {
    // 时间戳
    date = parseInt(date)
  } else if (typeof date === 'string' && !pattern.test(date)) {
    //兼容ios: 将时间字符串中的'-'替换成'/' 2021-05-20 00:00:00=>2021/05/20 00:00:00
    date = `${date}`.replace(/-/g, '/')
  }
  /* 处理格式化时间 */
  const dt = new Date(date) //创建时间对象
  // 构造正则匹配:(value)padStart:字符串不满2位数,开头补全'0'
  const o = {
    '[Yy]+': dt.getFullYear(), //年
    'M+': (dt.getMonth() + 1 + '').padStart(2, '0'), //月
    'D+': (dt.getDate() + '').padStart(2, '0'), // 日
    'H+': (dt.getHours() + '').padStart(2, '0'), // 时
    'm+': (dt.getMinutes() + '').padStart(2, '0'), // 分
    's+': (dt.getSeconds() + '').padStart(2, '0'), // 秒
    'w+': '星期' + '日一二三四五六'.charAt(dt.getDay()), // 星期
    'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
    S: dt.getMilliseconds(), // 毫秒
  }
  // 将正则匹配上的字符替换对应的时间值
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[k])
    }
  }
  return fmt
}
export const formatDate = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(date).format(fmt)
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
 * @param {String} diff [year:年, month:月, week:周, day:天, hour:小时, minute:分钟, second:秒]
 * @return {String}
 */
export const transformDate = (date, diff) => {
  dayjs.extend(relativeTime)
  let transDay = dayjs(date).fromNow().replace(/\s+/g, '')
  if (transDay === '几秒前') transDay = '刚刚'
  if (diff) {
    const diffObj = {
      year: '年',
      month: '月',
      week: '周',
      day: '天',
    }
    // 匹配transDay有无该值==>超出界限则显示日期
    if (new RegExp(`(${diffObj[diff]})`).test(transDay)) {
      transDay = dayjs(date).format('YYYY-MM-DD')
    }
  }
  return transDay
}
