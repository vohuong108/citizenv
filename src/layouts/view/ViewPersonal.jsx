import React, { useState } from 'react';
import { Modal, Button, Divider, List, Popover } from 'antd';
import { EyeOutlined, DeleteOutlined, EditOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const ViewPersonal = ({role = 'B1'}) => {

    const personalInfo = () => {
        
        Modal.info({
            title: <><h3>Thông Tin Cá Nhân</h3><Divider /></>,
            content: (
                <div>
                    <p>Họ và tên</p>
                    <p>Số CCCD/CMND</p>
                    <p>Ngày sinh</p>
                    <p>Giới tính</p>
                    <p>Quê quán</p>
                    <p>Địa chỉ thường trú</p>
                    <p>Địa chỉ tạm trú</p>
                    <p>Tôn giáo</p>
                    <p>Trình độ văn hóa</p>
                    <p>Nghề ngiệp</p>
                </div>
            ),
            icon: null,
        })
    }

    const deleteConfirm = () => {
        
        Modal.confirm({
            title: 'Bạn có chắc chắn muốn xóa thông tin của người này không?',
            icon: <ExclamationCircleOutlined />,
            content: 'Thông tin này sẽ bị xóa vĩnh viễn',
            okText: 'Xóa',
            okType: 'danger',
            cancelText: 'Hủy',
            onOk() {
              console.log('OK');
            },
            onCancel() {
              console.log('Cancel');
            },
        });
    }

    const content = (
        <List className="view-list-action">
            <List.Item className="list-action-item" onClick={() => personalInfo()}>
                <EyeOutlined style={{color: 'green', marginRight: '4px'}}/>
                Xem
            </List.Item>
            <List.Item className="list-action-item">
                <EditOutlined style={{marginRight: '4px'}}/>
                <Link to="/edit" style={{color: '#000'}}>{"Chỉnh Sửa"}</Link>
            </List.Item>
            <List.Item className="list-action-item" onClick={() => deleteConfirm()}>
                <DeleteOutlined style={{color: 'red', marginRight: '4px'}}/>
                Xóa
            </List.Item>
        </List>
    )

    return (
        <>
        {(role === 'ADMIN' || role === 'A1' || role === 'A2' || role === 'A3')
            ? <Button
                style={{borderRadius: '8px'}}
                icon={<EyeOutlined style={{color: 'green'}}/>}
                onClick={() => personalInfo()}
            >
                Xem 
            </Button>
            : <Popover 
                overlayClassName="view-action"
                content={content} 
                placement="bottomRight"
                trigger="focus"
                style={{borderRadius: '6px'}}
            >
                <Button style={{borderRadius: '8px'}}>Hành Động</Button>
            </Popover>
        }
        </>
    )
}

export default ViewPersonal


