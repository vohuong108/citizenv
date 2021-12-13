import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/localStorageHandler';

const PublicRoute = () => {
    let token = getToken();
    return !token ? <Outlet /> : <Navigate to='/home' />
}

export default PublicRoute;
