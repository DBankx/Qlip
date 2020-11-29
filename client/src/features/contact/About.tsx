import React from "react";
import {history} from "../../index";
import {Button} from "primereact/button";
import csharp from "../../application/layout/images/c#.png";
import ts from "../../application/layout/images/ts.png";
import sass from "../../application/layout/images/sass.png";
import core from "../../application/layout/images/core.png";

const About = () => {
    return (
        <div className="sidebar-way main-container sidebar-void">
           <h2>About us</h2> 
            <div style={{marginTop: "1em"}}  className="p-d-flex p-flex-wrap p-jc-between">
                <div className="p-col-12 p-xl-8 p-lg-8 p-md-8">
                <p>We at qlip believe that our website is the best and easiest way for you to show off your awesome gameplays to everyone. This is why our main goal is to offer the best sharing experience between your qlips and your watchers.</p>
                
                <p style={{marginTop: "1em"}}>
                    A place where you can discover gaming content you will be amazed by, live in or demand... Our qlippers share amazing qlips for their audiences to digest and be contented by.
                </p>
                
                <p style={{marginTop: "1em"}}>
                    Qlip attarcts millions of viewers from around the world, who watch 3.5 billion videos each month!!. so its safe to say we love what we do
                </p>
                    <p style={{marginTop: "1em"}}>
                        Qlip is also an open-source project which means anyone can chip in anyway they can to make the website more productive or better in general and also you could add issues you encountered while using our app and we will be happy to fix the problem as soon as possible, a link to the github page is shown on the right pane of this page. It will take you to our repo!
                    </p>
                    
                    <div style={{marginTop: "2em"}}>
                        <h3>Our Tech Stack</h3>
                        <p>While building our site we had to look for favorable technologies that we could use to make our site more responsive, reactive and blazing fast and this is what we came up with!:</p>
                        
                        <div className="img-sec">
                            <img src={csharp} alt="c-sharp" />
                            <img src={ts} alt="typescript" />
                            <img src={sass} alt="sass" />
                            <img src={core} alt="core" />
                        </div>
                    </div>
                </div>
                
                <div className="details p-col-12 p-xl-4 p-lg-4 p-md-4">
                    <div className="p-d-flex p-ai-center">
                        <i className="fas fa-envelope" />
                        <div style={{marginLeft: "1em"}}>
                        <Button label="Contact-us" onClick={() => history.push("/contact")} />
                        </div>
                    </div>
                    <div className="p-d-flex p-mt-3">
                        <i className="fas fa-map-marker-alt" />
                        <div style={{marginLeft: "1em"}}>
                           224 boulevard malesherbes 75051 London 
                        </div>
                    </div>
                    <div className="p-d-flex p-mt-3">
                        <i className="fas fa-phone" />
                        <div style={{marginLeft: "1em"}}>
                            +234-817-270-2507
                        </div>
                    </div>
                    <div className="p-d-flex p-mt-3">
                        <i className="fab fa-github" />
                        <div style={{marginLeft: "1em"}}>
                           <a href={"https://github.com/DBankx/Qlip"} target="_blank" rel="noreferrer noopener">https://github.com/DBankx/Qlip</a> 
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default About;