import React, { useState } from 'react';
import { Modal, Button, Divider } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const ViewPersonal = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

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

    return (
        <>
            <Button
                style={{borderRadius: '8px'}}
                icon={<EyeOutlined style={{color: 'green'}}/>}
                onClick={() => personalInfo()}
            >
                Xem 
            </Button>
            <Modal 
                title="Thông Tin Cá Nhân" 
                visible={isModalVisible} 
                // onOk={handleOk} 
                // onCancel={handleCancel}
            >
                aloha
            </Modal>
        </>
    )
}

export default ViewPersonal
