import React from 'react';
import {PhoneFilled,MailFilled,HomeFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-container'>
                <Row className='footer-wrap'gutter={[{ xs: 24, sm: 20, md: 28, xl: 28 }, { xs: 24, sm: 20, md: 28, xl: 28 }]}>
                    <Col xs={24} lg={12}>
                        <div className='info'>
                            <h4>Cổng thông tin điện tử Tổng cục dân số - Kế hoạch hóa gia đình ( Bộ Y tế )</h4>
                            <p>Chịu trách nhiệm chính: Ông  Nguyễn Văn A - Giám đốc Trung tâm thông tin - Bộ Y tế.</p>
                            <p>Bản quyền thuộc Bộ Y tế <span>&#174;</span></p>
                            <p>Ghi rõ nguồn  "Cổng thông tin điện tử Tổng cục dân số" khi phát hành thông tin từ website này.</p>
                        </div>
                    </Col>
                    <Col xs={24} lg={12}>
                        <div className="contact">
                            <h4>Liên hệ</h4>
                            <p><PhoneFilled/><span> 0234234234</span></p>
                            <p><MailFilled /><span> tcdsvn@gov.vn</span></p>
                            <p><HomeFilled /><span> Tòa nhà lô D20 - Ngõ số 8 Tôn Thất Thuyết - Mỹ Đình 2 - Nam Từ Liêm - Hà Nội</span></p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}