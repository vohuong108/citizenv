import { Button, Table, Select, Row, Col, Divider } from 'antd';
import React from 'react';
import ViewOption from './ViewOption';


const data = [
    {name: 'Võ Văn Hướng', personalId: '187925748', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020302", career: "Sinh Viên"},
    {name: 'Võ Văn Hậu', personalId: '187925747', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020301", career: "Sinh Viên", },
    {name: 'Võ Văn Hướng', personalId: '187925746', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020300", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925745', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020299", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925744', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020298", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925743', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020297", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925742', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020296", career: "Sinh Viên", },
    {name: 'Võ Văn Hướng', personalId: '187925741', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020295", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925740', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020294", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925739', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020293", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925738', gender: 'Nữ', dateOfBirth: "10/08/2001", addressCode: "01020292", career: "Sinh Viên"},
    {name: 'Võ Văn Hướng', personalId: '187925737', gender: 'Nam', dateOfBirth: "10/08/2001", addressCode: "01020291", career: "Sinh Viên"}
]


const ViewPopulation = () => {

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
            title: 'Nghề nghiệp',
            dataIndex: "career",
            className: "career",
            align: 'center',
        }, {
            title: 'Hành động',
            align: 'center',
            render: (text) => <Button>Xem thông tin</Button>
        },
    ];

    return (
        <div className="view-population">
            <h2>Danh sách dân số</h2>
            <div className="view-table-option-wrap">
                <ViewOption />
                <Divider />
                <Table
                    columns={columns} 
                    dataSource={data}
                    rowKey="personalId"
                />
            </div>
        </div>
    )
}

export default ViewPopulation;
