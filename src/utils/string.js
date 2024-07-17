const _utf8_encode = function (string) {
  string = string.replace(/\r\n/g, '\n')
  let utftext = ''
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

const _utf8_decode = utftext => {
  let string = ''
  let i = 0
  let c = 0
  let c1 = 0
  let c2 = 0
  let c3 = 0
  while (i < utftext.length) {
    c = utftext.charCodeAt(i)
    if (c < 128) {
      string += String.fromCharCode(c)
      i++
    } else if (c > 191 && c < 224) {
      c2 = utftext.charCodeAt(i + 1)
      string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
      i += 2
    } else {
      c2 = utftext.charCodeAt(i + 1)
      c3 = utftext.charCodeAt(i + 2)
      string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
      i += 3
    }
  }
  return string
}
/*******
 * @description: 解密
 * @author: 琴时
 * @param {String} input
 * @return {String}
 */
export const decode = input => {
  let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let output = ''
  let chr1, chr2, chr3
  let enc1, enc2, enc3, enc4
  let i = 0
  input = input.toString()
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
  while (i < input.length) {
    enc1 = _keyStr.indexOf(input.charAt(i++))
    enc2 = _keyStr.indexOf(input.charAt(i++))
    enc3 = _keyStr.indexOf(input.charAt(i++))
    enc4 = _keyStr.indexOf(input.charAt(i++))
    chr1 = (enc1 << 2) | (enc2 >> 4)
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
    chr3 = ((enc3 & 3) << 6) | enc4
    output = output + String.fromCharCode(chr1)
    if (enc3 != 64) {
      output = output + String.fromCharCode(chr2)
    }
    if (enc4 != 64) {
      output = output + String.fromCharCode(chr3)
    }
  }
  output = _utf8_decode(output)
  return output
}
/*******
 * @description: 加密
 * @author: 琴时
 * @param {String} input
 * @return {String}
 */
export const encode = input => {
  let _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let output = ''
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4
  let i = 0
  input = _utf8_encode(input.toString())
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output =
      output +
      _keyStr.charAt(enc1) +
      _keyStr.charAt(enc2) +
      _keyStr.charAt(enc3) +
      _keyStr.charAt(enc4)
  }
  return output
}

/*******
 * @description: GBK字符集实际长度计算
 * @author: 琴时
 * @param {String} str
 * @return {Number}
 */
export const getStrLength = str => {
  str = str.toString()
  let realLength = 0
  let len = str.length
  let charCode = -1
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1
    } else {
      // 如果是中文则长度加2
      realLength += 2
    }
  }
  return realLength
}

/*******
 * @description: 密码强度校验
 * @author: 琴时
 * @param {String} value
 * @return {Number} [0:小于6位不合格，1:弱，2: 中，3:强]
 */
export const checkPwdStrength = value => {
  if (value === undefined || value === null) {
    return 0
  }
  let strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$', 'g')
  let mediumRegex = new RegExp(
    '^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$',
    'g'
  )
  let enoughRegex = new RegExp('(?=.{6,}).*', 'g')
  let strong = 1
  if (enoughRegex.test(value) == false) {
    //密码小于六位的时候
    strong = 0
  } else if (strongRegex.test(value)) {
    //密码为八位及以上并且字母数字特殊字符三项都包括,强度最强
    strong = 3
  } else if (mediumRegex.test(value)) {
    //密码为七位及以上并且字母、数字、特殊字符三项中有两项，强度是中等
    strong = 2
  }
  return strong
}

/*******
 * @description: 按指定长度分段字符串
 * @author: 琴时
 * @param {String} str
 * @param {Number} num
 * @return {Array}
 */
export function splitString(str, num) {
  let reg = /^[0-9]*[1-9][0-9]*$/
  if (str == null || str == undefined || !reg.test(num)) return []
  let array = []
  const len = str.length
  for (var i = 0; i < len / num; i++) {
    if ((i + 1) * num > len) {
      array.push(str.substring(i * num, len))
    } else {
      array.push(str.substring(i * num, (i + 1) * num))
    }
  }
  return array
}

/*******
 * @description: 将路径中的反斜杠字符 \ 替换为斜杠 /
 * @author: 琴时
 * @param {*} path
 * @return {*}
 */
export function replacePath(path) {
  return path.replace(/\\/g, '/')
}
