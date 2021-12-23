import React from 'react';
import ViewOption from '../view/ViewOption';
import { Divider, Progress, Modal, Tooltip } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Graph from './graph/Graph';

const Analysis = () => {
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
                console.log("click ok confirm");
            },
            onCancel() {
            },
        });
    }
    return (
        <div className="analysis">
            <div className="analysis-header">
                <h2>TỔNG HỢP VÀ PHÂN TÍCH THÔNG TIN DÂN SỐ</h2>
                {false 
                    ? <Tooltip title="Đánh dấu đã hoàn thành điều tra dân số">
                        <button onClick={() => handleChangeStateDone("DONE")} className="btn-done">Hoàn Thành</button>
                    </Tooltip>
                    : <Tooltip title="Thay đổi trạng thái về chưa hoàn thành điều tra dân số">
                        <button onClick={() => handleChangeStateDone("NODONE")} className="btn-done">Hủy Hoàn Thành</button>
                    </Tooltip>
                }
            </div>
            <div className="analysis-wrap">
                { false && 
                    <>
                    <div className="progress-declare">
                        <label>Tiến độ điều tra dân số</label>
                        <Progress 
                            percent="50" 
                            status="Tiến độ hoàn thành" 
                            strokeWidth={20}
                            status="active"
                            strokeColor={{
                                from: '#108ee9',
                                to: '#87d068',
                            }}
                        />
                    </div>
                    <Divider />
                    </>
                }
                <ViewOption />
                <Divider />
                <Graph />
            </div>
        </div>
    )
}

export default Analysis;
