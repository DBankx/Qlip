import React, {useContext} from "react";
import {Route, Redirect} from "react-router-dom";
import rootStoreContext from "../../application/stores/rootStore";

const PrivateRoute: React.FC<{
    component: any;
    path: string|string[];
    exact: boolean;
}> = ({path, exact, component}) => {
    const {isLoggedIn} = useContext(rootStoreContext).authStore;
    return isLoggedIn ? (<Route path={path} exact={exact} component={component}  />) : (<Redirect to={"/unauthorized"} />)
}

export default PrivateRoute;