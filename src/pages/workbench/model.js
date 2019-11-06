import { parse } from 'qs'
import modelExtend from 'dva-model-extend'
import api from 'api'
import { pathMatchRegexp } from 'utils'
import { model } from 'utils/model'

const { queryDashboard } = api

export default modelExtend(model, {
  namespace: 'workbench',
  state: {
    sales: [],

    numbers: [],
    recentSales: [],
    comments: [],
    completed: [],
    browser: [],
    cpu: {},
    user: {},
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
})
