import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

export default class Charts extends PureComponent {

  render() {
    const {dailyData} = this.props;

    var data, dailyTotal, dailyNew;

    if(dailyData.data){
        data = dailyData.data;

        console.log('[Charts] --> data:' + data);

        if(data.dailyTotal){
            dailyTotal = data.dailyTotal;
            console.log('[Charts] -->1, dailyTotal:' + dailyTotal);
        } else {
            console.log('[Charts] --> dailyTotal: is null');
        }

        if(data.dailyNew){
            dailyNew = data.dailyNew;
            console.log('[Charts] -->1, dailyNew:' + dailyNew);
        } else {
            console.log('[Charts] --> dailyNew: is null');
        }
    } else {
        console.log('[Charts] --> data: is null');
    }

    var themeColor = 'dart';
    return (
      <div className='examples'>
        <div className='parent'>
         
          <ReactEcharts
            option={this.newOption(dailyNew)}
            style={{height: '200px', width: '100%'}}
            theme={themeColor}
            className='react_for_echarts' />

          <ReactEcharts
            option={this.totalOption(dailyTotal)}
            style={{height: '200px', width: '100%'}}
            theme={themeColor}
            className='react_for_echarts' />
        </div>
      </div>
    );
  }

  newOption = (dailyNew) => {
    console.log('[Charts] -->2, dailyNew:' + dailyNew);

    return {
      // grid: {
      //   top: 30,
      // },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          left: 'center',
          top: '%',
          data: ['新增确诊', '新增死亡', '新增康复']
      },
      calculable: true,
      xAxis: [
          {
              type: 'category',
              data: ['2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日', '2月8日', '2月9日', '2月10日', '2月11日', '2月12日']
          }
      ],
      yAxis: [
          {
              type: 'value'
          }
      ],
      series: [
          {
              name: '新增确诊',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint: {
                  data: [
                      {type: 'max', name: '最大值'},
                      {type: 'min', name: '最小值'}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              }
          },
          {
              name: '新增死亡',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              markPoint: {
                  data: [
                      {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                      {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                  ]
              },
              markLine: {
                  data: [
                      {type: 'average', name: '平均值'}
                  ]
              }
          },
          {
            name: '新增康复',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            markPoint: {
                data: [
                    {name: '年最高', value: 182.2, xAxis: 7, yAxis: 183},
                    {name: '年最低', value: 2.3, xAxis: 11, yAxis: 3}
                ]
            },
            markLine: {
                data: [
                    {type: 'average', name: '平均值'}
                ]
            }
        }
      ]
    };
  }
    
  totalOption = (dailyTotal) => {
    console.log('[Charts] -->2, dailyTotal: ' + dailyTotal);

    return {
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          left: 'center',
          bottom: '30',
          data: ['确诊总数', '死亡总数', '康复总数']
      },
      grid: {
          left: '3%',
          right: '4%',
          top: '3%',
          containLabel: true
      },
    
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日', '2月8日', '2月9日', '2月10日', '2月11日', '2月12日']
        },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name: '确诊总数',
              type: 'line',
              stack: '总量',
              smooth: true,
              data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 230, 210]
          },
          {
              name: '死亡总数',
              type: 'line',
              stack: '总量',
              smooth: true,
              data: [220, 182, 191, 234, 290, 330, 310, 182, 191, 234, 290, 330, 310]
          },
          {
              name: '康复总数',
              type: 'line',
              stack: '总量',
              smooth: true,
              data: [150, 232, 201, 154, 190, 330, 410, 232, 201, 154, 190, 330, 410]
          }
      ]
    };
  };
}