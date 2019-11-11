import React from 'react'
import PropTypes from 'prop-types'

import { Form, Col, Row, Button } from 'antd'

import FilterColumn from './FilterColumn'

export const ColumnsItemType = PropTypes.shape({
  /**
   * 过滤器分栏类型
   */
  type: PropTypes.oneOf([
    ...Object.values(FilterColumn.constants.types),
    undefined,
  ]),

  /**
   * 当 type 为可选择类型时，必须提供该属性的值
   */
  data: PropTypes.arrayOf(FilterColumn.DataItemType),

  /**
   * 是否已禁用
   */
  disabled: PropTypes.bool,

  /**
   * 是否展示
   */
  visible: PropTypes.bool,

  /**
   * 该类的键
   *
   * 必须提供，将由该键确定被更新的是哪个值
   */
  key: PropTypes.string.isRequired,
})

export const filterPropTypes = {
  /**
   * 过滤器分栏
   */
  columns: PropTypes.arrayOf(ColumnsItemType),

  autoTrigger: PropTypes.bool,
  onPressSubmit: PropTypes.func,
  canReset: PropTypes.bool,
  onPressReset: PropTypes.func,
  rowGutter: PropTypes.number,
  columnSpan: PropTypes.number,
}

export const filterDefaultProps = {
  columns: [],
  autoTrigger: true,
  canReset: true,
  onChange: () => {},
  onSubmit: undefined,
  onReset: undefined,
}

const Divider = () => <div style={{ display: 'block' }} />

/**
 * Data Table Filter
 *
 * @returns {React.node} React 节点
 */
export const FilterForm = ({
  columns,
  extraActions,
  autoTrigger,
  canReset,
  onChange,
  onSubmit,
  onReset,
  visible,
  form: { getFieldDecorator, validateFieldsAndScroll, resetFields },
}) => {
  return (
    <Form
      className="filter"
      layout="inline"
      style={{ marginBottom: '20px', display: visible ? 'block' : 'none' }}
    >
      {columns.map(
        ({
          key,
          span,
          fieldDecoratorOptions,
          onChange: onColumnChange,
          componentId,
          ...column
        }) => {
          return column.type === undefined ? (
            <Divider key={key} />
          ) : (
            <Form.Item
              colon={column.label.isShowColon}
              label={column.label.text}
              key={componentId || key}
            >
              <FilterColumn
                {...column}
                column={column}
                itemKey={key}
                fieldDecoratorOptions={fieldDecoratorOptions || {}}
                onChange={changed =>
                  onColumnChange
                    ? onColumnChange({ ...changed, key, column })
                    : onChange({ ...changed, key, column })
                }
                getFieldDecorator={getFieldDecorator}
              />
            </Form.Item>
          )
        }
      )}
      {canReset && onReset ? (
        <Form.Item>
          <Button
            onClick={() => {
              console.log('清除数据', resetFields)
              resetFields()
            }}
          >
            清除条件
          </Button>
        </Form.Item>
      ) : null}
      {!autoTrigger && onSubmit ? (
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              onSubmit(validateFieldsAndScroll)
            }}
          >
            查询
          </Button>
        </Form.Item>
      ) : null}
      <Form.Item>{extraActions && extraActions}</Form.Item>
    </Form>
  )
}

const Filter = Form.create()(FilterForm)
Filter.propTypes = { ...filterPropTypes }
Filter.defaultProps = { ...filterDefaultProps }
Filter.Column = FilterColumn
Filter.constants = {
  columnTypes: FilterColumn.constants.types,
}

export default Filter
