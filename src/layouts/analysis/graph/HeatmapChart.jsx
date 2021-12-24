import React from 'react';
import { Heatmap } from '@ant-design/charts';

const HeatmapChart = ({ data = [] }) => {
    const config = {
        data,
        xField: 'age',
        yField: 'education',
        colorField: 'value',
        shape: 'circle',
        sizeRatio: 0.8,
    };

    return <Heatmap {...config} />;
};

export default HeatmapChart;
