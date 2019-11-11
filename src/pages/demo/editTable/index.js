import React, { PureComponent } from 'react'
import { Button, Form, Row, Col, Input } from 'antd'
import { Color } from 'utils'
import styles from './index.less'
import classnames from 'classnames'
import { TableList, tableListHelper } from 'components'

class EditTableForm extends PureComponent {
  constructor(props) {
    super(props)
    // TODO: 从model中拿数据
    this.state = {
      listArr: tableListHelper(
        [
          {
            list: [
              '商户名称',
              {
                type: 'text',
                value: '2323232',
              },
            ],
            id: 'companyName',
          },
          {
            list: [
              '识别号',
              {
                type: 'node',
                value: 'select',
                isEdit: true,
                id: 'taxpayerId',
                selectList: [{ value: '121212', label: 'text' }],
                fieldDecoratorOptions: {},
              },
            ],
            id: 'taxpayerId',
          },
          {
            list: [
              '地址',
              {
                type: 'node',
                value: 'input',
                isEdit: true,
                id: 'address',
                selectList: [{ value: '121212', label: 'text' }],
                fieldDecoratorOptions: {},
              },
            ],
            id: 'address',
          },
          {
            list: ['电话', ''],
            id: 'mobile',
          },
        ],
        4
      ),
    }
  }

  render() {
    const {
      getFieldDecorator,
      validateFieldsAndScroll,
      resetFields,
    } = this.props.form
    return (
      <Form className={styles.container}>
        <div className={styles.top}>
          <div className={styles.containerTitle}>
            <div className={styles.line}></div>
            <div className={styles.title}>门店基础信息</div>
          </div>
          <div className={styles.btns}>
            <Button>编辑</Button>
            <Button
              onClick={() => {
                validateFieldsAndScroll((err, values) => {
                  if (!err) {
                    console.log('结果', values)
                  }
                })
              }}
              className={styles.save}
              type="primary"
            >
              保存
            </Button>
          </div>
        </div>

        <TableList
          getFieldDecorator={getFieldDecorator}
          listArr={this.state.listArr}
        />
      </Form>
    )
  }
}

const EditTable = Form.create()(EditTableForm)

export default EditTable
