import React, { useState, useRef, useEffect } from 'react';
import EditAccount from './edit/EditAccount';
import { Table, Tag, Row, Col, Input, Collapse } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { getToken } from '../../utils/localStorageHandler';
import { useSelector, useDispatch } from 'react-redux';
import { getListAccount } from '../../features/manager/account/accountAction';
import moment from 'moment';
import { unwrapResult } from '@reduxjs/toolkit';


//import icon and images
import { EditOutlined } from '@ant-design/icons';
import ExportData from '../../components/export/ExportData';

const Account = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [filterData, setFilterData] = useState([]);
    const accountData = useSelector(state => state.account.listAccount);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);

    const onSelectChange = (selectedRowKeys, selectedRows) => {
        console.log(`convert: `, selectedRowKeys);
        setSelectedRowKeys([...selectedRowKeys]);
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

    let handleAccountLevel = () => {
        if(user?.userRole == 'ROLE_ADMIN') {
            return <>Bộ Y Tế</>
        } else if(user?.userRole === "ROLE_A1") {
            return <>Tỉnh/Thành</>
        } else if(user?.userRole === "ROLE_A2") {
            return <>Quận/Huyện</>
        } else if(user?.userRole === "ROLE_A3") {
            return <>Xã/Phường</>
        } else if(user?.userRole === "ROLE_B1") {
            return <>Thôn/Bản</>
        }
    }

    const columns = [
        {
            title: 'Tên đơn vị',
            dataIndex: "location",
            className: "location",
            ...getColumnSearchProps("location"),
            render: (text) => text ? <>{text}</> : "Tổng Cục Dân Số"
        }, {
            title: 'Mã đơn vị',
            dataIndex: "username",
            ...getColumnSearchProps("username")
        }, {
            title: 'Cấp bậc',
            align: 'center',
            render: () => handleAccountLevel()
        }, {
            title: 'Bắt đầu khai báo',
            dataIndex: "start",
            align: 'center',
            render: (text) => text ? moment.utc(text).local().format('DD-MM-YYYY HH:mm:ss') : <>Chưa xác định</>
        }, {
            title: 'Kết thúc khai báo',
            dataIndex: "end",
            align: 'center',
            render: (text) => text ? moment.utc(text).local().format('DD-MM-YYYY HH:mm:ss') : <>Chưa xác định</>
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
            render: (state) => state?.toLowerCase() === 'active' ? <Tag color='cyan'>{state}</Tag> : <Tag color='#f50'>{state}</Tag>
        }, {
            title: 'Hành động',
            align: 'center',
            render: (rowData) => <EditAccount shape="default" icon={<EditOutlined />} data={rowData} />,
        }
    ];

    useEffect(() => {
        let  getAccountData = async () => {
            let token = getToken();
            let response = await dispatch(getListAccount({access_token: token}));
            console.log("response acc data: ", unwrapResult(response));
            setFilterData([...unwrapResult(response)]);
        }

        getAccountData();
        
    }, [])

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
                        isMultiple={true}
                        data={selectedRowKeys}
                    />
                </Col>
                <Col >
                    {user?.userRole !== "ROLE_B2" &&
                        <Link to="/register">
                            <button className="btn-create-account">Cấp tài khoản</button>
                        </Link>
                    }
                    <ExportData placement="bottomRight" data={filterData} layout="ACCOUNT"/>
                </Col>
            </Row>
            <Table
                className="account-table"
                rowSelection={{onChange: onSelectChange}} 
                columns={columns} 
                dataSource={accountData}
                rowKey="username"
                onChange={(a, b, c, extra) => { setFilterData(extra.currentDataSource) }} 
            />
            <Collapse 
                className="account-collapse"
                accordion
                expandIcon={({ isActive }) => <CaretRightOutlined style={{color: '#06e9ed'}} rotate={isActive ? 90 : 0} />}
            >
                {accountData?.map((item, ind) => 
                    <Collapse.Panel 
                        style={{textAlign: 'left', textTransform: 'capitalize'}} 
                        header={`${item.location} - ${item.username}`} 
                        key={ind}
                    >
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Tên đơn vị: ${item.location}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Mã đơn vị: ${item.username}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Cấp bậc: ${item.level}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>
                            {`Bắt đầu khai báo: ${item.start
                                ? moment.utc(item.start).local().format('DD-MM-YYYY HH:mm:ss')
                                : "Chưa xác định"
                            }`}
                        </p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>
                            {`Kết thúc khai báo: ${item.end
                                ? moment.utc(item.end).local().format('DD-MM-YYYY HH:mm:ss')
                                : "Chưa xác định"
                            }`}
                        </p>
                        {item.state.toLocaleLowerCase() === 'active' 
                        ? <p style={{fontWeight: '500', marginBottom: '16px'}}>{"Trạng thái: "}<Tag color='cyan'>{item.state}</Tag></p>
                        : <p style={{fontWeight: '500', marginBottom: '16px'}}>{"Trạng thái: "}<Tag color='#f50'>{item.state}</Tag></p>}
                        <EditAccount shape="default" icon={<EditOutlined />} data={item}/>
                    </Collapse.Panel>
                )}
            </Collapse>
        </div>
    )
}

export default Account
