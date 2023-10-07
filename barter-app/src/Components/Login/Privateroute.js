import React, {useContext} from "react";

// import { Route, redirect } from "react-router";
import { Route, Navigate } from "react-router-dom";

// import { redirect } from "react-router-dom";

import { AuthContext } from "../firebase/auth";

const PrivateRoute =  ({component: RouteComponent, ...rest}) => {

    const {currentUser} = useContext(AuthContext);
    return(
        <Route
        {...rest}
        render =  {routeProps => 
            !!currentUser ? 
            (
                <RouteComponent {...routeProps} />
            ) : 
            (
                <Navigate to={"/login"} />
            )
            }
            />
    );
};

export default PrivateRoute;