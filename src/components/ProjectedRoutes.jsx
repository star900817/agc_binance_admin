import { Navigate, useLocation } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    let location = useLocation();

    if (!localStorage.getItem('admin_token')) {
        return <Navigate to="/" state={{ from: location }} replace />
    }
    return children

};

export default ProtectedRoute;