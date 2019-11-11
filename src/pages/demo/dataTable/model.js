// import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
// import api from 'api'
import { pathMatchRegexp } from 'utils'
import { filterModel } from 'utils'

// const { queryDashboard } = api

export default modelExtend(
  filterModel({
    namespace: 'workbench',
    reqFn: () => {}, // 请求数据函数
  }),
  {
    namespace: 'workbench',
    state: {
      dataSource: [],
    },
    subscriptions: {
      setup({ dispatch, history }) {
        history.listen(({ pathname }) => {
          if (
            pathMatchRegexp('/workbench', pathname) ||
            pathMatchRegexp('/', pathname)
          ) {
            dispatch({ type: 'query' })
            dispatch({ type: 'queryWeather' })
          }
        })
      },
    },
    effects: {
      *query({ payload }, { call, put }) {
        // const data = yield call(queryDashboard, parse(payload))
        // yield put({
        //   type: 'updateState',
        //   payload: data,
        // })
      },
    },
  }
)
