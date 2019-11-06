import axios from 'axios'
import { cloneDeep, isEmpty } from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { CANCEL_REQUEST_MESSAGE } from 'utils/constant'
import qs from 'qs'
import * as develpment from './developmentProperties'
import { router } from 'utils'

const { CancelToken } = axios
window.cancelRequest = new Map()
// TODO: 依据公司接口规定做处理
export default function request(options, preName = '') {
  let { data, url, method = 'get' } = options
  // console.log('options----111', JSON.stringify(options))

  //改变请求路径
  switch (preName) {
    case 'sys':
      url = develpment.sys() + url
      break
    default:
      break
  }
  const cloneData = cloneDeep(data)
  try {
    let domain = ''
    const urlMatch = url.match(/[a-zA-z]+:\/\/[^/]*/)
    if (urlMatch) {
      ;[domain] = urlMatch
      url = url.slice(domain.length)
    }

    const match = pathToRegexp.parse(url)
    url = pathToRegexp.compile(url)(data)

    for (const item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }

    // 去除logout地址中的/a
    // if (url.includes('/a/logout')) {
    //   url = '/api/admin-sys-service/logout'
    // }

    url = domain + url
  } catch (e) {
    message.error(e.message)
  }
  options.url =
    method.toLocaleLowerCase() === 'get'
      ? `${url}${isEmpty(cloneData) ? '' : '&'}${qs.stringify(cloneData)}`
      : url

  // if (url.indexOf('a/user/login') === -1) {
  //   const jwt = {}
  //   jwt.jwt = localStorage.getItem('jwt') ? localStorage.getItem('jwt') : ''
  //   // jwt.jwt =
  //   // 'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..YvGsWwNCBEhlyNk9.kJJ4yKLn7XTJEYhD9FN1wzngpokgWc-SML42O8ZW3C23zH3y2ErBUlLlRRyLSTbyg8-Yu80qbDtJp8jR0OEeRLai_BKlPmf-x5PWVJd7pHCmzhQgDlzd1ki64abZvekGMP6urVkRwpYotx8CK4tiwetvXD6LHnIRlv2b2T31QlNUyeKpo7oX8JiVars8PSF90A287GgGo7YfuyCTjkBpvMoFt5M4uOSvDmNB9NSeE5q57EU4aEFNnad_i1rRAtvbh13Al64UgmCKteZrkGGkDIl8582t2YfIKUOrvz9u5uj3IaZV0bTcnjH_m0LqC9W6rQXxnA-CcEcAI0MSbHknhRKAM5wcOINQcvBCec6bKqMvcoML0EBTgFrLCqoi5c7irqHv-ZVC6mZOmtAeMIoOsotDaIQJV--DMXgDCT6PM7aTRRLSzK2Ox63XZISYgZof7v3RY0uGHKbWr989zAqQvm7oTIuYn8nRRaPPYuacf1sZCTZjmm6Gu4uQKy5TcsK2hyFF97tAYfbTKPRBWLvX3lqPGX7-AiOJjJIeducQXL3eerejby42pB7X9ewVqH_JROiBNfEFHzj3-LJC7CtxmOiqSmL3SpfXxhlLt3IORGZ6kIPno5SfehiYkfb3i3GrlEwP91FpkFOMmAtcd77ixy5CwxMNUykgespBvBp00wAsauWJAtgTE23hYZjx4FzpZS_-jzR8IW4u2KlAqvvN83eayoB5ZOlhTvyhNMjVJxE-TeXxQoK-3zmLNOmYc1RVNFK27SAM1aQ1DDWyKX9MAP3qITzhYEbyoCTc5xLF8w6t_qDehlgsY7HUbFO31579MzeB7eG97fxot_lUathdqXV8Tg.qvCifbsgCJ11G_OqYPz4WA'

  //   options.headers = jwt
  // }

  options.cancelToken = new CancelToken(cancel => {
    window.cancelRequest.set(Symbol(Date.now()), {
      pathname: window.location.pathname,
      cancel,
    })
  })

  const isDevelopmentEnv = process.env.NODE_ENV !== 'production'
  const requestStartTime = new Date()
  if (isDevelopmentEnv) {
    if (console.group) {
      console.group('%c接口请求', 'color: green')
    }
    console.log(
      `%c[%s] %c%s %c@%s`,
      'color: green',
      options.method,
      'color: #00a7e0',
      options.url,
      'font-size: 10px;color: #bbb',
      requestStartTime
    )
    console.log('%c参数: ', 'color: #555', options.data)
  }

  return axios(options)
    .then(response => {
      if (isDevelopmentEnv) {
        if (response.status > 400) {
          console.log(
            '%c错误: %d %s',
            'color: red',
            response.status,
            response.statusText
          )
        }
      }

      const { statusText, status, data } = response
      const responseUrl = response.request.responseURL

      const requestEndTime = new Date()
      if (isDevelopmentEnv) {
        console.log(
          '%c[RESP] %c (%s) %s %c耗时 %dms %c@%s',
          data.code === 'S000000' ? 'color: green' : 'color: red',
          data.code === 'S000000' ? 'color: #555' : 'color: red',
          data.code,
          data.message,
          'font-size: 10px;color: orange',
          requestEndTime - requestStartTime,
          'font-size: 10px;color: #bbb',
          requestEndTime
        )
        console.log('%c结果:', 'color: #555', data.data)
        if (console.groupEnd) {
          console.groupEnd()
        }
      }
      let result = {}
      if (typeof data === 'object') {
        result = data
        if (Array.isArray(data)) {
          result.list = data
        }
      } else {
        result.data = data
      }

      return Promise.resolve({
        success: true,
        message: statusText,
        statusCode: status,
        ...result,
      })
    })
    .catch(error => {
      const { response, message } = error

      if (response.status === 401) {
        localStorage.setItem('jwt', '')
        router.replace('/login')
        return Promise.reject({
          message: '登录已超时,请重新登录',
        })
      }

      if (response.status === 403) {
        return Promise.reject({
          message: '对不起，您没有权限！',
        })
      }

      if (isDevelopmentEnv) {
        console.log(
          '%c错误: %s %d %s',
          'color: red',
          error.message,
          response.status,
          response.statusText
        )
        if (console.groupEnd) {
          console.groupEnd()
        }
      }

      if (String(message) === CANCEL_REQUEST_MESSAGE) {
        return {
          success: false,
        }
      }

      let msg
      let statusCode

      if (response && response instanceof Object) {
        const { data, statusText } = response
        statusCode = response.status
        msg = data.message || statusText
      } else {
        statusCode = 600
        msg = error.message || '网络异常'
      }

      /* eslint-disable */
      return Promise.reject({
        success: false,
        statusCode,
        message: msg,
      })
    })
}
// TODO: 下载失败错误处理
export async function download(url, options) {
  let opt
  opt = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
  }

  if (options) {
    opt = { ...opt, ...options }
  }
  let data
  // let status = false
  try {
    let fileName = null
    fetch(url, opt)
      .then(response => {
        if (response.redirected) {
          // 重定向
          const responseUrl = response.url
          if (responseUrl.startsWith(casLoginUrl)) {
            let exp = new Date()
            exp.setTime(exp.getTime() - 1)
            document.cookie = `jeesite.session.id=0;expires=${exp.toGMTString()}`
            window.location = casLogoutUrl
          }
          if (responseUrl.startsWith(casLogoutUrl)) {
            window.location = responseUrl
          }
        }
        let headerArry = response.headers.get('Content-Disposition').split(';')
        fileName = headerArry[headerArry.length - 1].split('=')[1].substring(7)
        return response.blob()
      })
      .then(blob => {
        let url2 = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        // const nowTime = moment().format('YYYY-MM-DD')
        a.href = url2
        // a.download = '${}filename.xls'
        a.download = fileName ? decodeURIComponent(fileName) : `2312.xlsx`
        a.click()
      })
  } catch (e) {
    // console.log(url, '=================报错', data, e)
  }
  return data
}
