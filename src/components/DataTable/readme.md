### 使用说明

````javascript
/**
 * 使用方式
 *
 * 定义一个 DataTable 配置对象
 * const config = {
 *   // 数据列配置，参考：https://ant.design/components/table-cn/
 *   columns: [
 *     {
 *       title: 'Column Title',
 *       dataIndex: 'dataIndex',
 *       key: 'key',
 *       render: (text) => customeRender(text)
 *     }
 *   ],
 *   // 数据源
 *   dataSource: [
 *     {dataIndex: 'xxx'},
 *   ],
 *   pagination: {
 *     pageSize: 10, // 每页展示条目数
 *     current: 1, // 当前页面
 *     pageCount: 12, // 总页面数
 *     total: 119, // 总数据条数
 *     defaultPageSize: 10, // 默认分页数据量
 *     defaultCurrent: 1, // 默认当前页
 *     onChange: handlePaginationChange, // 处理分页回调
 *   },
 *   loading: false, // 数据是否加载中
 *   onFilterChange: handleFilterChange, // 当 Filter 值变更时执行
 *   onFilterSubmit: handleFilterSubmit, // 当点击查询时执行
 *   onFilterReset: handleFilterReset, // 当重置过滤器时执行
 *   tableFilter: {
 *     visible: true, // 是否展示 Filter
 *     autoTrigger: false, // 点击时是否主动触发搜索
 *     key: tableFilterKey,
 *     columns: [
 *       {
 *         // 过滤器类型，可选值有 TYPE_INPUT、TYPE_SELECT、TYPE_TREE_SELECT、
 *         // TYPE_DATE_PICKER、TYPE_MONTH_PICKER、TYPE_DATE_RANGE_PICKER、
 *         // TYPE_WEEK_PICKER
 *         type: DataTable.constants.columnTypes.TYPE_INPUT,
 *         // 标签：被用于 <Form.Item label={label}> 的值
 *         label: '用户名',
 *         // 键，该过滤器值的键，在获得该过滤器值时需要用到
 *         key: 'username',
 *         // 值，当前过滤器的值（暂未实现）
 *         value: '',
 *         // 自定义样式
 *         style: { width: '60px' },
 *         // 占位符
 *         placeholder: '搜索用户名',
 *         // 对于 SELECT 或者 TREE_SELECT 类型，需要提供可选项数据列表
 *         data: [
 *           {
 *             value: '1',
 *             label: '某某'
 *           },
 *           {
 *             value: '2',
 *             label: '哈哈',
 *             children: [], // 对于 TREE_SELECT，通过 children 属性增加下一级
 *           }
 *         ]
 *       }
 *     ]
 *   }
 *   ... // 其它 Ant.Design Table 支持的配置可以直接添加到该配置对象中
 * }
 *
 * // 然后 render 它
 *
 * render() {
 *   return <DataTable {...config} />
 * }
 * ```
 */
````
