import React, {Fragment, useContext} from 'react';
import Navbar from "./navigation/Navbar";
import Toolbars from "./toolbar/Toolbar";
import {Route, Switch} from "react-router-dom";
import ClipHome from "../../features/clip/clipHome/ClipHome";
import {observer} from "mobx-react-lite";
import Sidebar from "./sidebar/Sidebar";
import rootStoreContext from "../stores/rootStore";
import ClipPage from "../../features/clip/WatchingClip/ClipPage";

const App = () => {
    
    const {sidebarVisible} = useContext(rootStoreContext).commonStore;
    
  return (
    <Fragment>
      <Navbar />
      <Toolbars />
        {sidebarVisible && (
            <Sidebar />)}
        <div className="app-body">
            <Switch>
                <Route exact path={"/"} component={ClipHome} />
                <Route exact path={`/qlip/:id`} component={ClipPage} />
            </Switch>
        </div>
    </Fragment>
  );
}

export default observer(App);
