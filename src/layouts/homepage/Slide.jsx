import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { Link, useLocation, useMatch} from 'react-router-dom';

//import icon image
import { ReactComponent as ChartBar } from '../../assets/icons/chart-bar-regular.svg';
import { ReactComponent as AccountIcon } from '../../assets/icons/user-friends-solid.svg';
import { ReactComponent as PopIcon } from '../../assets/icons/address-book-solid.svg';
import { useSelector } from 'react-redux';

const Slide = () => {
    const [keySlide, setKeySlide] = useState(null);
    // const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    const user = useSelector(state => state.user.userObj);
    // const match = useMatch("/dashbroad");

    // console.log("home: ", location);
    // console.log("match: ", match?.pathnameBase);

    useEffect(() => {
        if(location.pathname === '/dashboard/account') setKeySlide("account")
        else if(location.pathname === '/dashboard/analysis') setKeySlide("analysis")
        else if(location.pathname === '/dashboard/population') setKeySlide("population")

    }, [location])

    return (
        <Layout.Sider className="slide-left" >
            <Menu
                mode="inline"
                selectedKeys={[keySlide]}
                style={{ 
                    height: '100%', 
                    borderRight: 0, 
                    fontSize: '16px',
                    backgroundColor: '#1c3faa',
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    paddingTop: '10px',
                }}
            >
                {user?.userRole !== "ROLE_B2" &&
                    <Menu.Item className="menu_item" key="account" icon={<AccountIcon width="20px"/>}>
                        <Link to={`account`}>Quản lý tài khoản</Link>
                    </Menu.Item>
                }
                {(user?.userRole !== "ROLE_ADMIN" && user?.userRole !== "ROLE_B2") && 
                <>
                    <Menu.Item className="menu_item" key="analysis" icon={<ChartBar width="20px"/>}>
                        <Link to={`analysis`}>Số liệu phân tích</Link>  
                    </Menu.Item>
                    <Menu.Item className="menu_item" key="population" icon={<PopIcon width="20px"/>}>
                        <Link to={`population`}>Thông tin dân số</Link>  
                    </Menu.Item>
                </>
                }
                
            </Menu>
        </Layout.Sider>
    )
}

export default Slide