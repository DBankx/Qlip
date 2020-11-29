import React, {useContext, useEffect} from "react";
import rootStoreContext from "../../application/stores/rootStore";
import {observer} from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import {Formik} from "formik";
import {IEmailFormValues} from "../../infrastructure/models/email";
import {Dropdown} from "primereact/dropdown";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import * as yup from "yup";

const Report: React.FC<RouteComponentProps<{username: string}>> = ({location, history, match}) => {
    const {sendingEmail, sendEmail} = useContext(rootStoreContext).emailStore;
    const {showSidebar} = useContext(rootStoreContext).commonStore;
    useEffect(() => {
        showSidebar()
    }, [showSidebar])
    const validationSchema = yup.object().shape({
        body: yup.string().required("Body is required to send an email"),
        subject: yup.string().required("subject is required to send an email")
    })
    const subjectOptions =[
        {name: "Bug detected", code: "BG"},
        {name: "Misinterpretation of your data", code: "BG"},
        {name: "Account deletion", code: "AD"},
        {name: "Questions about using qlip", code: "AD"},
        {name: "Video not uploading", code: "VD"},
        {name: "Reporting a user", code: "RP"},
        location.pathname.startsWith("/report") &&
        {name: `Reporting ${match.params.username}`, code: "RPU"},
        {name: "Sending Feedback", code: "SF"},
        {name: "Report your history", code: "RH"}
    ] 
    return (
        <div className="sidebar-way main-container sidebar-void">
            <h2 style={{fontWeight: 600}}>{location.pathname.startsWith("/report") ? `Report ${match.params.username}` : location.pathname.startsWith("/send") ? "Send Feedback" : location.pathname.startsWith("/history") ? "Report your history" :  "Contact us by mail"}</h2>
            {location.pathname === "/email-contact" && (<p style={{marginTop: "1em", color: "#777777"}}>Thank your for choosing to contact Qlip by mail, Please choose a subject below and type in your message in the box and we will get back to you as soon as possible!. Thanks for understanding!</p>)}
            {location.pathname === "/history-report" && <p style={{marginTop: "1em", color: "#777777"}}>
               If you see a video you havent watched in your history please report it asap!, someone might be trying to access your profile 
            </p>}
            {location.pathname === "/send-feedback" && (
                <p style={{marginTop: "1em", color: "#777777"}}>
                    Thank you for opting to give us a feedback, Please send your message to us and your query will be dealt with!
                </p>
            )}
            {location.pathname.startsWith("/report") && (<p style={{marginTop: "1em", color: "#777777"}}>Please tell us what {match.params.username} did wrong :(</p>)}
            
            
            <Formik validationSchema={validationSchema} initialValues={{body: "", subject: location.pathname.startsWith("/report") ? `Reporting ${match.params.username}` : location.pathname.startsWith("/send") ? "Sending Feedback" : location.pathname.startsWith("/history") ? "Report your history" : ""}} onSubmit={(values: IEmailFormValues, action) => sendEmail(values).then(() => action.resetForm())}>
                {({
                    handleSubmit,
                    handleBlur,
                    handleChange,
                    isValid,
                    isSubmitting,
                    dirty,
                    values,
                    errors,
                    touched
                  }) => (
                    <form onSubmit={handleSubmit} style={{marginTop: "2em"}}>
                        <div className="p-field">
                        <Dropdown optionValue={"name"} className={errors.subject && touched.subject ? "p-invalid": "a"} name={"subject"} value={values.subject} options={subjectOptions} onChange={handleChange} optionLabel="name" placeholder="Reason for contacting us" onBlur={handleBlur} />
                            {errors.subject && touched.subject && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.subject}</small>
                            )}
                        </div>
                        <div className="p-field">
                            <InputTextarea className={errors.body && touched.body ? "p-invalid p-d-block boxsizingBorder" : "p-d-block boxsizingBorder"} onChange={handleChange} onBlur={handleBlur} name="body" value={values.body} rows={6} autoResize />
                            {errors.body && touched.body && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.body}</small>
                            )}
                        </div>
                        
                        <Button type="submit" disabled={sendingEmail || isSubmitting || !isValid || !dirty} label="Send request" style={{fontWeight: 600}} icon={isSubmitting || sendingEmail ? "pi pi-spin pi-spinner" : "pi pi-reply"} />
                        <Button type="button" label="Go back" style={{fontWeight: 600, marginLeft: "1em"}} className="p-button-text" onClick={() => history.goBack()} />
                    </form>                    
                )}
            </Formik>
            
        </div>
    )
}

export default observer(Report);