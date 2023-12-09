import FalconComponentCard from 'components/common/FalconComponentCard';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { BarChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { tooltipFormatter } from 'helpers/echart-utils';
import { getColor } from 'helpers/utils';
import React from 'react';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  CanvasRenderer,
  LegendComponent
]);

const StackedHorizontalChart = ({ data }) => {
  // console.log(data.gokhaAllOK);

  const resultLabel =
    data.gokuLowBattery <= 0 || data.gokhaLowBattery <= 0 ? false : true;
  // data.gokuLowBattery <= 0 ? false : data.gokhaLowBattery <= 0 ? false : true;

  const chartCode = `function ChartOptions() {
    const days = ['GOKU 12', 'GOKHA 10'];
  
    const getOption = () => ({
      color: [
        getColor('success'),
        getColor('danger'),
        getColor('warning'),
        getColor('dark'),
        getColor('gray')
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        padding: [7, 10],
        backgroundColor: getColor('gray-100'),
        borderColor: getColor('gray-300'),
        textStyle: { color: getColor('primary') },
        borderWidth: 1,
        transitionDuration: 0,
        formatter: tooltipFormatter
      },
      toolbox: {
        feature: {
          magicType: {
            type: ['stack', 'tiled']
          }
        },
        right: 0
      },
      legend: {
        data: ['Direct', 'Mail Ad', 'Affiliate Ad', 'Video Ad', 'Search Engine'],
        textStyle: {
          color: getColor('gray-600')
        },
        left: 0
      },
      xAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: getColor('gray-300')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('gray-500')
        },
        splitLine: {
          lineStyle: {
            show: true,
            color: getColor('gray-200')
          }
        }
      },
      yAxis: {
        type: 'category',
        data: days,
        axisLine: {
          lineStyle: {
            show: true,
            color: getColor('gray-300')
          }
        },
        axisTick: { show: false },
        axisLabel: {
          color: getColor('gray-500'),
          // formatter: value => value.substring(0, 3)
        }
      },
      series: [
        {
          name: 'All OK',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          data: [${data.gokuAllOK},${data.gokhaAllOK}]
         
        },
        {
          name: 'Low Battery',
          type: 'bar',
          stack: 'total',
          label: {
            show : true,
            color : '#fff'
            // show: ${resultLabel}
          },
          emphasis: {
            focus: 'series'
          },
          data: [${data.gokuLowBattery},${data.gokhaLowBattery}]
        },
        {
          name: 'Drifted',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
            color: '#fff'
          },
          emphasis: {
            focus: 'series'
          },
          data: [${data.gokuOutOfRange},${data.gokhaOutOfRange}]
        },
        {
          name: 'Unlit',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: { 
            focus: 'series'
          },
          data: [${data.gokuLightNotOk},${data.gokhaLightNotOk}]
        },
        {
          name: 'No Data',
          type: 'bar',
          stack: 'total',
          label: {
            show: true,
          },
          emphasis: {
            focus: 'series'
          },
          data: [${data.gokuNoData},${data.gokhaNoData}]
        }
      ],
      grid: {
        right: 15,
        left: 5,
        bottom: 5,
        top: '15%',
        containLabel: true
      }
      });
    
      return (
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          style={{ height: '383px' }}
        />
      );
    }
  `;

  return (
    <div>
      <FalconComponentCard className="h-10">
        <FalconComponentCard.Header
          title="Zone Wise Status - 22"
          light={false}
          className="ms-1"
          // className="pt-4"
        />
        <FalconComponentCard.Body
          code={chartCode}
          language="jsx"
          scope={{
            ReactEChartsCore,
            echarts,
            getColor,
            tooltipFormatter
          }}
        />
      </FalconComponentCard>
    </div>
  );
};

export default StackedHorizontalChart;
