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
import AuthModal from "../../features/auth/AuthModal";
import GamesHome from "../../features/game/GamesHome";
import Game from "../../features/game/gameClip/Game";
import Channel from '../../features/channel/Channel';
import ClipEditForm from "../../features/clip/clipEditForm/ClipEditForm";
import Alert from "../layout/Alert"; 
import Settings from "../../features/settings/Settings";
import Spinner from './Spinner';
import CustomizePage from "../../features/channelCustomization/CustomizePage";
import ManageQlips from "../../features/channel/manageQlips/ManageQlips";
import ClipSearchPage from "../../features/search/clips/ClipSearchPage";
import ChannelSearchPage from '../../features/search/channels/ChannelSearchPage';
import UnAuthorized from "../../application/common/UnAuthorized";
import PrivateRoute from "../../infrastructure/utils/PrivateRoute";
import Report from "../../features/email/Report";

const App = () => {
    
    const {sidebarVisible, setAppLoaded, token, appLoaded} = useContext(rootStoreContext).commonStore;
    const {getCurrentUser} = useContext(rootStoreContext).authStore;
    
    useEffect(() => {
        if(token){
            getCurrentUser().then(() => setAppLoaded())
        } else {
            setAppLoaded()
        }
    }, [getCurrentUser, setAppLoaded, token])
    
    if(!appLoaded) return <Spinner />
    
  return (
    <Fragment>
      <Navbar />
      <Toolbars />
        <Alert />
      <AuthModal />
        {sidebarVisible && (
            <Sidebar />)}
        <div className="app-body">
            <Switch>
                <Route exact path={"/"} component={ClipHome} />
                <Route exact path={`/qlip/:id`} component={ClipPage} />
                <PrivateRoute exact path={"/create"} component={CreateClip} />
                <Route exact path={["/games", "/search/games"]} component={GamesHome} />
                <Route exact path={"/games/:id"} component={Game} />
                <Route exact path={"/channel/:username"} component={Channel} />
                <PrivateRoute exact path={"/manage/:id"} component={ClipEditForm} />
                <Route exact path={"/settings"} component={Settings} />
                <PrivateRoute exact path={"/customize"} component={CustomizePage} />
                <PrivateRoute exact path={"/manageqlips"} component={ManageQlips} />
                <Route exact path={"/search/qlips"} component={ClipSearchPage} />
                <Route exact path={"/search/channels"} component={ChannelSearchPage} />
                <Route exact path={"/unauthorized"} component={UnAuthorized} />
                <PrivateRoute component={Report} path={["/report/:username", "/email-contact"]} exact />
            </Switch>
        </div>
    </Fragment>
  );
}

export default observer(App);
