import React from 'react'
import '../../assets/styles/Header.scss'

function Header() {
    return (
        <div className="Header">
            <div className="Header-container">
                <span className="header_left">
                    <div className="logo"></div>
                    <span>Tổng cục dân số Việt Nam</span>
                </span>
                <span className="header_right">
                    <button className='btn'>Trang chủ</button>
                    <button className="btn">Thông tin</button>
                    <button className="btn">Tra cứu</button>
                    <button className="btn">Đăng nhập</button>
                </span>
            </div>
        </div>
    )
}

export default Header
