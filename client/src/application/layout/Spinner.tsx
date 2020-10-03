import React from "react";
import {ProgressSpinner} from "primereact/progressspinner";

const Spinner = () => {
    return (
        <div className={"spinner"}>
           <ProgressSpinner style={{width: '40px', height: '40px'}} strokeWidth={"4"}  />
        </div>
    )
}

export default Spinner;