import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page, DataTable } from 'components'
import { auditsTableColumns, tableFilter } from './constants'
import { formatDatetime } from 'utils'
// import { isNumber } from 'utils'
// import { Button } from 'antd'
// const bodyStyle = {
//   bodyStyle: {
//     height: 432,
//     background: '#fff',
//   },
// }

@connect(({ app, workbench, loading }) => ({
  workbench,
  loading,
}))
class Workbench extends PureComponent {
  handleFilterReset = () => {}
  handleFilterSubmit = getValues => {
    getValues((err, values) => {
      if (!err) {
        console.log(
          'values---',
          values,
          formatDatetime(values.storeId4),
          formatDatetime(values.storeId4, 'YYYY-MM')
        )
      }
    })
  }
  render() {
    const { workbench, dispatch, loading } = this.props
    const tableFilterColumns = [...tableFilter.columns]
    const { dataSource, pagination } = workbench
    // 下拉选择
    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_SELECT,
      label: {
        text: '下拉搜索框',
        isShowColon: false,
      },
      placeholder: '品牌-门店',
      key: 'storeId2',
      fieldDecoratorOptions: {},
      data: [{ value: '1', label: '一一' }, { value: '2', label: '二二' }],
    })
    // 下拉树选择
    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_TREE_SELECT,
      label: {
        text: '下拉树选择',
        isShowColon: false,
      },
      placeholder: '品牌-门店',
      key: 'storeId3',
      fieldDecoratorOptions: {},
      data: [
        {
          title: 'Node1',
          value: '0-0',
          key: '0-0-key',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
              key: '0-0-1-key',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
              key: '0-0-2-key',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
          key: '0-1-key',
        },
      ],
    })

    // 日期选择
    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_DATE_PICKER,
      label: {
        text: '日期选择',
        isShowColon: false,
      },
      placeholder: '日期选择',
      key: 'storeId4',
      fieldDecoratorOptions: {},
    })

    //  月份选择器
    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_MONTH_PICKER,
      label: {
        text: '月份选择器',
        isShowColon: false,
      },
      placeholder: '月份选择器',
      key: 'storeId5',
      fieldDecoratorOptions: {},
    })

    //  选择时间段
    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_DATE_RANGE_PICKER,
      label: {
        text: '选择时间段',
        isShowColon: false,
      },
      placeholder: '选择时间段',
      key: 'storeId6',
      fieldDecoratorOptions: {},
    })

    // 选择周

    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_WEEK_PICKER,
      label: {
        text: '选择时间段',
        isShowColon: false,
      },
      placeholder: '选择时间段',
      key: 'storeId7',
      fieldDecoratorOptions: {},
    })

    return (
      <Page>
        <DataTable
          columns={[
            ...auditsTableColumns,
            {
              title: '操作',
              key: 'action',
              render: (text, record) => <span>查看</span>,
            },
          ]}
          tableFilter={{
            ...tableFilter,
            columns: tableFilterColumns,
            key: Math.random(),
          }}
          dataSource={dataSource}
          pagination={{
            ...pagination,
            onChange: this.handlePagination,
          }}
          // loading={loading}
          onChange={this.handleDataTableChange}
          onFilterChange={this.handleFilterChange}
          onFilterSubmit={this.handleFilterSubmit}
          onFilterReset={this.handleFilterReset}
        />
      </Page>
    )
  }
}

Workbench.propTypes = {
  workbench: PropTypes.object,
  loading: PropTypes.object,
}

export default Workbench
