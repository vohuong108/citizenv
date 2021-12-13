import React from 'react'
import '../../assets/styles/Header.scss'
import {Link} from "react-router-dom";
import { MenuOutlined} from '@ant-design/icons'

function Header() {
    return (
        <div className="Container">
            <nav className='Header'>
                    <input type="checkbox" id='menu' />
                    <label htmlFor="menu" className='menu_icon'><MenuOutlined/></label>
                    {/* <span className='img'><img src="logo2.jpg" alt="" /></span> */}
                    <label className='title'>Tổng cục dân số Việt Nam</label>
                    <ul>
                        <li>
                            <Link to="/home">
                            <button className='btn' >Trang chủ</button>
                            </Link>
                        </li>

                        <li><button className="btn">Thông tin</button></li>
                        <li>
                            <Link to="/register">
                            <button className="btn">Đăng Ký</button>
                            </Link></li>
                        <li>
                            <Link to="/login">
                            <button className="btn">Đăng Nhập</button>
                            </Link>
                        </li>
                    </ul>
                
            </nav>
        </div>
    )
}

export default Header
