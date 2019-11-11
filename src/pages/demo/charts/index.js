import React from 'react'

import ReactEcharts from 'echarts-for-react'

export default () => {
  // 折线图

  const option3 = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {},
      },
    ],
  }

  // 饼状图

  var data2 = {
    seriesData: [
      {
        name: '男',
        value: 94132,
      },
      {
        name: '女',
        value: 3755,
      },
      {
        name: '未知',
        value: 72540,
      },
    ],
  }

  const option2 = {
    title: {
      text: '会员性别分布',
      x: 'left',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: [{ name: '男' }, { name: '女' }, { name: '未知' }],
      // selected: data.selected,
    },
    series: [
      {
        name: '性别',
        type: 'pie',
        radius: '55%',
        center: ['40%', '50%'],
        data: data2.seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          normal: {
            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            backgroundColor: '#eee',
            borderColor: '#aaa',
            borderWidth: 1,
            borderRadius: 4,
            rich: {
              a: {
                color: '#999',
                lineHeight: 22,
                align: 'center',
              },
              // abg: {
              //   backgroundColor: '#333',
              //   width: '100%',
              //   align: 'right',
              //   height: 22,
              //   borderRadius: [4, 4, 0, 0],
              // },
              hr: {
                borderColor: '#aaa',
                width: '100%',
                borderWidth: 0.5,
                height: 0,
              },
              b: {
                fontSize: 16,
                lineHeight: 33,
              },
              per: {
                color: '#eee',
                backgroundColor: '#334455',
                padding: [2, 4],
                borderRadius: 2,
              },
            },
          },
        },
      },
    ],
  }

  const dataList = [
    {
      yearDruation: 0,
      groupID: 189702,
      customerSex: 0,
      personNum: 40,
    },
    {
      yearDruation: 0,
      groupID: 189702,
      customerSex: 1,
      personNum: 9949,
    },
    {
      yearDruation: 0,
      groupID: 189702,
      customerSex: 2,
      personNum: 21761,
    },
    {
      yearDruation: 1970,
      groupID: 189702,
      customerSex: 1,
      personNum: 2,
    },
    {
      yearDruation: 1980,
      groupID: 189702,
      customerSex: 0,
      personNum: 8,
    },
    {
      yearDruation: 1980,
      groupID: 189702,
      customerSex: 1,
      personNum: 46,
    },
    {
      yearDruation: 1980,
      groupID: 189702,
      customerSex: 2,
      personNum: 5,
    },
    {
      yearDruation: 1990,
      groupID: 189702,
      customerSex: 0,
      personNum: 8,
    },
    {
      yearDruation: 1990,
      groupID: 189702,
      customerSex: 1,
      personNum: 12,
    },
    {
      yearDruation: 1990,
      groupID: 189702,
      customerSex: 2,
      personNum: 3,
    },
    {
      yearDruation: 2000,
      groupID: 189702,
      customerSex: 0,
      personNum: 42,
    },
    {
      yearDruation: 2000,
      groupID: 189702,
      customerSex: 1,
      personNum: 24,
    },
    {
      yearDruation: 2000,
      groupID: 189702,
      customerSex: 2,
      personNum: 10,
    },
  ]
  const arr = [
    {
      yearDruation: 0,
      value: '未知',
    },
    {
      yearDruation: 2000,
      value: '00后',
    },
    {
      yearDruation: 1990,
      value: '90后',
    },
    {
      yearDruation: 1980,
      value: '80后',
    },
    {
      yearDruation: 1970,
      value: '70后',
    },
    {
      yearDruation: 1960,
      value: '60后',
    },
    {
      yearDruation: 1950,
      value: '60前',
    },
  ]

  // let yAxisData = []
  // let sum = 0
  // let dataArr1 = []
  // let dataArrPercent1 = []
  // let dataArr2 = []
  // let dataArrPercent2 = []
  // let dataArr3 = []
  // let dataArrPercent3 = []

  // dataList.forEach(v => {
  //   arr.forEach(val => {
  //     if (v.yearDruation === val.yearDruation) {
  //       v.value = val.value
  //     }
  //   })
  //   sum += v.personNum
  // })

  // dataList.forEach(v => {
  //   yAxisData.push(v.value)

  //   if (v.customerSex === 0) {
  //     dataArr1.push(v.personNum)
  //     dataArrPercent1.push((v.personNum / sum).toFixed(2))
  //   } else if (v.customerSex === 1) {
  //     dataArr2.push(v.personNum)
  //     dataArrPercent2.push((v.personNum / sum).toFixed(2))
  //   } else {
  //     dataArr3.push(v.personNum)
  //     dataArrPercent3.push((v.personNum / sum).toFixed(2))
  //   }
  // })

  // 柱状图
  const { dataArr, dataArrPercent, dataArr2, dataArrPercent2 } = {
    dataArr: [80, 100, 120, 140, 160, 100, 80],
    dataArrPercent: [40, 50, 60, 70, 80, 65, 20],
    dataArr2: [100, 100, 80, 60, 40, 70, 120],
    dataArrPercent2: [40, 50, 40, 30, 20, 35, 60],
  }
  const option = {
    title: {
      text: '会员年龄分布',
      show: true,
      textStyle: {
        color: '#333333',
        fontSize: 16,
      },
      x: 'left',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
      formatter: (params, ticket, callback) => {
        let index = params[0]['dataIndex'] // 不能传更多参数,先把参数params增加一个自定义的key：currentData表示真实数据
        if (params[0]) {
          params[0]['currentData'] = dataArr[index]
        }
        if (params[1]) {
          params[1]['currentData'] = dataArr2[index]
        }
        return formatterToolTip(params, ticket, callback)
      },
    },
    legend: {
      data: ['AA', 'BB'],
      left: 'center',
      bottom: 10,
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: {
        show: true,
        interval: 'auto',
        formatter: '{value} %',
      },
      show: true,
    },
    yAxis: {
      type: 'category',
      data: [
        '20190806',
        '20190807',
        '20190808',
        '20190809',
        '20190810',
        '20190811',
        '20190812',
      ],
    },
    series: [
      {
        name: 'AA',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: v => {
              return dataArr[v.dataIndex]
            },
          },
        },
        itemStyle: {
          color: '#5b9bd5',
        },
        data: dataArrPercent,
      },
      {
        name: 'BB',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: v => {
              return dataArr2[v.dataIndex]
            },
          },
        },
        itemStyle: {
          color: '#ed7d31',
        },
        data: dataArrPercent2,
      },
    ],
  }

  const formatterToolTip = (params, ticket, callback) => {
    let tipString = `${params[0].axisValue}<br/>` // 显示提示文字模板
    for (let i = 0, length = params.length; i < length; i++) {
      tipString += `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background:${params[i].color}"></span>`
      tipString += `${params[i].seriesName}: ${params[i].currentData}(${params[i].value}%)<br/>`
    }
    return tipString
  }

  return (
    <div>
      <ReactEcharts
        option={option3}
        style={{ height: '300px', width: '100%' }}
        theme="theme"
      ></ReactEcharts>

      <ReactEcharts
        option={option2}
        style={{ height: '300px', width: '100%' }}
        theme="theme"
      ></ReactEcharts>

      <ReactEcharts
        option={option}
        style={{ height: '300px', width: '100%' }}
        theme="theme"
      ></ReactEcharts>
    </div>
  )
}
