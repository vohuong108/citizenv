import { Collapse, Table, Divider } from 'antd';
import React, { useState, useEffect } from 'react';
import ViewOption from './ViewOption';
import ViewPersonal from './ViewPersonal';
import { CaretRightOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../../utils/localStorageHandler';
import { getListPopulation } from '../../features/manager/population/populationAction';
import qs from 'query-string';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { unwrapResult } from '@reduxjs/toolkit';


const ViewPopulation = () => {
    const [filterData, setFilterData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const data = useSelector(state => state.population.listPopulation);
    const totalPage = useSelector(state => state.population.totalPage);
    const dispatch = useDispatch();
    let location = useLocation();
    let navigate = useNavigate();

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: "name",
            className: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        }, {
            title: 'Số CCCD/CMND',
            dataIndex: "citizenId",
            align: 'center',
            render: (text) => text ? <>{text}</> : <>Không</>
        }, {
            title: 'Giới tính',
            dataIndex: "gender",
            className: "gender",
            align: 'center',
            filters: [
                { text: 'Nam', value: 'nam'},
                { text: 'Nữ', value: 'nữ'}
            ],
            onFilter: (value, record) => record.gender.toLowerCase() === value,
        }, {
            title: 'Ngày sinh',
            dataIndex: "dateOfBirth",
            align: 'center',
            render: (text) => moment(text, 'YYYY/MM/DD').format("DD/MM/YYYY")
        }, {
            title: 'Mã thường trú',
            dataIndex: "regularyCode",
            align: 'center',
            sorter: (a, b) => parseInt(a.addressCode) - parseInt(b.addressCode),
        }, {
            title: 'Tôn giáo',
            dataIndex: "religion",
            className: "religion",
            align: 'center',
        }, {
            title: 'Hành động',
            align: 'center',
            dataIndex: "peopleId",
            render: (id) => <ViewPersonal id={id} />
        },
    ];

    const handleTableChange = (pagination, b, c, d) => {
        console.log("pagination: ", pagination);
        let params = {
            size: pagination.pageSize,
            page: pagination.current
        }
        
        navigate(`/dashboard/population?${qs.stringify(params)}`);
    };

    useEffect(() => {
        let getData = async (params) => {
            let un_response = await dispatch(getListPopulation({
                access_token: getToken(), 
                params: params
            }));
            console.log("response list population: ", unwrapResult(un_response));
        }
        
        console.log("location view: ", location);

        if(!location.search) {
            let params = {
                size: 100,
                page: 1
            }
            navigate(`/dashboard/population?${qs.stringify(params)}`, { replace: true });
            console.log("match in null")
        } else {
            let params = qs.parse(location.search)
            setCurrentPage(parseInt(params.page));
            getData(params);
            console.log("match in not null")
        }

    }, [location.search])
    // setFilterData(extra.currentDataSource)
    return (
        <div className="view-population">
            <h2>DANH SÁCH THÔNG TIN DÂN SỐ</h2>
            <div className="view-table-option-wrap">
                <ViewOption pathTarget="/dashboard/population?"/>
                <Divider />
                <Table
                    className="view-population-table"
                    columns={columns} 
                    dataSource={data}
                    rowKey="peopleId"
                    onChange={(a, b, c, extra) => handleTableChange(a, b, c, extra)}
                    pagination={{
                        total: totalPage*100,
                        defaultPageSize: 100,
                        // defaultCurrent: 1,
                        current: currentPage
                    }}
                />
                <Collapse 
                    className="view-population-collapse"
                    accordion
                    expandIcon={({ isActive }) => <CaretRightOutlined style={{color: '#06e9ed'}} rotate={isActive ? 90 : 0} />}
                >
                    {data?.map((item, ind) => 
                        <Collapse.Panel 
                            style={{textAlign: 'left'}} 
                            header={`${item.name}${item.citizenId && ` - ${item.citizenId}`}`} 
                            key={ind}
                        >
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Họ Tên: ${item.name}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Số CCCD/CMND: ${item.citizenId}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Giới Tính: ${item.gender}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Ngày Sinh: ${moment(item.dateOfBirth, 'YYYY/MM/DD').format("DD/MM/YYYY")}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Mã Thường Trú: ${item.regularyCode}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '16px'}}>{`Tôn giáo: ${item.religion}`}</p>
                            <ViewPersonal key={ind} id={item.peopleId}/>
                        </Collapse.Panel>
                    )}
                </Collapse>
                
            </div>
        </div>
    )
}

export default ViewPopulation;
