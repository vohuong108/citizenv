import React from 'react';
import { Pie } from '@ant-design/charts';

const PieChart = ({ data = [] }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'gender',
    radius: 0.7,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    meta: {
      value: {
          formatter: (v) => `${v} người`,
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'bottom',
      layout: 'horizontal',
      offsetX: 0,
    }
  };
  return <Pie {...config} />;
};

export default PieChart;