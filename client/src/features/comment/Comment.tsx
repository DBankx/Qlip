import React from "react";
import {observer} from "mobx-react-lite";
import userPlaceholder from "../../application/layout/images/placeholder_user.png";

const Comment = () => {
    return (
        <div className={"p-d-flex"}>
            <div>
                <img src={userPlaceholder} alt={"comment-user"} style={{borderRadius: "50%", width: "40px"}} />
            </div>
            <div  className={"p-col-11"}>
                <div>
                    <span style={{fontSize: "0.9em"}}>JohnBssx1</span>
                    <span style={{fontSize: "0.9em", color: "#777777", marginLeft: "0.5em"}}>12 Weeks ago</span>
                </div>
                <div className={"p-mt-1"}>
                    <p style={{fontSize: "0.9em"}}>Lorem ipsum is the best you can see in this world</p>
                </div>
            </div>
        </div>
    )
}

export default observer(Comment);