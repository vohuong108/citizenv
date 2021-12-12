import React, { useState } from 'react';
import { Row, Col, Select, } from 'antd';

import { ReactComponent as ArrowDown } from '../../assets/icons/arrow-down.svg';

const provinces = [
    {value: 'Hà Nội'}, {value: 'Hải Phòng'}, {value:'Hồ Chí Minh'}, 
    {value: 'Ninh Bình'}, {value: 'Thanh Hóa'}, {value:'Nghệ An'},
    {value: 'Hà Tĩnh'}, {value: 'Quảng Bình'}, {value:'Quảng Trị'},
]
const districts = [
    {value: 'Thanh Xuân'}, {value: 'Ba Đình'}, {value:'Hoàn Kiếm'}, 
    {value: 'Hà Đông'}, {value: 'Đống Đa'}, {value:'Cầu Giấy'},
    {value: 'Quốc Oai'}, {value: 'Gia Lâm'}, {value:'Thanh Trì'},
]
const wards = [
    {value: 'Hà Nội'}, {value: 'Hải Phòng'}, {value:'Hồ Chí Minh'}, 
    {value: 'Ninh Bình'}, {value: 'Thanh Hóa'}, {value:'Nghệ An'},
    {value: 'Hà Tĩnh'}, {value: 'Quảng Bình'}, {value:'Quảng Trị'},
]
const hamlets = [
    {value: 'Hà Nội'}, {value: 'Hải Phòng'}, {value:'Hồ Chí Minh'}, 
    {value: 'Ninh Bình'}, {value: 'Thanh Hóa'}, {value:'Nghệ An'},
    {value: 'Hà Tĩnh'}, {value: 'Quảng Bình'}, {value:'Quảng Trị'},
]

const ViewOption = () => {
    const [level, setLevel] = useState();
    const [province, setProvince] = useState([]);
    const [district, setDistrict] = useState();
    const [ward, setWard] = useState();
    const [hamlet, setHamlet] = useState();

    return (
        <div className="view-option">
            <Row 
                className="view-option-row level-row" 
                style={{ alignItems: 'center', marginBottom: '20px'}}
                gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]}
            >
                <Col className="level-col level-col-select" >
                    <label className="level-label">Mức độ hiển thị</label>
                    <Select style={{ width: 130 }} defaultValue="country" onChange={(value) => setLevel(value)}>
                        <Select.Option value="country">Toàn quốc</Select.Option>
                        <Select.Option value="province" >Tỉnh/thành</Select.Option>
                        <Select.Option value="district" >Huyện/quận</Select.Option>
                        <Select.Option value="ward">Xã/phường</Select.Option>
                        <Select.Option value="hamlet">Thôn/bản</Select.Option>
                    </Select>
                </Col>
                <Col className="level-col btn-col" ><button className="btn-search">Tìm Kiếm</button></Col>
            </Row>
            {(level && level !== 'country') && 
            <Row className="view-option-row option-row" gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]}>
                {(level === 'province' || level === 'district' || level === 'ward' || level === 'hamlet') &&
                <Col xs={24} sm={12} className="opt-col">
                    <label className="opt-label">Tỉnh/Thành</label>
                    <Select 
                        mode='multiple'
                        value={province}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => setProvince([...value])}
                        options={provinces}
                    />
                </Col>}
                
                {(level === 'district' || level === 'ward' || level === 'hamlet') &&
                <Col xs={24} sm={12} className="opt-col">
                    <label className="opt-label">Huyện/Quận</label>
                    <Select 
                        mode='multiple'
                        value={district}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => setDistrict([...value])}
                        options={districts}
                    />
                </Col>}
                
                {(level === 'ward' || level === 'hamlet') &&
                <Col xs={24} sm={12} className="opt-col">
                    <label className="opt-label">Xã/Phường</label>
                    <Select 
                        mode='multiple'
                        value={ward}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => setWard([...value])}
                        options={wards}
                    />
                </Col>}
                
                {(level === 'hamlet') && 
                <Col xs={24} sm={12} className="opt-col">
                    <label className="opt-label">Thôn/Bản</label>
                    <Select 
                        mode='multiple'
                        value={hamlet}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => setHamlet([...value])}
                        options={hamlets}
                    />
                </Col>}
            </Row>}
            <Row className="btn-row-xs">
                <Col span={24}><button className="btn-search">Tìm Kiếm</button></Col>
            </Row>
        </div>
    )
}

export default ViewOption
