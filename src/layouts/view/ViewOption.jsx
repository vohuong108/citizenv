import React, { useState, useEffect } from 'react';
import { Row, Col, Select, } from 'antd';
import ExportData from '../../components/export/ExportData';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';
import { useSelector, useDispatch } from 'react-redux';
import userApi from '../../api/userApi';
import { getToken } from '../../utils/localStorageHandler';

const ViewOption = ({ filterData, pathTarget = "/dashboard/population?"}) => {
    const user = useSelector(state => state.user.userObj);
    let location = useLocation();
    let navigate = useNavigate();

    const [filter, setFilter] = useState({
        level: "all",
        address: "tất cả"
    });
    const [levelOptions, setLevelOptions] = useState([]);

    const [provinceData, setProvinceData] = useState([]);
    const [districtData, setDistrictData] = useState([]);
    const [wardData, setWardData] = useState([]);
    const [hamletData, setHamletData] = useState([]);

    const [selectedProvince, setSelectedProvince] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState([]);
    const [selectedWard, setSelectedWard] = useState([]);
    const [selectedHamlet, setSelectedHamlet] = useState([]);

    const handleSearch = () => {
        let params = {};

        if(filter?.level === "all") {
            params = {
                locationType: filter?.address === "tất cả" ? undefined : filter?.address
            }
        } else if(filter?.level === "province") {
            params = {
                locationIds: selectedProvince,
                locationType: filter?.address === "tất cả" ? undefined : filter?.address
            }
        } else if(filter?.level === "district") {
            params = {
                locationIds: selectedDistrict,
                locationType: filter?.address === "tất cả" ? undefined : filter?.address
            }
        } else if(filter?.level === "ward") {
            params = {
                locationIds: selectedWard,
                locationType: filter?.address === "tất cả" ? undefined : filter?.address
            }
        } else if(filter?.level === "hamlet") {
            params = {
                locationIds: selectedHamlet,
                locationType: filter?.address === "tất cả" ? undefined : filter?.address
            }
        }

        const currentQuery = qs.parse(location.search);
        if(filter?.level === "all") {
            navigate(`${pathTarget}${qs.stringify(params)}`);
        } else {
            let newParams = {
                ...currentQuery,
                ...params
            }
            console.log("current query: ", currentQuery);
            console.log("new query: ", qs.stringify(newParams));
            
            navigate(`${pathTarget}${qs.stringify(newParams)}`);
        }
    }

    let handleChangeOptionItem = async (value, type) => {
        console.log("change: ", value, type);
        if(type === "province") {
            setSelectedProvince([...value]);
            let params = {
                cityIds: value
            }
            await getDistrictData(params);
        } else if (type === "district") {
            setSelectedDistrict([...value]);
            let params = {
                districtIds: value
            }
            await getWardData(params);
        } else if (type === "ward") {
            setSelectedWard([...value]);
            let params = {
                wardIds: value
            }
            await getHamletData(params);
        } else if (type === 'hamlet') {
            setSelectedHamlet([...value]);
        }
    }

    let getProvinceData = async () => {
        let response = await userApi.getListProvinceVn({access_token: getToken()});
        setProvinceData([...response.map(item => ({label: item.cityName, value: item.cityId}))]);
    }

    let getDistrictData = async (params) => {
        if(!params) {
            let response = await userApi.getListDistrictByProvince({
                access_token: getToken(),
                cityId: user?.username
            });
            setDistrictData([...response.map(item => ({label: item.districtName, value: item.districtId}))]);
        } else {
            let response = await userApi.getListDistrictByManyProvince({
                access_token: getToken(),
                params: params
            });
            setDistrictData([...response.map(item => ({label: item.districtName, value: item.districtId}))]);
        }
    }

    let getWardData = async (params) => {
        if(!params) {
            let response = await userApi.getListWardByDistrict({
                access_token: getToken(),
                districtId: user?.username
            });
            setWardData([...response.map(item => ({label: item.wardName, value: item.wardId}))]);
        } else {
            let response = await userApi.getListWardByManyDistrict({
                access_token: getToken(),
                params: params
            });
            setWardData([...response.map(item => ({label: item.wardName, value: item.wardId}))]);
        }
    }

    let getHamletData = async (params) => {
        if(!params) {
            let response = await userApi.getListHamletByWard({
                access_token: getToken(),
                wardId: user?.username
            });
            setHamletData([...response.map(item => ({label: item.villageName, value: item.villageId}))]);
        } else {
            let response = await userApi.getListHamletByManyWard({
                access_token: getToken(),
                params: params
            });
            setHamletData([...response.map(item => ({label: item.villageName, value: item.villageId}))]);
        }
    }

    useEffect(() => {
        if(user?.userRole === 'ROLE_A1') {
            setLevelOptions([
                {value: "all", label: "Toàn quốc"}, 
                {value: "province", label: "Tỉnh/thành"},
                {value: "district", label: "Huyện/quận"},
                {value: "ward", label: "Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            getProvinceData();

        } else if(user?.userRole === 'ROLE_A2') {
            setLevelOptions([
                {value: "all", label: "Toàn Tỉnh/thành"},
                {value: "district", label: "Huyện/quận"},
                {value: "ward", label: "Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            getDistrictData();

        } else if(user?.userRole === 'ROLE_A3') {
            setLevelOptions([
                {value: "all", label: "Toàn Huyện/quận"},
                {value: "ward", label: "Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            getWardData();
        } else if(user?.userRole === 'ROLE_B1') {
            setLevelOptions([
                {value: "all", label: "Toàn Xã/phường"},
                {value: "hamlet", label: "Thôn/bản"},
            ]);
            getHamletData();
        }

    }, [user])

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
                        value={filter?.address}
                        defaultValue="tất cả" 
                        onChange={(value) => setFilter({...filter, address: value})}
                    >
                        <Select.Option value="tất cả">Tất cả</Select.Option>
                        <Select.Option value="quê quán" >Quê quán</Select.Option>
                        <Select.Option value="thường trú" >Thường trú</Select.Option>
                        <Select.Option value="tạm trú">Tạm trú</Select.Option>
                    </Select>
                </Col>
                <Col className="level-col btn-col" >
                    <button className="btn-search" onClick={() => handleSearch()}>Tìm Kiếm</button>
                </Col>
                {/* <Col className="level-col export-col">
                    <ExportData placement="bottomRight" data={filterData} type = "single"/>
                </Col> */}
            </Row>
            {(filter?.level && filter?.level !== 'all') && 
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
                        onChange={(value) => handleChangeOptionItem(value, "province")}
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
                        onChange={(value) => handleChangeOptionItem(value, "district")}
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
                        onChange={(value) => handleChangeOptionItem(value, "ward")}
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
                        onChange={(value) => handleChangeOptionItem(value, "hamlet")}
                        options={hamletData}
                    />
                </Col>}
            </Row>}
            <Row className="btn-row-xs" style={{alignItems: 'center'}}>
                {/* <Col span={12}><ExportData placement="bottomRight" data={filterData} type = "single"/></Col> */}
                <Col span={12}><button className="btn-search" onClick={() => handleSearch()}>Tìm Kiếm</button></Col>
            </Row>
        </div>
    )
}

export default ViewOption
