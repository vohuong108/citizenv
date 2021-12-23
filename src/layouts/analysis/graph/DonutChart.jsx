import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';

const DonutChart = ({ titleGraph }) => {
  const data = [
    {
      type: 'Từ 0-5 tuổi',
      value: 27,
    },
    {
      type: 'Từ 6-10 tuổi',
      value: 25,
    },
    {
      type: 'Từ 11-14 tuổi',
      value: 18,
    },
    {
      type: 'Từ 15-17 tuổi',
      value: 15,
    },
    {
      type: 'Từ 18-21 tuổi',
      value: 10,
    },
    {
      type: 'Từ 22-30 tuổi',
      value: 30,
    },
    {
        type: 'Từ 31-60 tuổi',
        value: 30,
    },
    {
        type: 'trên 60 tuổi',
        value: 30,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.7,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}%',
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
          fontSize: 18,
        },
        content: titleGraph,
      },
    },
    meta: {
        value: {
            formatter: (v) => `${v}%`,
        },
    },
    legend: {
        position: 'bottom',
        offsetX: 8,
    }
  };
  return <Pie {...config} />;
};

export default DonutChart;