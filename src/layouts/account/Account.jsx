import React, { useState } from 'react';
import EditAccount from './edit/EditAccount';
import { Table, Tag } from 'antd';

const columns = [
    {
        title: 'Tên đơn vị',
        dataIndex: "name"
    }, {
        title: 'Mã đơn vị',
        dataIndex: "username"
    }, {
        title: 'Cấp bậc',
        dataIndex: "level"
    }, {
        title: 'Bắt đầu khai báo',
        dataIndex: "startTime"
    }, {
        title: 'Kết thúc khai báo',
        dataIndex: "endTime"
    }, {
        title: 'Trạng thái',
        dataIndex: "state",
        render: (state) => state === 'Active' ? <Tag color='cyan'>{state}</Tag> : <Tag color='#f50'>{state}</Tag>
    }, {
        title: 'Chỉnh sửa',
        render: (text) => <EditAccount />,
    }
];

const data = [
    {name: 'Hà Nội', username: '01', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '02', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "InActive"},
    {name: 'Hà Nội', username: '03', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '04', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '05', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '06', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '07', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "InActive"},
    {name: 'Hà Nội', username: '08', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '09', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '10', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '11', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hà Nội', username: '12', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"}
]

const Account = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    };

    return (
        <div className="account">
            <Table 
                rowSelection={{onChange: onSelectChange}} 
                columns={columns} 
                dataSource={data}
                rowKey="username"
            />
        </div>
    )
}

export default Account
