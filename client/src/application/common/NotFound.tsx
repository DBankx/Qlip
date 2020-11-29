import React, {useContext, useEffect} from "react";
import { Button } from "primereact/button";
import {Card} from "primereact/card";
import {history} from "../../index";
import rootStoreContext from "../stores/rootStore";

const NotFound = () => {
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
        showSidebar();
    }, [showSidebar])
    return (
        <div className="spinner">
            <Card style={{textAlign: "center"}} className="card-border cardx">
                <i className="far fa-sad-tear fa-2x" style={{color: "#777777", marginBottom: "0.3em"}} />
            <p><i className="pi pi-search" /> Oops - we've looked everywhere but couldnt find this</p>
            <Button onClick={() => history.push("/")} style={{marginTop: "1em", fontWeight: 600}} label="Retun to home page" icon="pi pi-home" />
            </Card>
        </div>
    )
}

export default NotFound;