import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';

const BarChart = () => {
  const data = [
    {
      locationName: 'thôn 1',
      residual: 38,
    },
    {
      locationName: 'thôn 2',
      residual: 52,
    },
    {
      locationName: 'thôn 3',
      residual: 61,
    },
    {
      locationName: 'thôn 4',
      residual: 145,
    },
    {
      locationName: 'thôn 5',
      residual: 48,
    },
    {
      locationName: 'thôn 6',
      residual: 38,
    },
    {
      locationName: 'thôn 7',
      residual: 38,
    },
    {
      locationName: 'thôn 8',
      residual: 38,
    },
    {
      locationName: 'thôn 9',
      residual: 38,
    },
    {
      locationName: 'thôn 10',
      residual: 52,
    },
    {
      locationName: 'thôn 11',
      residual: 61,
    },
    {
      locationName: 'thôn 12',
      residual: 145,
    },
    {
      locationName: 'thôn 13',
      residual: 48,
    },
    {
      locationName: 'thôn 14',
      residual: 38,
    },
    {
      locationName: 'thôn 15',
      residual: 38,
    },
    {
      locationName: 'thôn 16',
      residual: 38,
    },
  ];
  const config = {
    data,
    xField: 'locationName',
    yField: 'residual',
    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      locationName: {
        alias: 'Địa phương',
      },
      residual: {
        alias: 'Dân số',
      },
    },
  };
  return <Column {...config} />;
};

export default BarChart;