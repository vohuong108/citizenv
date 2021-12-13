import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { getToken } from '../utils/localStorageHandler';

const PrivateRoute = () => {
    const token = getToken()
    return !token ? <Navigate to='/login' /> : <Outlet />
}

export default PrivateRoute;
