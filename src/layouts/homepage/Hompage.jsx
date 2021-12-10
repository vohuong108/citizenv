import React from 'react';
import Slide from './Slide';
import { Layout } from 'antd';
import Account from '../account/Account';
import Analysis from '../analysis/Analysis';
import ViewPopulation from '../view/ViewPopulation';
import { Route, useMatch, Routes, Outlet } from 'react-router-dom';

const Hompage = () => {
    return (
        <div className="homepage">
            <Layout className="hompage-layout">
                <Slide />
                <Layout.Content>
                    <Outlet />
                </Layout.Content>
            </Layout>
        </div>
    )
}



export default Hompage
