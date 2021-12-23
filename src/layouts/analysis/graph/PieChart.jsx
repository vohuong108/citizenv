import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const PieChart = () => {
  const data = [
    {
      gender: 'nam',
      value: 50,
    },
    {
      gender: 'nữ',
      value: 40,
    },
  ];
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
    interactions: [
      {
        type: 'element-active',
      },
    ],
    legend: {
      position: 'top',
      offsetX: 0,
    }
  };
  return <Pie {...config} />;
};

export default PieChart;