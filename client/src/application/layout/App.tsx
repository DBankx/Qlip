import React, { Fragment } from 'react';
import Navbar from "./navigation/Navbar";
import Toolbars from "./toolbar/Toolbar";
import {Route, Switch} from "react-router-dom";
import ClipHome from "../../features/clip/clipHome/ClipHome";
import {observer} from "mobx-react-lite";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Toolbars />
        <div style={{margin: "9em 1em 0 1em"}} className="app-body">
            <Switch>
                <Route exact path={"/"} component={ClipHome} />
            </Switch>
        </div>
    </Fragment>
  );
}

export default observer(App);
