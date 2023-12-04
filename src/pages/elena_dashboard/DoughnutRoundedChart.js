import FalconComponentCard from 'components/common/FalconComponentCard';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { PieChart } from 'echarts/charts';
import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { getColor } from 'helpers/utils';
import React from 'react';
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PieChart,
  CanvasRenderer,
  LegendComponent
]);

const DoughnutRoundedChart = ({ data }) => {
  console.log(data.allOK);
  const chartCode = `function ChartOptions() {
    const chartRef = useRef(null)
    
    const isMobile = window.innerWidth < 992;
    
    const getOption = () => ({
      legend: {
        orient: window.innerWidth < 530 ? 'horizontal' : 'horizontal', // Change the legend orientation
        left: 'left',
        textStyle: {
          color: getColor('gray-600'),
          fontSize: '12px',
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '75%'],
          center: window.innerWidth < 580 ? ['50%', '58%'] : ['50%', '58%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: getColor('gray-100'),
            borderWidth: 2
          },
  
          label: {
            alignTo: 'center',
            show: !isMobile,
            minMargin: 5,
            edgeDistance: 10,
            lineHeight: 15,
            rich: {
              time: {
                fontSize: 10,
                color: '#999',
              },
            },
          },
          data: [
            {
              value: ${data.allOk},
              name: 'All OK - ${data.allOk}',
              itemStyle: {
                color: getColor('success')
              }
            },
            {
              value: ${data.lowBattery},
              name: 'Low Battery - ${data.lowBattery}',
              itemStyle: {
                color: getColor('danger')
              }
            },
            {
              value: ${data.outOfRange},
              name: 'Drifted - ${data.outOfRange}',
              itemStyle: {
                color: getColor('warning')
              }
            },
            {
              value: ${data.lightNotOk},
              name: 'Unlit - ${data.lightNotOk}',
              itemStyle: {
                color: getColor('dark')
              }
            },
            {
              value: ${data.noData},
              name: 'No Data - ${data.noData}',
              itemStyle: {
                color: getColor('gray')
              }
            }
          ]
        },
        // Add a custom label in the center
      {
        type: 'pie',
        radius: ['0%', '30%'],
        center: window.innerWidth < 580 ? ['50%', '58%'] : ['50%', '58%'],
        itemStyle: {
          color: 'transparent',
          borderColor: 'transparent',
        },
        label: {
          show: true,
          position: 'center',
          formatter: '22', // The value you want to display
          fontSize: 24, // Adjust the font size as needed
          fontWeight: 'bold', // Add other styling as needed
        },
        data: [{ value: 22 }],
      }
      ],
      tooltip: {
        trigger: 'item',
        padding: [10, 10],
        backgroundColor: getColor('gray-100'),
        borderColor: getColor('gray-300'),
        textStyle: { color: getColor('dark') },
        borderWidth: 1,
        transitionDuration: 0,
        axisPointer: {
          type: 'none'
        },
        formatter: function(params) {
          // Use the name of the data item as the content of the tooltip
          return params.name;
        }
      }
      });
  
      //------- Responsive on window resize -------
      
      const updateDimensions = () => {
        if (window.innerWidth < 530) {
          chartRef.current.getEchartsInstance().setOption({
            series: [
              {
                center: ['65%', '55%']
              }
            ]
          });
        } 
        else
          chartRef.current.getEchartsInstance().setOption({
            series: [
              {
                center: ['50%', '55%']
              }
            ]
          });
      }
    
      // useEffect(() => {
      //   window.addEventListener('resize', updateDimensions);
      //   return () => window.removeEventListener('resize', updateDimensions);
      // }, []);
  
      return (
        <ReactEChartsCore
          echarts={echarts}
          option={getOption()}
          ref={chartRef}
          style={{ height: '25rem' }}
        />
      );
    }
  `;
  return (
    <div>
      <FalconComponentCard dir="ltr" className="h-10">
        <FalconComponentCard.Header
          title="Total Buoys Status - 22"
          light={false}
          // className="pt-4"
        />
        <FalconComponentCard.Body
          className="pb-0"
          code={chartCode}
          language="jsx"
          scope={{
            ReactEChartsCore,
            echarts,
            getColor
          }}
        />
      </FalconComponentCard>
    </div>
  );
};

export default DoughnutRoundedChart;
