import { Col, Row } from 'antd'
import React from 'react'
import BarChart from './BarChart'
import DonutChart from './DonutChart'
import GroupBar from './GroupBar'
import HeatmapChart from './HeatmapChart'
import PieChart from './PieChart'

const Graph = () => {
    return (
        <div className="graph">
            
            <Row gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]}>
                <Col span={16}>
                    <BarChart />
                </Col>
                <Col span={8}>
                    <PieChart />
                </Col>
                <Col span={8}>
                    <DonutChart titleGraph="Tỷ lệ nhóm tuổi dân số"/>
                </Col>
                <Col span={16}>
                    <GroupBar />
                </Col>
                <Col span={8}>
                    <DonutChart titleGraph="Tỷ lệ trình độ dân số"/>
                </Col>
                <Col span={16}>
                    <HeatmapChart />
                </Col>
            </Row>
            
        </div>
    )
}

export default Graph
