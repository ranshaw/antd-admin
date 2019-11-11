import React from 'react'
import PropTypes from 'prop-types'

import { Table as AntdTable } from 'antd'

import Filter from './Filter'

export const ExtraActionType = PropTypes.shape({
  label: PropTypes.string,
  onAction: PropTypes.func,
  key: PropTypes.string,
})

/**
 * Antd Table Cloned
 *
 * @returns {React.node} React 节点
 */
export const Table = ({
  tableFilter,
  onFilterChange,
  onFilterSubmit,
  onFilterReset,
  extraActions,
  extraCount,
  onExtraAction,
  ...tableProps
}) => {
  return (
    <div className="data table">
      <Filter
        {...tableFilter}
        onChange={onFilterChange}
        onSubmit={onFilterSubmit}
        onReset={onFilterReset}
        onExtraAction={onExtraAction}
        extraActions={extraActions}
      />
      {extraCount}
      <AntdTable {...tableProps} style={{ backgroundColor: 'white' }} />
    </div>
  )
}

Table.propTypes = {
  ...AntdTable.propTypes,
  tableFilter: PropTypes.shape({
    visible: PropTypes.bool,
  }),
  // extraActions: PropTypes.oneOf([ExtraActionType, PropTypes.node]),
  onExtraAction: PropTypes.func,
  onFilterChange: PropTypes.func,
  onFilterSubmit: PropTypes.func,
  onFilterReset: PropTypes.func,
}

Table.defaultProps = {
  onFilterChange: () => {},
  extraActions: [],
  onExtraAction: undefined,
  onFilterSubmit: undefined,
  onFilterReset: undefined,
}

Table.Filter = Filter
Table.constants = {
  ...Filter.constants,
}

export default Table
