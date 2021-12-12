import React from 'react'
import '../../assets/styles/Header.scss'
import {Link} from "react-router-dom";

function Header() {
    return (
        <div className="Header">
            <div className="Header-container">
                <span className="header_left">
                    <div className="logo"></div>
                    <span>Tổng cục dân số Việt Nam</span>
                </span>
                <span className="header_right">
                    <Link to="/home">
                    <button className='btn' >Trang chủ</button>
                    </Link>
                    
                    <button className="btn">Thông tin</button>
                    <button className="btn">Tra cứu</button>
                    <Link to="/register">
                    <button className="btn">Đăng Ký</button>
                    </Link>
                    <Link to="/login">
                    <button className="btn">Đăng Nhập</button>
                    </Link>
                   

                </span>
            </div>
        </div>
    )
}

export default Header
