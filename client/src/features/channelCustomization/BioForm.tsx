import React from "react";
import {IChannel, IChannelFormValues} from "../../infrastructure/models/channel";
import {Card} from "primereact/card";
import {Formik} from "formik";
import {InputTextarea} from "primereact/inputtextarea";
import {observer} from "mobx-react-lite";
import {Button} from "primereact/button";

interface IProps{
    channel: IChannel
}

const BioForm : React.FC<IProps> = ({channel}) => {
    return (
                   <Formik initialValues={{bio: channel.bio}} onSubmit={(values: IChannelFormValues) => console.log(values)}>
                       {({
                           handleBlur,
                           handleSubmit,
                           values,
                           touched,
                           errors,
                           handleChange
                         }) => (
                            
                           <form>
                                   <div className={"p-grid"}>
                                       <p className={"p-col-1 hide-sm"}>Bio</p>
                                       <div className={"p-md-11 p-sm-11 p-lg-11 p-col-12"}>
                               <InputTextarea value={values.bio} rows={4} autoResize className={"boxsizingBorder"} />
                               <p style={{marginTop: "0.5em", fontSize: "0.9em"}}>
                                   Who you are in fewer than 300 characters</p>

                                           <Button style={{float: "right", marginTop: "0.5em"}} label={"Save changes"} className={"p-button-sm"} />
                                       </div>
                                   </div>
                           </form>
                       )}
                   </Formik>
    )
}

export default observer(BioForm);