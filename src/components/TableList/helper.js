import { isNumber } from 'utils'
import _ from 'lodash'

function tableListHelper(listData, lineNum) {
  if (!Array.isArray(listData) || !isNumber(lineNum)) {
    // eslint-disable-next-line no-console
    return console.error('请传入合法的参数')
  }

  let listArr = []
  let cloneList = _.cloneDeep(listData)
  for (let i = 0; i < Math.ceil(listData.length / lineNum); i++) {
    let mergeArr = []
    cloneList.splice(0, lineNum).forEach(v => {
      mergeArr = mergeArr.concat(v.list)
    })
    listArr.push(mergeArr)
  }

  const firstLen = listArr[0].length
  const lastLen = listArr[listArr.length - 1].length
  if (firstLen - lastLen > 0) {
    for (let i = 0; i < firstLen - lastLen; i++) {
      listArr[listArr.length - 1].push(null)
    }
  }

  return listArr
}

export { tableListHelper }

export default {
  tableListHelper,
}
