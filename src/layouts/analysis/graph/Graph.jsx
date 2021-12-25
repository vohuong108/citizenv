import { Col, Row } from 'antd'
import React from 'react'
import BarChart from './BarChart'
import DonutChart from './DonutChart'
import GroupBar from './GroupBar'
import HeatmapChart from './HeatmapChart'
import PieChart from './PieChart'

const ages = ["LEVEL1", "LEVEL2", "LEVEL3", "LEVEL4", "LEVEL5", "LEVEL6", "LEVEL7", "LEVEL8"];

const educationLevels = [
    "0/12", "1/12", "2/12", "3/12", "4/12", "5/12", "6/12", "7/12", "8/12", "9/12", 
    "10/12", "11/12", "12/12", "Trung cấp", "Cao đẳng", "Đại học", "Sau đại học"
]


const Graph = ({ data }) => {

    let handleGender = (data) => {
        if(data) {
            return [
                {gender: 'Nam', value: data.maleNumber}, 
                {gender: 'Nữ', value: data.femaleNumber}
            ]
        } else return [];
    }

    let handleGroupAge = (data) => {
        if(data) {
            return data?.ageGenders?.map(item => {
                if(item.ageLevel === "LEVEL1") return {type: 'Từ 0-5 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL2") return {type: 'Từ 6-10 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL3") return {type: 'Từ 11-14 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL4") return {type: 'Từ 15-17 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL5") return {type: 'Từ 18-21 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL6") return {type: 'Từ 22-30 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL7") return {type: 'Từ 31-60 tuổi', value: item.male + item.female}
                else if (item.ageLevel === "LEVEL8") return {type: 'Trên 60 tuổi', value: item.male + item.female}
            })
        } else return [];
    }

    let handleAgeByGender = (data) => {
        if(data) {
            return data?.ageGenders?.flatMap(item => {
                if(item.ageLevel === "LEVEL1") return [
                    {age: 'Từ 0-5 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 0-5 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL2") return [
                    {age: 'Từ 6-10 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 6-10 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL3") return [
                    {age: 'Từ 11-14 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 11-14 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL4") return [
                    {age: 'Từ 15-17 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 15-17 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL5") return [
                    {age: 'Từ 18-21 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 18-21 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL6") return [
                    {age: 'Từ 22-30 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 22-30 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL7") return [
                    {age: 'Từ 31-60 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Từ 31-60 tuổi', gender: 'Nữ', value: item.female}
                ]
                else if (item.ageLevel === "LEVEL8") return [
                    {age: 'Trên 60 tuổi', gender: 'Nam', value: item.male},
                    {age: 'Trên 60 tuổi', gender: 'Nữ', value: item.female}
                ]
            })
        } else return [];
    }

    let handleEducationLevel = (data) => {
        if(data?.educationMap) {
            return Object.keys(data?.educationMap).map((key) => ({type: key, value: data?.educationMap[key]}));
        } else return [];
    }

    let handleCorrelation = (data) => {
        if(data?.educationAge) {
            let pattern = {};

            for(let i=0; i < ages.length; i+=1) {
                for(let j=0; j < educationLevels.length; j+=1) {
                    let key = `AgeEducation(ageLevel=${ages[i]}, education=${educationLevels[j]})`;

                    pattern[key] = 0;
                }
            }

            let mergePattern = {...pattern, ...data?.educationAge};

            let result = Object.keys(mergePattern).map((key) => {
                // AgeEducation(ageLevel=LEVEL1, education=12/12)
                let ag = key.slice(22, 22+6);
                let ed = key.slice(40,-1);

                if(ag === "LEVEL1") return {age: 'Từ 0-5 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL2") return {age: 'Từ 6-10 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL3") return {age: 'Từ 11-14 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL4") return {age: 'Từ 15-17 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL5") return {age: 'Từ 18-21 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL6") return {age: 'Từ 22-30 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL7") return {age: 'Từ 31-60 tuổi', education: ed, value: mergePattern[key]}
                else if(ag === "LEVEL8") return {age: 'Trên 60 tuổi', education: ed, value: mergePattern[key]}
            });

            return result;
        } else return [];
    }
    return (
        <div className="graph">
            <Row gutter={[{ xs: 21, sm: 16, md: 24, xl: 24 }, { xs: 21, sm: 16, md: 24, xl: 24 }]}>
                <Col xs={24} xl={14}>
                    <div className="analysis-wrap graph-wrap">
                        <BarChart data={data?.locationInfos}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} xl={5}>
                    <div className="analysis-wrap graph-wrap">
                        <PieChart data={handleGender(data)}/>
                    </div>
                </Col>
                <Col xs={24} sm={12} xl={5}>
                    <div className="analysis-wrap graph-wrap">
                        <DonutChart 
                            titleGraph="Tỷ lệ nhóm tuổi dân số"
                            data={handleGroupAge(data)}
                        />
                    </div>
                </Col>
                <Col xs={24} sm={14} xl={7}>
                    <div className="analysis-wrap graph-wrap">
                        <GroupBar data={handleAgeByGender(data)}/>
                    </div>
                </Col>
                <Col xs={24} sm={10} xl={6}>
                    <div className="analysis-wrap graph-wrap">
                        <DonutChart 
                            titleGraph="Tỷ lệ trình độ dân số"
                            data={handleEducationLevel(data)}
                            flipPage
                            layout="horizontal"
                            maxRow={4}
                        />
                    </div>
                </Col>
                <Col xs={24} xl={11}>
                    <div className="analysis-wrap graph-wrap">
                        <HeatmapChart data={handleCorrelation(data)}/>
                    </div>
                </Col>
            </Row>
            
        </div>
    )
}

export default Graph
