import { request, config } from 'utils'

const { api } = config
const { dashboard } = api

export const getPageList = data => {
  return request(
    {
      url: dashboard,
      method: 'GET',
      data,
    },
    ''
  )
}
