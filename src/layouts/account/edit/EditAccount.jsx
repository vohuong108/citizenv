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
    icon,
    isMultiple,
    data,
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
                style={{borderRadius: '8px'}}
            >
                Chỉnh sửa
            </Button>
            <Drawer
                className="drawer-edit-account"
                placement='right'
                width="40%"
                title={<h2 style={{marginBottom: 0}}>{title}</h2>}
                visible={visible}
                onClose={() => setVisible(false)}
                forceRender={true}
                destroyOnClose={true}
            >
                <Row>
                    {showChangePassword && <>
                        <Col span={24}>
                            <ChangePassword isMultiple={isMultiple} data={data} />
                        </Col>
                        <Divider />
                    </>}
                    <Col span={24}>
                        <ChangeTime isMultiple={isMultiple} data={data} />
                    </Col>
                    <Divider />
                    <Col span={24}>
                        <ChangeState isMultiple={isMultiple} data={data} />
                    </Col>
                </Row>
            </Drawer>
        </div>
    )
}

export default EditAccount
