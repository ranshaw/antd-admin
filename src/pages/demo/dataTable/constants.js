import { DataTable } from 'components'

export const AUDITING_STATUSES = [
  {
    value: 'all',
    label: '全部',
    values: ['10', '30', '40', '50', '65', '70', '80'],
  },
  {
    value: 'onShielf',
    label: '待审核',
    values: ['30'],
  },
  {
    value: 'soldout',
    label: '审核通过',
    values: ['40', '50', '65', '70', '80'],
  },
  {
    value: 'inStock',
    label: '审核不通过',
    values: ['15'],
  },
]

export const tableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
]

export const auditsTableColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
]

export const tableFilter = {
  visible: true,
  autoTrigger: false,
  columns: [
    {
      type: DataTable.constants.columnTypes.TYPE_INPUT,
      label: {
        text: '商户',
        isShowColon: false,
      },
      placeholder: '品牌-门店',
      key: 'storeId1',
    },
  ],
}
