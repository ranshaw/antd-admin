import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import CountUp from 'react-countup'
import { isNumber } from 'utils'
import { Button } from 'antd'
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
  render() {
    return (
      <div>
        <CountUp start={0} end={100} duration={2.75} />
      </div>
    )
  }
}

Workbench.propTypes = {
  workbench: PropTypes.object,
  loading: PropTypes.object,
}

export default Workbench
