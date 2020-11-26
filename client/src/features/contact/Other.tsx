import React from "react";
import {observer} from "mobx-react-lite";

const Other = () => {
    return (
        <div className="sidebar-way main-container sidebar-void inner-container">
            <p style={{fontWeight: 600, color: "#777777", fontSize: "0.9em"}}>Other ways to contact us</p>
            <h2 style={{textAlign: "center", marginTop: "1em"}}>Contact us by other means</h2>
            <div style={{marginTop: "2em"}}>
                <p style={{marginBottom: "2em"}}><i className="fas fa-phone" /> Give us a call: +2348172702507</p>
                <p style={{marginBottom: "2em"}}><i className="fab fa-twitter" /> Drop a dm: @DBankx1 </p>
                <p style={{marginBottom: "2em"}}><i className="fab fa-facebook" /> Facebook: DamilolaHundeyin</p>
            </div>
        </div>
    )
}

export default observer(Other);