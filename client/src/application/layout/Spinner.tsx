import React from "react";
import {ProgressSpinner} from "primereact/progressspinner";
import logo from "./images/logo.png";

const Spinner = () => {
    return (
        <div className={"spinner"}>
            <img alt={"logo"} src={logo} style={{marginLeft: "1em"}}  className="p-mr-2 main-logo"/>
           <ProgressSpinner style={{width: '40px', height: '40px'}} strokeWidth={"4"}  />
        </div>
    )
}

export default Spinner;