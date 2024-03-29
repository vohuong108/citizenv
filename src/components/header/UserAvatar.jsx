import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../features/user/userSlice';
import { removeToken } from '../../utils/localStorageHandler';
import { Avatar, Menu } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { LoginOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';

import AccountLogo from "../../assets/image/account_logo.png";

const UserAvatar = () => {
    const [isHover, setHover] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userObj);

    const handleLogOut = () => {
        dispatch(logOut());
        removeToken();
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
                                size={60} 
                                className="avt-user"
                                src={AccountLogo}
                                style={{
                                    backgroundColor: '#87d068',
                                }}
                            />
                            <div className="account-detail">
                                <p>{user?.username}</p>
                                <p>{user?.userRole}</p>
                            </div>
                        </a>
                        <Menu className="list-menu" >
                            <Menu.Item className="menu_item" key="account" icon={<UserOutlined width="20px"/>}>
                                <Link to={`/profile`}>Hồ sơ của tôi </Link>  
                            </Menu.Item>
                            {user?.userRole !== "ROLE_B2" &&
                                <Menu.Item className="menu_item" key="dashbroad" icon={<UserOutlined width="20px"/>}>
                                    <Link to={`dashboard/account`}>Trang quản lý </Link>  
                                </Menu.Item>    
                            }
                            <Menu.Item className="menu_item" key="population" icon={<QuestionCircleOutlined width="20px"/>}>
                                <Link to={'#'}>Trợ giúp</Link>  
                            </Menu.Item>
                            <Menu.Item className="menu_item" key="analysis" icon={<LoginOutlined width="20px"/>}>
                                <Link to={'/login'} onClick={() => handleLogOut()}>Đăng xuất</Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAvatar;
