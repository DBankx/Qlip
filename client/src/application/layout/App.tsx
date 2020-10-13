import React, {Fragment, useContext, useEffect} from 'react';
import Navbar from "./navigation/Navbar";
import Toolbars from "./toolbar/Toolbar";
import {Route, Switch} from "react-router-dom";
import ClipHome from "../../features/clip/clipHome/ClipHome";
import {observer} from "mobx-react-lite";
import Sidebar from "./sidebar/Sidebar";
import rootStoreContext from "../stores/rootStore";
import ClipPage from "../../features/clip/WatchingClip/ClipPage";
import CreateClip from "../../features/clip/clipForm/CreateClip";
import {ToastContainer} from "react-toastify";
import AuthModal from "../../features/auth/AuthModal";
import GamesHome from "../../features/game/GamesHome";

const App = () => {
    
    const {sidebarVisible, setAppLoaded, token} = useContext(rootStoreContext).commonStore;
    const {getCurrentUser} = useContext(rootStoreContext).authStore;
    
    useEffect(() => {
        if(token){
            getCurrentUser().then(() => setAppLoaded())
        } else {
            setAppLoaded()
        }
    }, [getCurrentUser, setAppLoaded, token])
    
  return (
    <Fragment>
        <ToastContainer position={"bottom-center"} />
      <Navbar />
      <Toolbars />
      <AuthModal />
        {sidebarVisible && (
            <Sidebar />)}
        <div className="app-body">
            <Switch>
                <Route exact path={"/"} component={ClipHome} />
                <Route exact path={`/qlip/:id`} component={ClipPage} />
                <Route exact path={"/create"} component={CreateClip} />
                <Route exact path={"/games"} component={GamesHome} />
            </Switch>
        </div>
    </Fragment>
  );
}

export default observer(App);
