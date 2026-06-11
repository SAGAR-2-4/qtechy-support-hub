import {Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

function ProtectedRoute({children, allowedRoles }) {
    const {user, token} = useSelector((state) => state.auth);

    if(!token) {
        return <Navigate to = "/login" replace />;
    }

    if (
        allowedRoles && !allowedRoles.includes(user?.role)
    ) {
        return <Navigate to = "/login" replace />;
    }

    return children;
}

export default ProtectedRoute;