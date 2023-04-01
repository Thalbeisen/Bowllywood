import { useEffect, useState } from "react";
import {Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { errorHandler } from '../utils/errorHandler';

const RouteProtector = ({permittedRoles, children}) => {
    debugger
    const [isAllowed, setIsAllowed] = useState(false),
        [checked, setChecked] = useState(false),
        location = useLocation(),
        navigate = useNavigate();

    if (permittedRoles === undefined) {
        permittedRoles = [];
    }

    useEffect(() => {
        try {
            let user;
            const currentTokens = localStorage.getItem('userTokens')
            if (currentTokens) {
                const currentTokenObj = JSON.parse(currentTokens);
                user = jwt_decode(currentTokenObj.token);
            }

            // user only needs to be connected 
            // OR need to be connected and have those roles 
            if ((currentTokens && permittedRoles.length === 0) || (currentTokens && permittedRoles.includes(user?.roleID))) {
                setIsAllowed(true)
            }
        } catch (err) {
            errorHandler('REDIRECT', err, navigate)
        } finally {
            setChecked(true)
        }
    }, [])

    const RenderPage = ({children, permittedRoles}) => {
        if (isAllowed) {
            return (children) ? children : <Outlet />
        } else {
            return (permittedRoles.length === 0) // means the user only needed to be connected.
            ? <Navigate to="/login" state={{ from: location }} replace />
            : <Navigate to="/erreur" state={{ code: 401, message: "Vous n'êtes pas autorisé à accéder à cette page." }} replace />
        }
    }

    return (checked) ? <RenderPage children={children} permittedRoles={permittedRoles} /> : '';
}

/*const RouteProtector = ({children}) => {
    const authContext = useContext(AuthContext);
    const location = useLocation();

    useEffect(() => {
        const currentTokens = localStorage.getItem('userTokens')

        if (currentTokens) {
            authContext.setAuth(currentTokens);
        }
    },[])

    return (
        authContext.auth ? children : <Navigate to="/login" state={{ from: location }} replace />
    )
}*/

export default RouteProtector;