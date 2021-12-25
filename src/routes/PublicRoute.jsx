import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/localStorageHandler';
import Footer from '../components/footer/Footer';

const PublicRoute = ({ haveFooter = false }) => {
    let token = getToken();
    if(!token) {
        return haveFooter ? <><Outlet /><Footer /></> : <Outlet />
    } else {
        return <></>
    }
}

export default PublicRoute;
