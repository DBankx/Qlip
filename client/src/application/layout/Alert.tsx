import React, {useContext, useRef} from "react";
import {observer} from "mobx-react-lite";
import {Toast} from "primereact/toast";
import rootStoreContext from "../stores/rootStore";
import { Fragment } from "react";
import {alertOptionsfunc} from "../api/agent";

const Alert = () => {
    const {alertOptions, alertVisible} = useContext(rootStoreContext).commonStore;
    const ref = useRef<Toast | null>(null);
    if(alertVisible){
        ref.current!.show(alertOptions || alertOptionsfunc);
    }
    return (
        <Fragment>
            <Toast ref={ref} position={"bottom-right"} />
        </Fragment>
    )
}

export default observer(Alert);