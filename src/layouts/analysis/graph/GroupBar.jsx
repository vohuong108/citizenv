import React from 'react';
import { Column } from '@ant-design/charts';

const GroupBar = ({ data = []}) => {
  const config = {
    data,
    isGroup: true,
    isPercent: true,
    xField: 'age',
    yField: 'value',
    seriesField: 'gender',
    dodgePadding: 2,
    intervalPadding: 10,
  };

  return <Column {...config} />;
};

export default GroupBar;