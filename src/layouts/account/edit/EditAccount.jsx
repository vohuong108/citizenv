import React, { useState } from 'react';
import { Button, Drawer, Row, Col, Divider } from 'antd';
import ChangePassword from './ChangePassword';
import ChangeTime from './ChangeTime';
import ChangeState from './ChangeState';

const EditAccount = () => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="edit-account">
            <Button className="edit-btn-save btn-add-content" shape="round" onClick={() => setVisible(true)}>
                Chỉnh sửa
            </Button>
            <Drawer
                placement='right'
                width="40%"
                title="Chỉnh sửa thông tin đơn vị"
                visible={visible}
                onClose={() => setVisible(false)}
                forceRender={true}
                destroyOnClose={true}
            >
                <Row>
                    <Col md={24}>
                        <ChangePassword />
                    </Col>
                    <Divider />
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
