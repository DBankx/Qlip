import React, {Fragment, useContext} from 'react';
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

const App = () => {
    
    const {sidebarVisible} = useContext(rootStoreContext).commonStore;
    
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
            </Switch>
        </div>
    </Fragment>
  );
}

export default observer(App);
