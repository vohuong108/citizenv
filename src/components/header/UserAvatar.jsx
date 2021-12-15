import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/user/userSlice';
import { removeToken } from '../../utils/localStorageHandler';
import { Avatar, Menu } from 'antd';
import { Link } from "react-router-dom";
import { LoginOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';

import AccountLogo from "../../assets/image/account_logo.png";

const UserAvatar = ({ history }) => {
    const [isHover, setHover] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);
    
    const handleLogOut = () => {
        dispatch(logOut());
        removeToken();
        
        history.push('/')
        //TODO: RELOAD PAGE
    }

    return (
        <div 
            className="user-avatar" 
            style={{ paddingLeft: '3rem', display: 'flex', alignItems: 'center'}}
            onMouseMove={() => isHover === false ? setHover(true) : ''} 
            onMouseLeave={() => setHover(false)}
        >
            <Avatar
                size={48}
                style={{
                    backgroundColor: '#87d068',
                }}
                src={AccountLogo}
            />
            <div className={`avt-wrap__pop ${isHover ? 'pop-act' : ''}`}>
                <div className="avt-pop">
                    <div className="pop-container">
                        <a className="account-info">
                            <Avatar 
                                size={64} 
                                className="avt-user"
                                src={AccountLogo}
                            />
                            <div className="account-detail">
                                <p>{19020318}</p>
                                <p>{"Nghệ An"}</p>
                            </div>
                        </a>
                        <Menu className="list-menu" >
                            <Menu.Item className="menu_item" key="account" icon={<UserOutlined width="20px"/>}>
                                <Link to={`#`}>Hồ sơ của tôi </Link>  
                            </Menu.Item>
                            <Menu.Item className="menu_item" key="dashbroad" icon={<UserOutlined width="20px"/>}>
                                <Link to={`home/account`}>Trang quản lý </Link>  
                            </Menu.Item>
                            <Menu.Item className="menu_item" key="population" icon={<QuestionCircleOutlined width="20px"/>}>
                                <Link to={'#'}>Trợ giúp</Link>  
                            </Menu.Item>
                            <Menu.Item className="menu_item" key="analysis" icon={<LoginOutlined width="20px"/>}>
                                <Link to={'#'}>Đăng xuất</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAvatar;
