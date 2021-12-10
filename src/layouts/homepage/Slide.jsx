import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation, useMatch} from 'react-router-dom';

const Slide = ({ course }) => {
    const [keySlide, setKeySlide] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const match = useMatch("/home");

    console.log("home: ", location);
    console.log("match: ", match?.pathnameBase);

    useEffect(() => {
        if(location.pathname === '/home/account') setKeySlide("account")
        else if(location.pathname === '/home/analysis') setKeySlide("analysis")
        else if(location.pathname === '/home/population') setKeySlide("population")

    }, [location])

    return (
        <Layout.Sider className="slide-left" >
            <Menu
                mode="inline"
                selectedKeys={[keySlide]}
                style={{ height: '100%', borderRight: 0, fontSize: '16px', backgroundColor: '#F0F3F5'}}
            >
                
                <Menu.Item className="menu_item" key="account">
                    <Link to={`account`}>Quản lý tài khoản</Link>  
                </Menu.Item>
                <Menu.Item className="menu_item" key="analysis">
                    <Link to={`analysis`}>Số liệu phân tích</Link>  
                </Menu.Item>
                <Menu.Item className="menu_item" key="population">
                    <Link to={`population`}>Thông tin dân số</Link>  
                </Menu.Item>
                
            </Menu>
        </Layout.Sider>
    )
}

export default Slide