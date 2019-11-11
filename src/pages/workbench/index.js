import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Page, DataTable } from 'components'
import { auditsTableColumns, tableFilter } from './constants'
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
        console.log('values---', values)
      }
    })
  }
  render() {
    const { workbench, dispatch, loading } = this.props
    const tableFilterColumns = [...tableFilter.columns]
    const { dataSource, pagination } = workbench
    tableFilterColumns.push({
      type: DataTable.constants.columnTypes.TYPE_INPUT,
      label: {
        text: '门店',
        isShowColon: false,
      },
      placeholder: '品牌-门店',
      key: 'storeId2',
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
