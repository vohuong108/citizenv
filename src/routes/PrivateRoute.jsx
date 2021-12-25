import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/localStorageHandler';
import Footer from '../components/footer/Footer';

const PrivateRoute = ({ haveFooter = false }) => {
    const token = getToken()

    if(!token) {
        return <Navigate to='/login' />
    } else {
        return haveFooter ? <><Outlet /><Footer /></> : <Outlet />
    }
}

export default PrivateRoute;
