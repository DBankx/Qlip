import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import { Fragment } from "react";
import { Link } from "react-router-dom";


const ChannelSettings = () => {
    const {user} = useContext(rootStoreContext).authStore;
    return (
        <Fragment>
            <div className={"p-grid"}>
                <div className={"hide-sm"}>
                    <p style={{fontSize: "0.9em"}}>Channel Details</p>
                </div>
                <div className={"p-lg-3offset-2 p-sm-offset-2 p-md-offset-2"}>
                    <div className={"p-d-flex p-ai-center"}>
                        <img src={user!.gravatarProfileImage} alt={"avatar"} style={{width: "45px", borderRadius: "50%"}} />
                        <div className={"p-ml-2"}>
                            <p>{user!.username}</p>
                            <small style={{color: "#777777"}}>{user!.email}</small>
                        </div>
                    </div>
                    <Link style={{display: "block", color: "#81C784", textDecoration: "none", marginTop: "1em", fontWeight: 500}} to={"manageqlips"}>Manage qlips</Link>
                    <Link style={{display: "block", color: "#81C784", textDecoration: "none",  marginTop: "1em", fontWeight: 500}} to={`customize/${user!.username}`}>Customise channel</Link>
                    <a href="https://en.gravatar.com/support/activating-your-account/" target="_blank" rel="noopener noreferrer" style={{display: "block", color: "#81C784", textDecoration: "none",  marginTop: "1em", fontWeight: 500}}>Change profile picture</a>
                </div>
            </div>
        </Fragment>
        
    )
}

export default observer(ChannelSettings);