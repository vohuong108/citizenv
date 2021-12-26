import React, { useState, useEffect, useRef } from 'react';
import ViewOption from '../view/ViewOption';
import { Divider, Progress, Modal, Tooltip, Table, message, Tag, Collapse, Input } from 'antd';
import { ExclamationCircleOutlined, CaretRightOutlined, SearchOutlined } from '@ant-design/icons';
import Graph from './graph/Graph';
import userApi from '../../api/userApi';
import { getToken } from '../../utils/localStorageHandler';
import qs from 'query-string';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Highlighter from 'react-highlight-words';
import ExportData from '../../components/export/ExportData';

const DeclareContext = React.createContext(null);

const Analysis = () => {
    const [data, setData] = useState({});
    const [declareState, setDeclareState] = useState(null);

    let location = useLocation();
    const user = useSelector(state => state.user.userObj);

    useEffect(() => {
        let getData = async (params) => {
            let response = await userApi.getAnalysisData({
                access_token: getToken(),
                params: params
            });

            console.log("response getAnalysisData: ", response);
            setData({...response});
        }

        getData(qs.parse(location.search));
    }, [location.search])
    return (
        <div className="analysis">
            <div className="analysis-header">
                <h2>TỔNG HỢP VÀ PHÂN TÍCH THÔNG TIN DÂN SỐ</h2>
                <DeclareState declareState={declareState} setDeclareState={setDeclareState}/>
            </div>
            <div className="analysis-wrap top-wrap">
                { (user?.userRole !== "ROLE_B1" && user?.userRole !== "ROLE_B2") &&
                    <>
                    <DeclareProgress />
                    <Divider />
                    </>
                }
                <ViewOption pathTarget='/dashboard/analysis?'/>
            </div>
            <Graph data={data} />
            <div className="analysis-wrap">
                <CombineTable declareState={declareState}/>
            </div>
        </div>
    )
}

const DeclareProgress = () => {
    const user = useSelector(state => state.user.userObj);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let getProgress = async () => {
            let response = await userApi.getDeclareProgress({
                access_token: getToken(),
            });
            console.log("response getProgress: ", response);

            let l = response?.length;
            let s = response?.filter(i => i.state === true).length;

            setProgress((s/l*100).toFixed(0));
            
            if(l === s) {
                let update_progress_declare = await userApi.changeDeclareState({
                    access_token: getToken(),
                    newState: true,
                });

                console.log("update progress up DONE: ", update_progress_declare);
            } else {
                let update_progress_declare = await userApi.changeDeclareState({
                    access_token: getToken(),
                    newState: true,
                });

                console.log("update progress up NO DONE: ", update_progress_declare);
            }
        }

        if((user?.userRole !== "ROLE_B1") && (user?.userRole !== "ROLE_B2")) {
            getProgress();
        }
    }, [user]);

    return (
        <div className="progress-declare">
            <label>Tiến độ điều tra dân số</label>
            <Progress 
                percent={progress} 
                status="Tiến độ hoàn thành" 
                strokeWidth={20}
                status="active"
                strokeColor={{
                    from: '#108ee9',
                    to: '#87d068',
                }}
            />
        </div>
    )
}

const DeclareState = ({ declareState, setDeclareState }) => {
    const user = useSelector(state => state.user.userObj);

    let handleChangeStateDone = (type) => {
        Modal.confirm({
            title: `${type === "DONE" 
                ? "Xác nhận đã hoàn thành việc điều tra dân số?"
                : "Xác nhận sẽ hủy trạng thái hoàn thành việc điều tra dân số?"}`,
            icon: <ExclamationCircleOutlined />,
            content: `${type === "DONE" 
                ? "Việc này sẽ thay đổi trạng thái của địa phương là đã hoàn thành việc điều tra dân số"
                : "Việc này sẽ thay đổi trạng thái của địa phương là chưa hoàn thành việc điều tra dân số"}`,
            okText: 'Xác nhận',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk: async () => {
                try {
                    let response = null;
                    if(type === "DONE") {
                        response = await userApi.changeDeclareState({
                            access_token: getToken(),
                            newState: true
                        });
                        console.log("response ChangeStateDone: ", response);
                        setDeclareState(response.state);
                    } else if(type === "NODONE") {
                        response = await userApi.changeDeclareState({
                            access_token: getToken(),
                            newState: false
                        });
                        console.log("response ChangeStateNoDone: ", response);
                        setDeclareState(response.state);
                    }
                    message.success({
                        content: response?.message,
                        style: {marginTop: '72px'},
                        key: "changeDeclareState-msg"
                    })
                } catch (err) {
                    message.error({
                        content: err.message,
                        style: {marginTop: '72px'},
                        key: "changeDeclareState-msg"
                    })
                }
            },
            onCancel() {}
        });
    }

    useEffect(() => {
        let getState = async () => {
            let response = await userApi.getDeclareState({
                access_token: getToken(),
            });
            setDeclareState(response);
        }

        if(user?.userRole === "ROLE_B1") {
            getState();
        }
    }, [user])

    return (
        <>{(user?.userRole === "ROLE_B1" && declareState !== null) &&
            <>{declareState === false
                ? <Tooltip title="Đánh dấu đã hoàn thành điều tra dân số">
                    <button onClick={() => handleChangeStateDone("DONE")} className="btn-done">Hoàn Thành</button>
                </Tooltip>
                : <Tooltip title="Thay đổi trạng thái về chưa hoàn thành điều tra dân số">
                    <button onClick={() => handleChangeStateDone("NODONE")} className="btn-done">Hủy Hoàn Thành</button>
                </Tooltip>
            }</>
        }
        </>
    )
    
}

const CombineTable = ({ declareState }) => {
    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    let location = useLocation();

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

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
            dataIndex: "locationName",
            className: "location",
            ...getColumnSearchProps("locationName"),
        }, {
            title: 'Mã đơn vị',
            dataIndex: "locationId",
            align: "center",
            ...getColumnSearchProps("locationId"),
        }, {
            title: 'Dân Số',
            dataIndex: "totalPeople",
            align: "center"
        },{
            title: 'Nam giới',
            dataIndex: "male",
            align: "center"
        }, {
            title: 'Nữ giới',
            dataIndex: "female",
            align: "center"
        }, {
            title: 'Tiến Độ',
            align: "center",
            dataIndex: "state",
            filters: [
                {
                  text: 'Hoàn Thành',
                  value: true,
                },
                {
                  text: 'Chưa Hoàn Thành',
                  value: false,
                },
            ],
            onFilter: (value, record) => record.state === value,
            render: (text) => text ? <Tag color='cyan'>Hoàn Thành</Tag> : <Tag color='#f50'>Chưa Hoàn Thành</Tag>
        }
    ]

    useEffect(() => {
        let getData = async (params) => {
            let response = await userApi.getCombineData({
                access_token: getToken(),
                params: params
            });

            console.log("response getCombineData: ", response);
            setData([...response]);
            setFilterData([...response]);
        }

        getData(qs.parse(location.search));
    }, [location.search, declareState])


    return (
        <div className="combine-data-wrap">
            <div className="combine-header">
                <ExportData type="single" placement="bottomRight" data={filterData} layout="COMBINE"/>
            </div>
            <Table 
                className="combine-table"
                columns={columns} 
                dataSource={data}
                rowKey="locationId"
                onChange={(a, b, c, extra) => { setFilterData(extra.currentDataSource) }}
                pagination={false}
            />
            <Collapse 
                className="combine-collapse"
                accordion
                expandIcon={({ isActive }) => <CaretRightOutlined style={{color: '#06e9ed'}} rotate={isActive ? 90 : 0} />}
            >
                {data?.map((item, ind) => 
                    <Collapse.Panel 
                        style={{textAlign: 'left', textTransform: 'capitalize' }} 
                        header={`${item.locationName} - ${item.locationId}`} 
                        key={ind}
                    >
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Tên đơn vị: ${item.locationName}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Mã đơn vị: ${item.locationId}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Dân Số: ${item.totalPeople}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Nam Giới: ${item.male}`}</p>
                        <p style={{fontWeight: '500', marginBottom: '10px'}}>{`Nữ Giới: ${item.female}`}</p>
                        {item.state
                        ? <p style={{fontWeight: '500', marginBottom: '16px'}}>{"Tiến Độ: "}<Tag color='cyan'>Hoàn Thành</Tag></p>
                        : <p style={{fontWeight: '500', marginBottom: '16px'}}>{"Tiến Độ: "}<Tag color='#f50'>Chưa Hoàn Thành</Tag></p>}
                    </Collapse.Panel>
                )}
            </Collapse>
        </div>
    )
}


export default Analysis;