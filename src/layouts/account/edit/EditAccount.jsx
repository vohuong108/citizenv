import React, { useState } from 'react';
import { Button, Drawer, Row, Col, Divider } from 'antd';
import ChangePassword from './ChangePassword';
import ChangeTime from './ChangeTime';
import ChangeState from './ChangeState';

const EditAccount = ({ 
    showChangePassword = true, 
    title = "Chỉnh sửa thông tin đơn vị", 
    className='edit-btn-save btn-add-content', 
    shape="round", 
    disabled = false,
    icon
}) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="edit-account">
            <Button 
                className={className} 
                shape={shape} 
                onClick={() => setVisible(true)}
                disabled={disabled}
                icon={icon}
            >
                Chỉnh sửa
            </Button>
            <Drawer
                className="drawer-edit-account"
                placement='right'
                width="40%"
                title={title}
                visible={visible}
                onClose={() => setVisible(false)}
                forceRender={true}
                destroyOnClose={true}
            >
                <Row>
                    {showChangePassword && <>
                        <Col md={24}>
                            <ChangePassword />
                        </Col>
                        <Divider />
                    </>}
                    <Col md={24}>
                        <ChangeTime />
                    </Col>
                    <Divider />
                    <Col md={24}>
                        <ChangeState />
                    </Col>
                </Row>
            </Drawer>
        </div>
    )
}

export default EditAccount
