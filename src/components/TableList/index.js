import React from 'react'
import styles from './index.less'
import { Row, Input } from 'antd'
import FilterColumn from 'components/DataTable/FilterColumn'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const filterNoBorder = {
  width: '100%',
  height: '100%',
  border: 'none',
  boxShadow: 'none',
}

const TableList = ({ listArr, styleWrap, getFieldDecorator }) => {
  const getElement = (v, i) => {
    if (v.type === 'node' && v.isEdit) {
      return (
        <FilterColumn
          itemKey={v.id}
          type={v.value}
          fieldDecoratorOptions={v.fieldDecoratorOptions || {}}
          getFieldDecorator={getFieldDecorator}
          style={v.style || filterNoBorder}
          data={v.selectList}
        />
      )
    } else {
      return v.value || v
    }
  }

  return (
    <div className="tableList" style={{ width: '100%' }}>
      {listArr.map((lists, i) => (
        <Row
          style={styleWrap && styleWrap}
          key={i}
          className={classNames(styles.billInfoItem, {
            [styles.noTopBorder]: i > 0,
          })}
        >
          {lists.map((v, j) => (
            <div className={styles.item} key={j}>
              {v !== null && getElement(v, i)}
            </div>
          ))}
        </Row>
      ))}
    </div>
  )
}

TableList.propTypes = {
  listArr: PropTypes.array.isRequired,
  styleWrap: PropTypes.object,
  getFieldDecorator: PropTypes.func,
}

export default TableList
