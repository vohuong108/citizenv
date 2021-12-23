import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Heatmap } from '@ant-design/charts';

const HeatmapChart = () => {
    let data = [
        {
            age: "từ 0-5 tuổi",
            education: "0/12",
            value: "12"
        }, {
            age: "từ 0-5 tuổi",
            education: "1/12",
            value: "20"
        }, {
            age: "từ 6-10 tuổi",
            education: "0/12",
            value: "5"
        }, {
            age: "từ 6-10 tuổi",
            education: "1/12",
            value: "30"
        }
      ]
    const config = {
        data,
        xField: 'age',
        yField: 'education',
        colorField: 'value',
        shape: 'circle',
        sizeRatio: 0.5,
        color: ['#0d5fbb', '#7eadfc', '#fd8b6f', '#aa3523'],
        label: {
        style: {
            fill: '#fff',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
        },
        },
    };

    return <Heatmap {...config} />;
};

export default HeatmapChart;
