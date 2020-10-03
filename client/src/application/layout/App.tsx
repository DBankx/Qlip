import React from 'react';
import Navbar from "./navigation/Navbar";
import Toolbars from "./toolbar/Toolbar";
import SideBar from "./navigation/SideBar";
import {Route, Switch} from "react-router-dom";
import ClipHome from "../../features/clip/clipHome/ClipHome";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Toolbars />
      <SideBar />
        <div>
            <Switch>
                <Route exact path={"/"} component={ClipHome} />
            </Switch>
        </div>
      
    </div>
  );
}

export default App;
