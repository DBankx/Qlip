import React, {useContext, useState} from "react";
import {observer} from "mobx-react-lite";
import {InputText} from "primereact/inputtext";
import rootStoreContext from "../../application/stores/rootStore";
import {Button} from "primereact/button";
import { Fragment } from "react";
import {Formik} from "formik";
import {IChannelFormValues} from "../../infrastructure/models/channel";
import * as yup from "yup";

const AdvancedSettings = () => {
    const {user, isLoggedIn} = useContext(rootStoreContext).authStore;
    const {updateChannel, updating} = useContext(rootStoreContext).channelStore;
    const [showForm, setShowForm] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        username: yup.string().required("New username is required").min(3, "Username must be longer than 2 characters")
    })
    return (
        <Fragment>
            {isLoggedIn && user ? (
                <div>
                <div className={"p-grid p-mb-5"}>
                <p className={"hide-sm"}>Change username</p>
                <div className={"p-lg-offset-1 p-md-offset-1 p-sm-offset-1"}>
                    <a style={{textDecoration: "none", display: "block"}} href={"#"} onClick={() => setShowForm(!showForm) }>Change Username and Channel Username</a>
                    {showForm && (
                        <Formik validationSchema={validationSchema} initialValues={{username: user.username}} onSubmit={(values: IChannelFormValues, action) => {
                            updateChannel(values).catch((error) => action.setFieldError(Object.keys(error.data.errors)[0], Object.values<string>(error.data.errors)[0])).finally(() => action.setSubmitting(false))
                        }}>
                            {({handleBlur, handleSubmit, handleChange, values, isValid, isSubmitting, touched, errors, dirty}) => (
                                <form onSubmit={handleSubmit} className={"p-mt-2 p-mb-2"}>
                                    <div className={"p-d-flex"}>
                                    <InputText name={"username"} onChange={handleChange} onBlur={handleBlur} placeholder={"new Username"} style={{width: "70%"}} value={values.username} className={`${errors.username && touched.username && "p-invalid"} p-d-block`}/>
                                    <Button disabled={isSubmitting || !isValid || !dirty} label={"Change"} type={"submit"} className={"p-button-text p-button-success"} icon={isSubmitting ? "pi pi-spin pi-spinner" : ""} />
                                    </div>
                                    {errors.username && touched.username && (
                                        <small id="username2-help" className="p-invalid p-d-block">*{errors.username}</small>
                                    )}
                                </form>
                            )}
                        </Formik>

                    )}
                    <small style={{color: "#777777"}}>Doing this will permanently change your account and channel and log you out </small>
                </div>
            </div>

                <div className={"p-grid p-mb-5"}>
                    <p className={"hide-sm"}>Change password</p>
                    <div className={"p-lg-offset-1 p-md-offset-1 p-sm-offset-1"}>
                        <a style={{textDecoration: "none", display: "block"}} href={"#"} onClick={() => setShowForm(!showForm) }>Change account password</a>
                        <small style={{color: "#777777"}}>setting a new password will log you out</small>
                    </div>
                </div>

                    <div className={"p-grid p-mb-5"}>
                        <p className={"hide-sm"}>Delete all account</p>
                        <div className={"p-lg-offset-1 p-md-offset-1 p-sm-offset-1"}>
                            <a style={{textDecoration: "none", display: "block", color: "#D9381E"}} href={"#"}>Delete account and videos</a>
                            <small style={{color: "#777777"}}>Deleting your account is permanent and will remove your channel and all your qlips!</small>
                        </div>
                    </div>
                
                    
                </div>
            ) : <p>not log</p>}
            
        </Fragment>
    )
}

export default observer(AdvancedSettings);