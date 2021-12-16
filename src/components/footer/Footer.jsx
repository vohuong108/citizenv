import React from 'react'
import '../../assets/styles/Footer.scss'
import {PhoneFilled,MailFilled,HomeFilled } from '@ant-design/icons'


export default function Footer() {
    return (
        <div className='Container'>
            <div className='Footer'>
                <div className='info'>
                    <h5>Cổng thông tin điện tử Tổng cục dân số - Kế hoạch hóa gia đình ( Bộ Y tế )</h5>
                    <p>Chịu trách nhiệm chính: Ông  Nguyễn Văn A - Giám đốc Trung tâm thông tin - Bộ Y tế.</p>
                    <p>Bản quyền thuộc Bộ Y tế.<span>&#174;</span></p>
                    <p>Ghi rõ nguồn  "Cổng thông tin điện tử Tổng cục dân số" khi phát hành thông tin từ website này.</p>
                </div>
                <div className="contact">
                    <h6>Liên hệ :</h6>
                    <p><PhoneFilled/><span>0234234234</span></p>
                    <p><MailFilled /> <span>tcdsvn@gov.vn</span></p>
                    <p><HomeFilled /><span>Tòa nhà lô D20 - Ngõ số 8 Tôn Thất Thuyết – Mỹ Đình 2 – Nam Từ Liêm - Hà Nội</span></p>

                </div>
            </div>
        </div>
    )
}
