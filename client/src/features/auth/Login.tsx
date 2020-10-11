import React, {useContext, useRef, useState} from "react";
import {Formik} from "formik";
import {IAuthFormValues} from "../../infrastructure/models/auth";
import {InputText} from "primereact/inputtext";
import * as yup from "yup";
import {Button} from "primereact/button";
import rootStoreContext from "../../application/stores/rootStore";
import {Checkbox} from 'primereact/checkbox';
import { Messages } from 'primereact/messages';
import {observer} from "mobx-react-lite";

const Login = () => {
    const {loginUser} = useContext(rootStoreContext).authStore;
    const {closeAuthModal} = useContext(rootStoreContext).commonStore;
    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required!").email("Please put in a valid email!"),
        password: yup.string().required("Password is required!")
    })
    const [errorMessage, setErrorMessage] = useState(false);
    const [checked, setChecked] = useState(false);
    const ref = useRef<any>(null);
  
    return (
        <Formik validationSchema={validationSchema} initialValues={{email: "", password: ""}} onSubmit={(values: IAuthFormValues, action) => {
            loginUser(values)
                .then(() =>{ 
                    action.setSubmitting(false);
                    closeAuthModal();
                })
                .catch(error => {
                    setErrorMessage(true);
                    ref.current.show({severity: 'error', detail: "Invalid Credentials", life: 4000});
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
                dirty
              }) => (
                <form onSubmit={handleSubmit} className={"auth-form"}>
                    <h2 style={{textAlign: "center", fontWeight: "normal"}}>Welcome Back!</h2>
                    <span style={{textAlign: "center", color: "#777777", display: "block"}}>Login to start uploading qlips</span>
                    
                    {errorMessage != null && (
                        <Messages ref={ref}  />
                    )}
                    
                    <div className={"p-field"} style={{marginTop: "2em"}}>
                        <InputText className={errors.email && touched.email ? "p-invalid": ""} name={"email"} style={{width: "100%"}}  value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder={"Email address"} />
                        {errors.email && touched.email && (<small id="username2-help" className="p-invalid p-d-block">{errors.email}</small>)}
                    </div>

                    <div className={"p-field"}>
                        <InputText type={"password"} className={errors.password && touched.password ? "p-invalid": ""} name={"password"} style={{width: "100%"}}  value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder={"Password"} />
                        {errors.password && touched.password && (<small id="username2-help" className="p-invalid p-d-block">{errors.password}</small>)}
                    </div>
                    
                    <Button type={"submit"} icon={isSubmitting ? "pi pi-spin pi-spinner" : ""} disabled={!isValid || isSubmitting || !dirty } style={{width: "100%", marginBottom: "1em", fontSize: "1.2em"}} label={"Sign In"} className={""}  />
                    
                    <div className={"p-grid"} style={{marginBottom: "1em"}}>
                        <div className={"p-lg-6 p-col-12 p-md-6"}>
                            <Checkbox inputId="remember" checked={checked} onChange={e => setChecked(e.checked) } />
                            <label style={{color: "#777777", marginLeft: "1em", fontSize: "0.9em"}} htmlFor="remember">Remember Me</label>
                        </div>
                        <div className={"p-col-12 p-lg-6 p-md-6"}>
                            <span className={"forgot-password"}>Forgot Password?</span>
                        </div>
                    </div>

                    <div style={{position: "absolute", bottom: "0", padding: "1em", textAlign: "center", width: "81%"}}>
                    
                    <span>Not a member yet? <span style={{color: "#2196F3", textDecoration: "none"}}>Join Now</span></span>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default observer(Login);