import { Collapse, Table, Divider, Button } from 'antd';
import React, { useState } from 'react';
import ViewOption from './ViewOption';
import ViewPersonal from './ViewPersonal';
import { CaretRightOutlined } from '@ant-design/icons';

const data = [
    {name: 'Võ Văn Hướng', personalId: '187925748', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020302", religion: "Không"},
    {name: 'Võ Văn Hậu', personalId: '187925747', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020301", religion: "Không", },
    {name: 'Võ Văn Hướng', personalId: '187925746', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020300", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925745', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020299", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925744', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020298", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925743', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020297", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925742', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020296", religion: "Không", },
    {name: 'Võ Văn Hướng', personalId: '187925741', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020295", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925740', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020294", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925739', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020293", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925738', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020292", religion: "Không"},
    {name: 'Võ Văn Hướng', personalId: '187925737', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020291", religion: "Không"}
]


const ViewPopulation = () => {
    const [filterData, setFilterData] = useState([...data]);

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: "name",
            className: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        }, {
            title: 'Số CCCD/CMND',
            dataIndex: "personalId",
            align: 'center',
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
        }, {
            title: 'Mã thường trú',
            dataIndex: "addressCode",
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
            render: (text) => <ViewPersonal />
        },
    ];

    return (
        <div className="view-population">
            <h2>DANH SÁCH THÔNG TIN DÂN SỐ</h2>
            <div className="view-table-option-wrap">
                <ViewOption filterData={filterData}/>
                <Divider />
                <Table
                    className="view-population-table"
                    columns={columns} 
                    dataSource={data}
                    rowKey="personalId"
                    onChange={(a, b, c, extra) => { setFilterData(extra.currentDataSource) }} 
                />
                <Collapse 
                    className="view-population-collapse"
                    accordion
                    expandIcon={({ isActive }) => <CaretRightOutlined style={{color: '#06e9ed'}} rotate={isActive ? 90 : 0} />}
                >
                    {data.map((item, ind) => 
                        <Collapse.Panel 
                            style={{textAlign: 'left'}} 
                            header={`${item.name} - ${item.personalId}`} 
                            key={ind}
                        >
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Họ Tên: ${item.name}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Số CCCD/CMND: ${item.personalId}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Giới Tính: ${item.gender}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Ngày Sinh: ${item.dateOfBirth}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Mã Thường Trú: ${item.addressCode}`}</p>
                            <p style={{fontWeight: '500', marginBottom: '16px'}}>{`Tôn giáo: ${item.religion}`}</p>
                            <ViewPersonal />
                        </Collapse.Panel>
                    )}
                </Collapse>
                
            </div>
        </div>
    )
}

export default ViewPopulation;
