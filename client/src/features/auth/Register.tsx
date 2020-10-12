import React, {useContext, useState} from "react";
import {Formik} from "formik";
import {IAuthFormValues} from "../../infrastructure/models/auth";
import {InputText} from "primereact/inputtext";
import * as yup from "yup";
import {Button} from "primereact/button";
import rootStoreContext from "../../application/stores/rootStore";
import { Messages } from 'primereact/messages';
import {observer} from "mobx-react-lite";
import { Dropdown } from 'primereact/dropdown';

const Register = () => {
    const {registerUser} = useContext(rootStoreContext).authStore;
    const {closeAuthModal} = useContext(rootStoreContext).commonStore;
    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required!").email("Please put in a valid email!"),
        password: yup.string().required("Password is required!").min(6, "Password is too short!").matches(new RegExp("[A-Z]"), "Password must contain one uppercase character").matches(new RegExp("[a-z]"), "Password must have at least 1 lowercase character").matches(new RegExp("[0-9]"), "Password contains at least one number").matches(new RegExp("[^a-zA-Z0-9]"), "Password must contain non Alphanumeric"),
        username: yup.string().required("Username is required!").min(2, "Username is too short!")
    })
    

    const genderOptions = [
        {name: "Male", code: "M"},
        {name: 'Female', code: "F"},
        {name: "Others", code: "O"}
    ];

    const [confirmPassword, setConfirmPassword] = useState("");
    
    return (
        <Formik validationSchema={validationSchema} initialValues={{email: "", password: "", username: "", gender: ""}} onSubmit={(values: IAuthFormValues, action) => {
            registerUser(values)
                .then(() =>{
                    action.setSubmitting(false);
                    closeAuthModal();
                })
                .catch(error => {
                    console.log(error)
                    action.setFieldError(Object.keys(error.data.errors)[0], Object.values<string>(error.data.errors)[0])
                    action.setSubmitting(false);
                })
        }}>
            {({handleSubmit,
                  values,
                  handleChange,
                  handleBlur,
                  errors,
                  touched,
                  isValid,
                  isSubmitting,
                  dirty,
                setFieldValue
              }) => (
                <form onSubmit={handleSubmit} className={"auth-form"}>
                    <h2 style={{textAlign: "center", fontWeight: "normal"}}>Welcome To Qlip</h2>
                    <span style={{textAlign: "center", color: "#777777", display: "block"}}>Join to start uploading qlips</span>
                    
                    <div className={"p-field"} style={{marginTop: "2em"}}>
                        <InputText className={errors.username && touched.username ? "p-invalid": ""} name={"username"} style={{width: "100%"}}  value={values.username} onChange={handleChange} onBlur={handleBlur} placeholder={"Username"} />
                        {errors.username && touched.username && (<small id="username2-help" className="p-invalid p-d-block">{errors.username}</small>)}
                    </div>
                    
                    <div className={"p-field"}>
                        <InputText className={errors.email && touched.email ? "p-invalid": ""} name={"email"} style={{width: "100%"}}  value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder={"Email address"} />
                        {errors.email && touched.email && (<small id="username2-help" className="p-invalid p-d-block">{errors.email}</small>)}
                        <small id="username2-help" style={{color: "#777777"}} className="p-d-block">The email provided will use gravatar to get an image and use that as your profile image. </small>
                    </div>
                    
                    <div className={"p-field"}>
                        <Dropdown options={genderOptions} name={"gender"} value={values.gender} onBlur={handleBlur("gender")} placeholder={"Select your gender"} optionLabel={"name"} onChange={handleChange} optionValue={"name"} style={{width: "100%"}} />
                    </div>

                    <div className={"p-field"}>
                        <InputText type={"password"} className={errors.password && touched.password ? "p-invalid": ""} name={"password"} style={{width: "100%"}}  value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder={"Password"} />
                        {errors.password && touched.password && (<small id="username2-help" className="p-invalid p-d-block">{errors.password}</small>)}
                    </div>
                    
                    <div className={"p-field"}>
                        <InputText type={"password"} value={confirmPassword}  name={"confirmPassword"} style={{width: "100%"}}   onChange={(e) => setConfirmPassword(e.currentTarget.value)} onBlur={handleBlur} placeholder={"Confirm Password"} />
                        {values.password !== confirmPassword && (<small id="username2-help" className="p-invalid p-d-block">Passwords do not match!</small>)}
                    </div>

                    <Button type={"submit"} icon={isSubmitting ? "pi pi-spin pi-spinner" : ""} disabled={!isValid || isSubmitting || !dirty } style={{width: "100%", marginBottom: "1em", fontSize: "1.2em"}} label={"Sign Up"}  />

                    <div style={{marginBottom: "1em"}}>
                        <span style={{color: "#777777", fontSize: "0.8em", textAlign: "center"}}>By joining, you agree to Qlip’s Terms of Service,
as well as to receive occasional emails from us.</span>
                    </div>

                    <div style={{position: "absolute", bottom: "0", padding: "1em", textAlign: "center", width: "81%"}}>
                        <span>Already a member? <span style={{color: "#2196F3", textDecoration: "none"}}>Sign In</span></span>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default observer(Register);