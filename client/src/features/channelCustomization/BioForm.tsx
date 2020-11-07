import React, {useContext} from "react";
import {IChannel, IChannelFormValues} from "../../infrastructure/models/channel";
import {Card} from "primereact/card";
import {Formik} from "formik";
import {InputTextarea} from "primereact/inputtextarea";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";
import {InputText} from "primereact/inputtext";
import {useMediaQuery} from "react-responsive";
import rootStoreContext from "../../application/stores/rootStore";
import {history} from "../../index";

interface IProps{
    channel: IChannel
}

const BioForm : React.FC<IProps> = ({channel}) => {
    const isMobile = useMediaQuery({query: "(max-width: 500px)"})
    const isTablet = useMediaQuery({query: "(min-width: 500px) and (max-width: 1024px"});
    const {updateChannel} = useContext(rootStoreContext).channelStore;
    return (
                   <Formik initialValues={{bio: channel.bio ? channel.bio : "", twitter: channel.twitter ? channel.twitter : "", instagram: channel.instagram ? channel.instagram : "", twitch: channel.twitch ? channel.twitch : "", youtube: channel.youtube ? channel.youtube : ""}} onSubmit={(values: IChannelFormValues, action) => {
                       updateChannel(values).then(() => {
                           action.setSubmitting(false)
                           history.push(`/channel/${channel.username}`);
                       })
                   }}>
                       {({
                           handleBlur,
                           handleSubmit,
                           values,
                           touched,
                           errors,
                           handleChange,
                           isSubmitting,
                           dirty
                         }) => (
                            
                           <form onSubmit={handleSubmit} className={"bioform"}>
                               <Card className={"card-border"}>
                                   <div className={"p-grid bioform-grid"}>
                                       <p className={"p-col-1 hide-sm"}>Bio</p>
                                       <div className={"p-md-11 p-sm-11 p-lg-11 p-col-12"}>
                               <InputTextarea name={"bio"} onChange={handleChange} onBlur={handleBlur} value={values.bio} rows={4} autoResize className={"boxsizingBorder"} />
                               <p style={{marginTop: "0.5em", fontSize: "0.9em", color: "#777777"}}>
                                   Who you are in fewer than 300 characters</p>
                                       </div>
                                   </div>
                                   
                                   <hr className={"divider p-mb-2 pmt-2 "}/>
                                   
                                   <div className={"p-grid bioform-grid p-ai-center"}>
                                       <p className={"p-col-1 hide-sm"}>{isTablet ? <i className={"pi pi-twitter"} style={{fontSize: "1.2em"}} /> : "Twitter"}</p>
                                       <div className={"p-md-11 p-sm-11 pg-11 p-col-12"}>
                                           <span className={isMobile ? "p-input-icon-left" : ""} style={{width: "100%"}}>
                                               {isMobile && <i className={"pi pi-twitter"} />}
                                           <InputText style={{width: "100%"}} name={"twitter"} value={values.twitter} onChange={handleChange} onBlur={handleBlur} className={"boxsizingBorder"} placeholder={"Full twitter url link"} />
                                           </span>
                                           
                                       </div>
                                       </div>


                                   <hr className={"divider p-mb-2 pmt-2"}/>

                                   <div className={"p-grid bioform-grid p-ai-center"}>
                                       <p className={"p-col-1 hide-sm"}>{isTablet ? <i className={"fab fa-twitch fa-6x"} style={{fontSize: "1.2em"}} /> : "Twitch"}</p>
                                       <div className={"p-md-11 p-sm-11 pg-11 p-col-12"}>
                                           <span className={isMobile ? "p-input-icon-left" : ""} style={{width: "100%"}}>
                                               {isMobile && <i className={"fab fa-twitch"} />}
                                               <InputText style={{width: "100%"}} name={"twitch"} value={values.twitch} onChange={handleChange} onBlur={handleBlur} className={"boxsizingBorder"} placeholder={"Full twitch url link"} />
                                           </span>

                                       </div>
                                   </div>
                                   
                                   <hr className={"divider p-mb-2 pmt-2"}/>

                                   <div className={"p-grid bioform-grid p-ai-center"}>
                                       <p className={"p-col-1 hide-sm"}>{isTablet ? <i className={"fab fa-youtube fa-6x"} style={{fontSize: "1.2em"}} /> : "Youtube"}</p>
                                       <div className={"p-md-11 p-sm-11 pg-11 p-col-12"}>
                                           <span className={isMobile ? "p-input-icon-left" : ""} style={{width: "100%"}}>
                                               {isMobile && <i className={"fab fa-youtube"} />}
                                               <InputText style={{width: "100%"}} name={"youtube"} value={values.youtube} onChange={handleChange} onBlur={handleBlur} className={"boxsizingBorder"} placeholder={"Full youtube url link"} />
                                           </span>

                                       </div>
                                   </div>

                                   <hr className={"divider p-mb-2 pmt-2"}/>

                                   <div className={"p-grid bioform-grid p-ai-center"}>
                                       <p className={"p-col-1 hide-sm"}>{isTablet ? <i className={"fab fa-instagram fa-6x"} style={{fontSize: "1.2em"}} /> : "Instagram"}</p>
                                       <div className={"p-md-11 p-sm-11 pg-11 p-col-12"}>
                                           <span className={isMobile ? "p-input-icon-left" : ""} style={{width: "100%"}}>
                                               {isMobile && <i className={"fab fa-instagram"} />}
                                               <InputText style={{width: "100%"}} name={"instagram"} value={values.instagram} onChange={handleChange} onBlur={handleBlur} className={"boxsizingBorder"} placeholder={"Full instagram url link"} />
                                           </span>

                                       </div>
                                   </div>

                                   <hr className={"divider pmt-2"}/>
                                   
                                   <div style={{padding: "1em", width: "100%"}}>
                                   <Button type={"submit"}  disabled={isSubmitting || !dirty} icon={isSubmitting ? "pi pi-spin pi-spinner" : ""} label={"Save changes"} style={{fontWeight: 600, marginTop: "0 auto", width: isMobile ? "100%" : "auto"}} />
                                   </div>
                               </Card>
                           </form>
                       )}
                   </Formik>
    )
}

export default observer(BioForm);