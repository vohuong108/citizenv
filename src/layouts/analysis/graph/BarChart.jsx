import React from 'react';
import { Column } from '@ant-design/charts';

const BarChart = ({ data = [] }) => {
  const config = {
    data,
    xField: 'locationName',
    yField: 'totalPeople',
    label: {
      position: 'middle',
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
      totalPeople: {
        alias: 'Dân số',
      },
    },
  };
  return <Column {...config} />;
};

export default BarChart;