import React, { useState, useEffect } from 'react';
import { Row, Col, Select, } from 'antd';
import ExportData from '../../components/export/ExportData';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

const ViewOption = ({ filterData }) => {
    const [filter, setFilter] = useState({});
    const [levelOptions, setLevelOptions] = useState([]);

    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [hamletData, setHamletData] = useState([]);


    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [selectedWard, setSelectedWard] = useState([]);
    const [selectedHamlet, setSelectedHamlet] = useState([]);
    
    let location = useLocation();
    let navigate = useNavigate();

    const handleSearch = () => {
        const currentQuery = qs.parse(location.search);
        console.log("path query: ", currentQuery);
        
        let params = {
            ...filter,
            'p': selectedProvince,
            'd': selectedDistrict,
            'w': selectedWard,
            'h': selectedHamlet
        }

        console.log("new query: ", qs.stringify(params));
        
        navigate(`/dashboard/population?${qs.stringify(params)}`);
    }

    let user  = {
        role: "A1"
    }

    let handleChangeOption = (value, type) => {
        if(type === "province") {
            //TODO: Get list district
            setSelectedProvince([...value]);
            let temp = [
                {value: 'Thanh Xuân'}, {value: 'Ba Đình'}, {value:'Hoàn Kiếm'}, 
                {value: 'Hà Đông'}, {value: 'Đống Đa'}, {value:'Cầu Giấy'},
                {value: 'Quốc Oai'}, {value: 'Gia Lâm'}, {value:'Thanh Trì'},
            ];
            setDistrictData([...temp]);
        } else if (type === "district") {
            setSelectedDistrict([...value]);
            let temp = [
                {value: 'Nhân Chính'}, {value: 'Nhân Hòa'}, {value:'Thanh Xuân Bắc'}, {value: 'Thanh Xuân Nam'}
            ]
            setWardData([...temp]);
        } else if (type === "ward") {
            setSelectedWard([...value]);
            let temp = [
                {value: 'Tổ 1'}, {value: 'Tổ 2'}, {value:'Tổ 3'}, {value: 'Tổ 4'}
            ]
            setHamletData([...temp]);
        } else if (type === 'hamlet') {
            setSelectedHamlet([...value]);
        }
    }

    useEffect(() => {
        if(user?.role === 'A1') {
            setLevelOptions([
                {value: "country", label: "Toàn quốc"}, 
                {value: "province", label: "Tỉnh/thành"},
                {value: "district", label: "Huyện/quận"},
                {value: "ward", label: "Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            setFilter({
                level: "country",
                address: "all"
            });

            let temp = [
                {value: 'Hà Nội'}, {value: 'Hải Phòng'}, {value:'Hồ Chí Minh'}, 
                {value: 'Ninh Bình'}, {value: 'Thanh Hóa'}, {value:'Nghệ An'},
                {value: 'Hà Tĩnh'}, {value: 'Quảng Bình'}, {value:'Quảng Trị'},
            ];

            setProvinceData([...temp]);

        } else if(user?.role === 'A2') {
            setLevelOptions([
                {value: "all", label: "Toàn Tỉnh/thành"},
                {value: "district", label: "Huyện/quận"},
                {value: "ward", label: "Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            setFilter({
                level: "all",
                address: "all"
            });

            let temp = [
                {value: 'Thanh Xuân'}, {value: 'Ba Đình'}, {value:'Hoàn Kiếm'}, 
                {value: 'Hà Đông'}, {value: 'Đống Đa'}, {value:'Cầu Giấy'},
                {value: 'Quốc Oai'}, {value: 'Gia Lâm'}, {value:'Thanh Trì'},
            ];

            setDistrictData([...temp]);
        } else if(user?.role === 'A3') {
            setLevelOptions([
                {value: "all", label: "Toàn Huyện/quận"},
                {value: "ward", label: "Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            setFilter({
                level: "all",
                address: "all"
            });

            let temp = [
                {value: 'Nhân Chính'}, {value: 'Nhân Hòa'}, {value:'Thanh Xuân Bắc'}, {value: 'Thanh Xuân Nam'}
            ]

            setWardData([...temp]);
        } else if(user?.role === 'B1') {
            setLevelOptions([
                {value: "all", label: "Toàn Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            setFilter({
                level: "all",
                address: "all"
            });

            let temp = [
                {value: 'Tổ 1'}, {value: 'Tổ 2'}, {value:'Tổ 3'}, {value: 'Tổ 4'}
            ]

            setHamletData([...temp]);
        }
    }, [])

    return (
        <div className="view-option">
            <Row 
                className="view-option-row level-row" 
                style={{ alignItems: 'center', marginBottom: '20px'}}
                gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]}
            >
                <Col className="level-col level-col-select" >
                    <label className="level-label">Mức độ hiển thị</label>
                    <Select 
                        style={{ width: 130 }} 
                        value={filter?.level} 
                        onChange={(value) => setFilter({...filter, level: value})}
                        options={levelOptions}
                    />
                </Col>
                <Col className="level-col level-col-select" >
                    <label className="level-label">Loại đối tượng</label>
                    <Select 
                        style={{ width: 130 }} 
                        defaultValue="all" 
                        onChange={(value) => setFilter({...filter, address: value})}
                    >
                        <Select.Option value="all">Tất cả</Select.Option>
                        <Select.Option value="nativeland" >Quê quán</Select.Option>
                        <Select.Option value="regulary" >Thường trú</Select.Option>
                        <Select.Option value="temporary">Tạm trú</Select.Option>
                    </Select>
                </Col>
                <Col className="level-col btn-col" >
                    <button className="btn-search" onClick={() => handleSearch()}>Tìm Kiếm</button>
                </Col>
                <Col className="level-col export-col">
                    <ExportData placement="bottomRight" data={filterData} type = "single"/>
                </Col>
            </Row>
            {(filter?.level && filter?.level !== 'country') && 
            <Row className="view-option-row option-row" gutter={[{ xs: 21, sm: 16, md: 24, xl: 30 }, { xs: 21, sm: 16, md: 24, xl: 30 }]}>
                {(levelOptions.length === 5 && 
                (filter?.level === 'province' || 
                filter?.level === 'district' || 
                filter?.level === 'ward' || 
                filter?.level === 'hamlet')) &&
                <Col xs={24} md={12} className="opt-col">
                    <label className="opt-label">Tỉnh/Thành</label>
                    <Select 
                        mode='multiple'
                        value={selectedProvince}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => handleChangeOption(value, "province")}
                        options={provinceData}
                    />
                </Col>}
                
                {(levelOptions.length >= 4 && 
                (filter?.level === 'district' || 
                filter?.level === 'ward' || 
                filter?.level === 'hamlet')) &&
                <Col xs={24} md={12} className="opt-col">
                    <label className="opt-label">Huyện/Quận</label>
                    <Select 
                        mode='multiple'
                        value={selectedDistrict}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => handleChangeOption(value, "district")}
                        options={districtData}
                    />
                </Col>}
                
                {(levelOptions.length >= 3 && 
                (filter?.level === 'ward' || 
                filter?.level === 'hamlet')) &&
                <Col xs={24} md={12} className="opt-col">
                    <label className="opt-label">Xã/Phường</label>
                    <Select 
                        mode='multiple'
                        value={selectedWard}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => handleChangeOption(value, "ward")}
                        options={wardData}
                    />
                </Col>}
                
                {(levelOptions.length >= 2 && filter?.level === 'hamlet') && 
                <Col xs={24} md={12} className="opt-col">
                    <label className="opt-label">Thôn/Bản</label>
                    <Select 
                        mode='multiple'
                        value={selectedHamlet}
                        maxTagCount='responsive'
                        style={{flex: 1, maxWidth: '500px'}}
                        onChange={(value) => handleChangeOption(value, "hamlet")}
                        options={hamletData}
                    />
                </Col>}
            </Row>}
            <Row className="btn-row-xs" style={{alignItems: 'center'}}>
                <Col span={12}><ExportData placement="bottomRight" data={filterData} type = "single"/></Col>
                <Col span={12}><button className="btn-search" onClick={() => handleSearch()}>Tìm Kiếm</button></Col>
            </Row>
        </div>
    )
}

export default ViewOption
