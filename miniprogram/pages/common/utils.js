// 日期格式化
export function formatTime (date, fmt = 'yyyy-MM-dd') {
    if (date) {
        date = date.replace(/-/g,'/')
    }
    date = date ? new Date(date) : new Date()
    var o = {
      "M+": date.getMonth() + 1, //月份 
      "d+": date.getDate(), //日 
      "H+": date.getHours(), //小时 
      "m+": date.getMinutes(), //分 
      "s+": date.getSeconds(), //秒 
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
      "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
}

// 验证手机号
export function checkPhone(phone) {
    if (!phone) {
        return false
    } else if (phone.length != 11) {
        return false
    }
    return phone.match(/^(13|14|15|16|17|18|19)\d{9}$/)
}

// 格式化
export function currency(value, currency, decimals) {
    if (!value) {
        value = 0
    }
    const digitsRE = /(\d{3})(?=\d)/g
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : '$'
    decimals = decimals != null ? decimals : 2
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
    var i = _int.length % 3
    var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
    var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head + _int.slice(i).replace(digitsRE, '$1,') + _float
}