import React, {Dispatch, SetStateAction, useContext} from "react";
import rootStoreContext from "../../application/stores/rootStore";
import {observer} from "mobx-react-lite";
import {Formik} from "formik";
import {IChannelPasswordValues} from "../../infrastructure/models/channel";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import * as yup from "yup";


interface IProps{
    setShowPasswordForm: Dispatch<SetStateAction<boolean>> ;
}

const ChangePasswordForm: React.FC<IProps> = ({setShowPasswordForm}) => {
   const {changePassword} = useContext(rootStoreContext).channelStore; 
    const validationSchema = yup.object().shape({
        oldPassword: yup.string().required("Your current password is required"),
        newPassword: yup.string().required("New password is required!").min(6, "New password must not be less than 6 characters").matches(new RegExp("[A-Z]"), "New password must contain 1 uppercase letter").matches(new RegExp("[a-z]"), "New password must have at least 1 lowercase character").matches(new RegExp("[0-9]"), "New password contains at least one number").matches(new RegExp("[^a-zA-Z0-9]"), "New password must contain one Alphanumeric").notOneOf([yup.ref("oldPassword"), undefined], "New password must not be the same as old password"),
        confirmPassword: yup.string().oneOf([yup.ref('newPassword'), undefined], 'Passwords must match')

    })
    
    return (
        <div style={{marginTop: "1em"}}>
            <Formik validationSchema={validationSchema} initialValues={{oldPassword: "", newPassword: "", confirmPassword: ""}} onSubmit={(values: IChannelPasswordValues, action) => {
                changePassword(values).catch((error) => {
                    action.setFieldError(Object.keys(error.data.errors)[0], Object.values<string>(error.data.errors)[0]);
                }).finally(() => action.setSubmitting(false));
            }}>
                {({
                    handleSubmit,
                    handleChange,
                    values,
                    dirty,
                    isValid, 
                    isSubmitting,
                    handleBlur,
                    touched,
                    errors,
                    
                  }
                  ) => (
                    <form onSubmit={handleSubmit} style={{display: "block"}}>
                        <div className={"p-field"}>
                            <InputText type={"password"} name={"oldPassword"} onChange={handleChange} onBlur={handleBlur} placeholder={"Your old password"} style={{width: "100%"}} value={values.oldPassword} className={`${errors.oldPassword && touched.oldPassword && "p-invalid"} p-d-block`}/>
                            {errors.oldPassword && touched.oldPassword && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.oldPassword}</small>
                            )}
                                </div>

                        <div className={"p-field"}>
                            <InputText type={"password"} name={"newPassword"} onChange={handleChange} onBlur={handleBlur} placeholder={"Your new Password"} style={{width: "100%"}} value={values.newPassword} className={`${errors.newPassword && touched.newPassword && "p-invalid"} p-d-block`}/>
                            {errors.newPassword && touched.newPassword && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.newPassword}</small>
                            )}
                        </div>

                        <div className={"p-field"}>
                            <InputText type={"password"} name={"confirmPassword"} onChange={handleChange} onBlur={handleBlur} placeholder={"Confirm new Password"} style={{width: "100%"}} value={values.confirmPassword} className={`${errors.confirmPassword && touched.confirmPassword && "p-invalid"} p-d-block`}/>
                            {errors.confirmPassword && touched.confirmPassword && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.confirmPassword}</small>
                            )}
                        </div>
                        
                       <div className={"p-field"}>
                       <div style={{display: "block", textAlign: "right"}}>
                           <Button onClick={() => setShowPasswordForm(false)} type={"button"} label={"CANCEL"} style={{fontWeight: 600}} className={"p-button-sm p-button-danger p-button-text"}/>
                           <Button disabled={!isValid || isSubmitting || !dirty} icon={isSubmitting ? "pi pi-spin pi-spinner": ""} style={{fontWeight: 600}} type={"submit"} label={"CHANGE"} className={"p-button-sm"} />
                       </div> 
                    </div>
                        
                   </form>
                )}
            </Formik>
        </div>
    )
}

export default observer(ChangePasswordForm);