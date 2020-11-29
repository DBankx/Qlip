import React from "react";
import {observer} from "mobx-react-lite";
import {Card} from "primereact/card";
import {Button} from "primereact/button";
import {history} from "../../index";

const Contact = () => {
    const headerMail = <div  style={{textAlign: "center", marginTop: "1em"}}><i className="fas fa-envelope-open fa-4x"/></div>
    const headerPhone = <div  style={{textAlign: "center", marginTop: "1em"}}><i className="fas fa-phone-volume fa-4x"/></div>
    const headerFlag= <div  style={{textAlign: "center", marginTop: "1em"}}><i className="fas fa-flag fa-4x"/></div>
    return (
        <div className="sidebar-way main-container inner-container sidebar-void">
           <p style={{fontWeight: 600, color: "#777777", fontSize: "0.9em"}}>Contact us</p> 
            <div style={{marginTop: "1em"}}>
                <h2 style={{textAlign: "center"}}>Dont be shy, Ask us anything!</h2>
                <div className="small-contact-box" />
                <h2 style={{textAlign: "center"}}>Mondays - Fridays: 7:00am - 5:00pm (GMT)</h2>
                <div style={{marginTop: "2em"}} className="p-grid">
                    <div className="p-col-12 p-xl-4 p-lg-4 p-md-4 p-sm-4">
                        <Card style={{textAlign: "center"}} subTitle={"Drop us a line"} header={headerMail} title="Mail" className="card-border">
                           <Button onClick={() => history.push("/email-contact")} label="Submit a request" className="p-button-outlined" /> 
                        </Card>
                    </div>
                    <div className="p-col-12 p-xl-4 p-lg-4 p-md-4 p-sm-4">
                        <Card style={{textAlign: "center"}} subTitle={"Contact us by other means"} header={headerPhone} title="Phone" className="card-border">
                            <Button onClick={() => history.push("/other-contact")} label="Show contact options" className="p-button-outlined" />
                        </Card>
                    </div>
                    <div className="p-col-12 p-xl-4 p-lg-4 p-md-4 p-sm-4">
                        <Card style={{textAlign: "center"}} subTitle={"Tell us what someone did wrong?"} header={headerFlag} title="Report" className="card-border">
                            <Button onClick={() => history.push("/email-contact")} label="Report a user" className="p-button-outlined" />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default observer(Contact);