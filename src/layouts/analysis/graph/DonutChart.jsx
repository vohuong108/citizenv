import React from 'react';
import { Pie } from '@ant-design/charts';

const DonutChart = ({ titleGraph, data = [], flipPage = false, layout = "vertical", maxRow = null }) => {
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 14,
        },
        content: titleGraph,
      },
    },
    meta: {
        value: {
            formatter: (v) => `${v} người`,
        },
    },
    legend: {
        position: 'bottom',
        flipPage: flipPage,
        layout: layout,
        maxRow: maxRow
    }
  };
  return <Pie {...config} />;
};

export default DonutChart;