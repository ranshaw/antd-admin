/**
 * FilterColumn
 *
 * 过滤器分栏组件
 *
 */
import React from 'react'
import PropTypes from 'prop-types'

import { Select, Input, DatePicker, TreeSelect } from 'antd'
import _ from 'lodash'

// 单行文本输入框
export const TYPE_INPUT = 'input'

// 日期时间选择器
export const TYPE_DATE_PICKER = 'datePicker'

// 月份选择器
export const TYPE_MONTH_PICKER = 'monthPicker'

// 时间区间选择器
export const TYPE_DATE_RANGE_PICKER = 'dateRangePicker'

// 周选择器
export const TYPE_WEEK_PICKER = 'weekPicker'

// 下拉选择框
export const TYPE_SELECT = 'select'

// 树选择
export const TYPE_TREE_SELECT = 'treeSelect'

export const COLUMN_TYPES = {
  TYPE_INPUT,
  TYPE_DATE_PICKER,
  TYPE_MONTH_PICKER,
  TYPE_DATE_RANGE_PICKER,
  TYPE_WEEK_PICKER,
  TYPE_SELECT,
  TYPE_TREE_SELECT,
}

export const constants = {
  types: COLUMN_TYPES,
}

/**
 * data 数据条目类型
 */
export const DataItemType = PropTypes.shape({
  // 用户展示给用户的文本，若不提供，则使用 `value.toString()` 获取
  label: PropTypes.string,
  // 值，可以是字符串或者数字
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  // 若提供该方法，则会使用该方法渲染
  render: PropTypes.func,
})

/**
 * 过滤栏属性类型定义
 */
export const columnPropTypes = {
  /**
   * 当前的值
   *
   * 支持以下四种类型的值：
   *
   * 1. 纯字符 `PropTypes.string`
   * 2. 纯数字 `PropTypes.number`
   * 3. 纯字符元素的数组 `PropTypes.arrayOf(PropTypes.string)`
   * 4. 线数字元素的数组 `PropTypes.arrayOf(PropTypes.number)`
   *
   * 且，`FilterColumn` 组件是一个强控制组件， `value` 与 `onChange` 属性
   * 要么同时指定，要么同时不指定，当同时不指定时，该组件一般被用作自定义过滤器的
   * 容器。
   */
  // value: PropTypes.oneOf([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.arrayOf(PropTypes.string),
  //   PropTypes.arrayOf(PropTypes.number),
  // ]).isRequired,

  /**
   * 当值被用户修改时的回调
   *
   * 该函数的签名如下：
   *
   * ```js
   * function onChange (nextValue, previousValue) {}
   * ```
   *
   * - `nextValue`：被修改之后的值
   * - `previousValue`：修改之前的值
   *
   * `FilterColumn` 组件会根据 `value` 传入的值自动匹配值类型，并返回同类型的值
   * 但是需要注意的是，值类型只在第一次定义时被初始化，之后就不再允许被修改
   */
  onChange: PropTypes.func.isRequired,

  /**
   * 过滤器分栏类型
   */
  type: PropTypes.oneOf([...Object.values(constants.types), undefined]),

  /**
   * 当 type 为可选择类型时，必须提供该属性的值
   */
  data: PropTypes.arrayOf(DataItemType),

  /**
   * 是否已禁用
   */
  disabled: PropTypes.bool,

  label: PropTypes.string,

  style: PropTypes.shape({
    width: PropTypes.string,
  }),
}

export const columnDefaultProps = {
  disabled: false,
  data: [],
  style: null,
  onChange: () => {},
}

const renderTreeNode = ({ label, title, key, value, children }) => (
  <TreeSelect.TreeNode title={title || label} key={key} value={value}>
    {children && children.length
      ? children.map(child => renderTreeNode(child))
      : null}
  </TreeSelect.TreeNode>
)

/**
 * Filter Column
 *
 * @returns {React.node} React 节点
 */
export const FilterColumn = ({
  type,
  disabled,
  placeholder,
  data,
  onChange,
  value,
  defaultValue,
  label,
  style,
  searchable,
  column,
  getFieldDecorator,
  itemKey,
  fieldDecoratorOptions,
  ...props
}) => {
  if (type === TYPE_SELECT) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <Select
        {...props}
        showSearch
        filterOption={(value, option) => {
          return (
            option.props.children.toLowerCase().indexOf(value.toLowerCase()) >=
            0
          )
        }}
        optionFilterProp={label || value}
        placeholder={placeholder}
        style={style || { width: '120px' }}
      >
        {Array.isArray(data)
          ? data.map(({ value, label }) => (
              <Select.Option value={value} key={value}>
                {label}
              </Select.Option>
            ))
          : null}
      </Select>
    )
  }
  if (type === TYPE_TREE_SELECT) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <TreeSelect
        style={style || { width: '120px' }}
        placeholder={placeholder}
        checkable
      >
        {Array.isArray(data) && data.filter(node => node).map(renderTreeNode)}
      </TreeSelect>
    )
  }

  if (type === TYPE_INPUT) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <Input {...props} style={style} placeholder={placeholder || label} />
    )
  }

  if (type === TYPE_DATE_PICKER) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <DatePicker {...props} placeholder={placeholder} style={style} />
    )
  }

  if (type === TYPE_MONTH_PICKER) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <DatePicker.MonthPicker {...props} placeholder={placeholder || label} />
    )
  }

  if (type === TYPE_DATE_RANGE_PICKER) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <DatePicker.RangePicker
        {...props}
        placeholder={placeholder}
        style={style}
        // showTime={{ format: 'HH:mm' }}
        // format="YYYY-MM-DD HH:mm"
      />
    )
  }

  if (type === TYPE_WEEK_PICKER) {
    return getFieldDecorator(itemKey, fieldDecoratorOptions)(
      <DatePicker.WeekPicker
        {...props}
        placeholder={placeholder || label}
        onChange={(date, dateString) =>
          onChange({ value: date, date, dateString })
        }
        style={style}
      />
    )
  }

  return (
    <div className="filter column">
      {type}: {value}
    </div>
  )
}

FilterColumn.propTypes = { ...columnPropTypes }
FilterColumn.defaultProps = { ...columnDefaultProps }
FilterColumn.constants = { ...constants }

FilterColumn.DataItemType = DataItemType

export default FilterColumn
