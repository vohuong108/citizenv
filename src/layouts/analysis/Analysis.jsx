import React, { useState, useEffect } from 'react';
import ViewOption from '../view/ViewOption';
import { Divider, Progress, Modal, Tooltip, Table, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Graph from './graph/Graph';
import userApi from '../../api/userApi';
import { getToken } from '../../utils/localStorageHandler';
import qs from 'query-string';
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';


const Analysis = () => {
    const [data, setData] = useState({});
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
                <DeclareState />
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
                <Table 
                    // className="analysis-table"
                    // rowSelection={{onChange: onSelectChange}} 
                    // columns={columns} 
                    // dataSource={accountData}
                    // rowKey="username"
                    // onChange={(a, b, c, extra) => { setFilterData(extra.currentDataSource) }} 
                />
            </div>
        </div>
    )
}

export default Analysis;

const DeclareState = () => {
    const user = useSelector(state => state.user.userObj);
    const [declareState, setDeclareState]= useState(null);

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
