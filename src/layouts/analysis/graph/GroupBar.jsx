import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';

const GroupBar = () => {
  const data = [
    {
        gender: "Nam",
        age: "Từ 0-5 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "Từ 0-5 tuổi",
        value: 20.9
    }, {
        gender: "Nam",
        age: "Từ 6-10 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "Từ 6-10 tuổi",
        value: 20.9
    }, 
    {
        gender: "Nam",
        age: "Từ 11-14 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "Từ 11-14 tuổi",
        value: 20.9
    }, {
        gender: "Nam",
        age: "Từ 15-17 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "Từ 15-17 tuổi",
        value: 20.9
    }, {
        gender: "Nam",
        age: "Từ 18-21 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "Từ 18-21 tuổi",
        value: 20.9
    }, {
        gender: "Nam",
        age: "Từ 22-30 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "Từ 22-30 tuổi",
        value: 20.9
    }, {
        gender: "Nam",
        age: "trên 60 tuổi",
        value: 18.9
    }, {
        gender: "Nữ",
        age: "trên 60 tuổi",
        value: 20.9
    }, 
    
  ]
  const config = {
    data,
    isGroup: true,
    xField: 'age',
    yField: 'value',
    seriesField: 'gender',
    dodgePadding: 2,
    intervalPadding: 20,
  };

  return <Column {...config} />;
};

export default GroupBar;