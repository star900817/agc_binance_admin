import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const localstorgeToken = localStorage.getItem("admin_token");
    return (
        <div>

            {localstorgeToken ? children : <Navigate to="/" />}
        </div>
    )
};

export default ProtectedRoute;