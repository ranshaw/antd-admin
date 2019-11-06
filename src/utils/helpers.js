import moment from 'moment'

/**
 * 设置 moment 默认为 Chinese(China)
 */
moment.locale('zh-cn')

/**
 *  验证手机号，首位为1，其余位是数字
 */
export const MOBILE_NUMBER_REGIX = /^[1]([0-9])[0-9]{9}$/
/**
 *  验证手机号，根据现有运营商规则
 */
export const MOBILE_NUMBER_REGEX_STRICT = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/

/**
 * 只包含数字的字符验证正则
 */
export const NUMBER_REGEX = /^[0-9]*$/

/**
 * 只包含数字和字母的字符验证正则
 */
export const NUMBER_ALPHABET_REGEX = /^[a-z0-9A-Z]+$/

/**
 * 只包含字母、数字以及中文字符的正则
 */
export const ONLY_CHARACTER_REGEX = /^[A-Za-z0-9\u4e00-\u9fa5]+$/

/**
 * 货币数字验证
 */
export const CURRENCY_VALUE_REGEX = /^\d+(\.\d{0,2})?$/

export const writeToClipboard = text => {
  try {
    const ele = document.createElement('input')
    ele.value = text
    document.body.appendChild(ele)
    ele.select()
    document.execCommand('copy')
    document.body.removeChild(ele)
    return true
  } catch (err) {
    return false
  }
}

/**
 * 延缓
 *
 * @param {Number} duration 毫秒数
 * @param {Function} next 下一步要执行的操作
 *
 * @returns {Promise}
 *
 * ```js
 * delay(1000).then(() => {
 *   console.log('延时 1000ms 后执行到这里')
 * })
 *
 * delay(1000, () => console.log('延时 1000ms 后执行到这里'))
 * ```
 */
export const delay = (duration, next) =>
  new Promise(resolve =>
    setTimeout(next ? () => resolve(next()) : resolve, duration)
  )

/**
 * 检测字符是否仅为字符（字母，数字以及中文字符）
 *
 * @param {string} value 待检测字符串
 * @param {boolean} allowEmpty 是否允许内容为空
 *
 * @returns {boolean} value
 */
export const isOnlyCharacter = (value, allowEmpty = true) =>
  value === '' && allowEmpty ? true : ONLY_CHARACTER_REGEX.test(value)

/**
 * 检测字符是否为合法的货币数字
 *
 * @param {string} value 待检测的字符串
 * @param {boolean} allowEmpty 是否允许值为空字符
 *
 * @returns {boolean} value
 */
export const isCurrencyValue = (value, allowEmpty = true) =>
  value === '' && allowEmpty ? true : CURRENCY_VALUE_REGEX.test(value)

/**
 * 检测一个字符串是否只包含数字
 *
 * @param {String} value 待检测的字符串
 *
 * @returns {boolean} value
 */
export const isNumber = value => NUMBER_REGEX.test(value)

/**
 * 检测一个字符串是否只包含数字和字母
 *
 * @param {String} value 待检测的字符串
 *
 * @returns {boolean} value
 */
export const isNumberAlphabet = value => NUMBER_ALPHABET_REGEX.test(value)

// eslint-disable-next-line valid-jsdoc
/**
 *  是否为手机号
 *
 * @param {String} value 待检测的字符串
 *
 * @returns {boolean} value
 */
export const isMobileNumber = (value, strict = false) =>
  strict
    ? MOBILE_NUMBER_REGEX_STRICT.test(value)
    : MOBILE_NUMBER_REGIX.test(value)

/**
 * 格式化货币
 *
 * @param {number} value 待格式化的数字
 *
 * @returns {string} formatted currency string
 */
export const formatCurrency = value =>
  isNumber(value)
    ? parseFloat(value).toLocaleString('zh-CN', {
        maximumFractionDigits: 2,
        useGrouping: true,
      })
    : value

/**
 * 格式化时间日期
 *
 * `value` 可以是任何可以被 `moment` 解析的值
 *
 * `format` 为标准的 `moment` 格式，常用格式如下：
 *
 * - `M月D日 Ah:m`：**5月10日 下午1:11**
 * - `YYYY-MM-DD HH:mm`：**2019-05-10 13:11**
 * - `M/D`: **5/10**
 *
 * @param {any} value 需要格式化的值
 * @param {string} format 格式
 *
 * @returns {string} formatted value
 *
 */
export const formatDatetime = (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  try {
    return moment(isNumber(value) ? parseInt(value) : value)
      .format(format)
      .replace('AM', '上午')
      .replace('PM', '下午')
  } catch (e) {
    return value
  }
}
