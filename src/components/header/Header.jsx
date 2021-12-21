import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { getToken, removeToken } from '../../utils/localStorageHandler';
import { Button, Drawer, Avatar, Divider, Menu } from 'antd';
import { MenuOutlined, } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../features/user/userSlice';
import { getUserInfo } from '../../features/user/userAction';
import UserAvatar from './UserAvatar';

import Logo from '../../assets/image/logo.png';
import { ReactComponent as ChartBar } from '../../assets/icons/chart-bar-regular.svg';
import { ReactComponent as AccountIcon } from '../../assets/icons/user-friends-solid.svg';
import { ReactComponent as PopIcon } from '../../assets/icons/address-book-solid.svg';
import AccountLogo from '../../assets/image/account_logo.png';

const Header = () => {
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();

    useEffect(() => {
        let token = getToken();
        console.log("token", token);

        const getUser = async (token) => {
            const resultAction = await dispatch(getUserInfo({access_token: token}))
            const result = unwrapResult(resultAction);

            console.log("response get user info in header: ", result);
        }

        if(!user && token) {
            getUser(token);
        }
        
    }, [])

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-row">
                    <div className="header-left">
                        <MenuDrawerLeft />
                        <div className="logo-wrap left-logo">
                            <Link to='/'>
                                <img className="logo-img" src={Logo} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="header-middle">
                        <div className="logo-wrap middle-logo">
                            <Link to='/'>
                                <img className="logo-img" src={Logo} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="header-right">
                        {!user 
                            ? <div className="header-right__btn">
                                <Link to="/login">
                                    <Button className="header-btn" type="primary" shape="round">Đăng Nhập</Button>
                                </Link>
                            </div>
                            : <div className="header-right__user">
                                <Link className="declare-btn" to="/declare">
                                    Khai Báo Thông Tin
                                </Link>
                                <UserAvatar />
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </header>
    )
}


const MenuDrawerLeft = ({ history }) => {
    const [visible, setVisible] = useState(false);
    const user = useSelector(state => state.user.userObj);
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const handleLogOut = () => {
        dispatch(logOut());
        removeToken();
        
        navigate('/login');
        //TODO: RELOAD PAGE
    }

    const handleClick = ({ key}) => {
        console.log("key: ", key);
        
    }

    return (
        <React.Fragment>
            <Button 
                className="btn-responsive btn-menu" 
                icon={<MenuOutlined />} 
                onClick={() => setVisible(true)}
            />
            <Drawer
                className="menu-drawer"
                placement="left"
                width="320px"
                onClose={() => setVisible(!visible)}
                visible={visible}
                headerStyle={{display: 'none'}}
            >
                <div className="menu-drawer-wrap">
                    {user 
                        ? <React.Fragment>
                            <div className="user-info">
                                <Link to="/" className="account-info">
                                    <Avatar 
                                        size={64} 
                                        className="avt-user"
                                        src={AccountLogo}
                                        style={{backgroundColor: '#c6c4c4'}}
                                    />
                                    <div className="account-detail">
                                        <p>{19020318}</p>
                                        <p>{"Nghệ An"}</p>
                                    </div>
                                </Link>
    
                            </div>
                            <div className="menu-features">
                                <ul>
                                    <li><Link to="/profile">Hồ sơ của tôi</Link></li>
                                    <li><Link to="/declare">Khai báo thông tin</Link></li>
                                    <li onClick={handleLogOut}>Log out</li>
                                </ul>
                            </div>
                            <Divider className="menu-drawer-divider"/>

                            <div className="menu-drawer-option">
                                <Menu className="option-menu" onClick={handleClick}>
                                    <Menu.Item className="menu_item" key="account" icon={<AccountIcon width="20px"/>}>
                                        <Link to={`dashboard/account`}>Quản lý tài khoản</Link>  
                                    </Menu.Item>
                                    <Menu.Item className="menu_item" key="analysis" icon={<ChartBar width="20px"/>}>
                                        <Link to={`dashboard/analysis`}>Số liệu phân tích</Link>  
                                    </Menu.Item>
                                    <Menu.Item className="menu_item" key="population" icon={<PopIcon width="20px"/>}>
                                        <Link to={`dashboard/population`}>Thông tin dân số</Link>  
                                    </Menu.Item>
                                </Menu>
                            </div>
                        </React.Fragment>
                        : <div className="menu-user-yet-login">
                            <ul>
                                <li><Link to="/">Trang chủ</Link></li>
                                <li><Link to="/login">Log in</Link></li>
                            </ul>
                        </div>
                         
                    }
                    <Button className="btn-close" onClick={() => setVisible(false)}>Close</Button>
                    
                </div>
            </Drawer>
        </React.Fragment>
    )
}

export default Header

