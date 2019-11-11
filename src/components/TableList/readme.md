### 说明

- 配置成可编辑表单

listArr 和 getFieldDecorator 为必传字段，TableList 应放到 form 表单中，通过 form 自带的方法获取输入的值,
如果将 tableListHelper 放在组件内执行，当执行编辑动作的时候，会重复执行，所以放到父级进行处理

```javascript
// listArr 示例
{
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
                type: 'node', // type 为node且isEdit为真的时候则根据value值渲染不同的组件
                value: 'select', // 有 datePicker，monthPicker，weekPicker，select，treeSelect
                isEdit: true, // 决定可编辑表单是否能编辑
                id: 'taxpayerId',
                selectList: [{ value: '121212', label: 'text' }], // select，treeSelect传入的下拉列表
                fieldDecoratorOptions: {}, // 对应form表中的getFieldDecorator中的第二个参数
              },
            ],
            id: 'taxpayerId',
          },
          {
            list: ['地址', ''],
            id: 'address',
          },
          {
            list: ['电话', ''],
            id: 'mobile',
          },
        ],
        4  // 一行展示多少列
      ),
    }
```

- 配置为纯展示表单

只需要传入 listArr 即可

```javascript
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
            list: ['地址', ''],
            id: 'address',
          },
          {
            list: ['电话', ''],
            id: 'mobile',
          },
        ],
        4 // 一行展示多少列
      ),
    }
```
