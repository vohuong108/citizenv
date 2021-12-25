import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/localStorageHandler';

const PublicRoute = () => {
    let token = getToken();
    return !token && <Outlet />
}

export default PublicRoute;
