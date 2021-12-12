import React from 'react';
import Slide from './Slide';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const Hompage = () => {
    return (
        <div className="homepage">
            <Layout className="hompage-layout">
                <Slide />
                <Layout.Content>
                    <div className="hompage-layout-content-wrap">
                        <Outlet />
                    </div>
                </Layout.Content>
            </Layout>
        </div>
    )
}



export default Hompage
