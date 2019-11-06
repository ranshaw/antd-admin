import modelExtend from 'dva-model-extend'

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      current: 1,
      total: 0,
      pageSize: 10,
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination } = payload
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
        },
      }
    },
  },
})

// eslint-disable-next-line valid-jsdoc
/**
 * 常规查询页面逻辑modal扩展
 *
 * @param {object} options
 * options中的 reqFn，为请求函数； namespace 为当前modal的名字；downloadFn 为下载的请求函数
 * cbFn 对返回数据进行处理
 * @returns
 */
export const filterModel = function(options) {
  return {
    state: {
      dataSource: [],
      pagination: {
        showQuickJumper: true,
        total: 0,
        showTotal(total) {
          return `共 ${total} 条`
        },
        current: 1,
      },
      searchData: null,
      changePage: 1,
      pageSize: 10,
    },
    effects: {
      *getPageList({ payload, cb, isDownload }, { put, call, select }) {
        let reqFn = options.reqFn
        let pageNum = null
        if (payload.pageNum) {
          pageNum = payload.pageNum
        }
        // 保存查询数据
        if (payload.type === 'search') {
          yield put({
            type: 'saveSearchData',
            payload: payload.data || {},
          })
        } else if (payload.type === 'reset') {
          yield put({
            type: 'saveSearchData',
            payload: payload.data || {},
          })
        }

        // 克隆一下防止合并对象时提示无法分配只读文件
        payload = _.cloneDeep(payload)

        const { searchData, pageSize, pagination } = yield select(
          state => state[options.namespace]
        )
        // 添加查询数据
        if (searchData) {
          Object.assign(payload, searchData)
        }

        // 导出
        if (isDownload) {
          reqFn = options.downloadFn
        }

        payload = {
          ...payload,
          pageSize,
          pageNum: pageNum || pagination.current,
        }

        const ret = yield call(reqFn, payload)
        if (isDownload) return

        if (ret.code === 'S000000') {
          if (!ret.data) return
          options.cbFn && options.cbFn(ret.data)

          if (options.makeData) {
            ret.data.list = options.makeData(ret.data.list)
          }

          yield put({
            type: 'pageList',
            payload: ret.data,
          })
          if (typeof cb === 'function') {
            cb()
          }
        } else {
          message.warning(ret.message)
        }
      },
    },
    reducers: {
      pageList(state, { payload }) {
        const { pageNum, total, list } = payload
        return {
          ...state,
          pagination: { ...state.pagination, total, current: pageNum },
          dataSource: list,
        }
      },
      saveSearchData(state, { payload }) {
        return { ...state, searchData: payload }
      },
      changeDataSource(state, { payload }) {
        return { ...state, dataSource: payload.list }
      },
      saveOnchangePage(state, { payload }) {
        return {
          ...state,
          changePage: payload,
        }
      },
    },
  }
}
