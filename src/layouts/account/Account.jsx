import React, { useState, useRef, useEffect } from 'react';
import EditAccount from './edit/EditAccount';
import { Table, Tag, Row, Col, Input, Space, Button } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Printer, { print } from 'react-pdf-print'


//import icon and images
import  { ReactComponent as SearchIcon } from '../../assets/icons/search-solid.svg';
import { EditOutlined } from '@ant-design/icons';
import ExportData from '../../components/export/ExportData';

const data = [
    {name: 'Hà Nội', username: '01', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Hồ Chí Minh', username: '02', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "InActive"},
    {name: 'Đà Nẵng', username: '03', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Huế', username: '04', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Ninh Bình', username: '05', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Lào Cai', username: '06', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Khánh Hòa', username: '07', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "InActive"},
    {name: 'Ninh Thuận', username: '08', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Lâm Đồng', username: '09', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Quảng Bình', username: '10', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Quảng Trị', username: '11', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"},
    {name: 'Thanh Hóa', username: '12', level: "Tỉnh", startTime: "09/12/2021", endTime: "19/12/2021", state: "Active"}
]

const Account = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [filterData, setFilterData] = useState([]);

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectedRowKeys([...selectedRows]);
    };

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        console.log("onHandleSearch: ", selectedKeys);
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div style={{ padding: 8 }}>
            <Input.Search
              ref={searchInput}
              placeholder="Tìm kiếm"
              value={selectedKeys[0]}
              onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              onSearch={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{ marginBottom: 8, display: 'block' }}
            />
          </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) =>
          record[dataIndex]
            ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
            : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput?.current?.focus(), 100);
            }
        },
        render: text =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    

    const columns = [
        {
            title: 'Tên đơn vị',
            dataIndex: "name",
            ...getColumnSearchProps("name")
        }, {
            title: 'Mã đơn vị',
            dataIndex: "username",
            ...getColumnSearchProps("username")
        }, {
            title: 'Cấp bậc',
            dataIndex: "level",
            align: 'center',
        }, {
            title: 'Bắt đầu khai báo',
            dataIndex: "startTime",
            align: 'center',
        }, {
            title: 'Kết thúc khai báo',
            dataIndex: "endTime",
            align: 'center',
        }, {
            title: 'Trạng thái',
            dataIndex: "state",
            align: 'center',
            filters: [
                {
                  text: 'Active',
                  value: 'active',
                },
                {
                  text: 'InActive',
                  value: 'inactive',
                },
            ],
            onFilter: (value, record) => record.state.toLowerCase() === value,
            render: (state) => state === 'Active' ? <Tag color='cyan'>{state}</Tag> : <Tag color='#f50'>{state}</Tag>
        }, {
            title: 'Hành động',
            align: 'center',
            render: (text) => <EditAccount shape="default" icon={<EditOutlined />} />,
        }
    ];

    return (
        <div className="account">
            <h2>DANH SÁCH QUẢN LÝ TÀI KHOẢN</h2>
            <Row className="account-utils">
                <Col>
                    <EditAccount 
                        showChangePassword={false} 
                        title="Chỉnh sửa các đơn vị đã chọn"
                        shape="default"
                        className="edit-accounts"
                        disabled={selectedRowKeys.length <= 1}
                    />
                </Col>
                <Col >
                    <Link to="/register">
                        <button className="btn-create-account">Cấp tài khoản</button>
                    </Link>
                    <ExportData placement="bottomRight" data={filterData}/>
                </Col>
            </Row>
            <Printer>
            <Table
                rowSelection={{onChange: onSelectChange}} 
                columns={columns} 
                dataSource={data}
                rowKey="username"
                onChange={(a, b, c, extra) => { setFilterData(extra.currentDataSource) }} 
            />
            </Printer>
        </div>
    )
}

export default Account
