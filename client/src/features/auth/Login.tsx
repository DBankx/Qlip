import React, {useContext} from "react";
import {Formik} from "formik";
import {IAuthFormValues} from "../../infrastructure/models/auth";
import {InputText} from "primereact/inputtext";
import * as yup from "yup";
import {Button} from "primereact/button";
import rootStoreContext from "../../application/stores/rootStore";

const Login = () => {
    const {loginUser} = useContext(rootStoreContext).authStore;
    const {closeAuthModal} = useContext(rootStoreContext).commonStore;
    const validationSchema = yup.object().shape({
        email: yup.string().required("Email is required!").email("Please put in a valid email!"),
        password: yup.string().required("Password is required!")
    })
    return (
        <Formik validationSchema={validationSchema} initialValues={{email: "", password: ""}} onSubmit={(values: IAuthFormValues, action) => loginUser(values).finally(() => {action.setSubmitting(false); closeAuthModal();})}>
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
                    <h3 style={{textAlign: "center"}}>Sign In to Qlip</h3>
                    
                    <div className={"p-field"} style={{marginTop: "2em"}}>
                        <InputText className={errors.email && touched.email ? "p-invalid": ""} name={"email"} style={{width: "100%"}}  value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder={"Email address"} />
                        {errors.email && touched.email && (<small id="username2-help" className="p-invalid p-d-block">{errors.email}</small>)}
                    </div>

                    <div className={"p-field"}>
                        <InputText type={"password"} className={errors.password && touched.password ? "p-invalid": ""} name={"password"} style={{width: "100%"}}  value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder={"Password"} />
                        {errors.password && touched.password && (<small id="username2-help" className="p-invalid p-d-block">{errors.password}</small>)}
                    </div>
                    
                    <Button type={"submit"} icon={isSubmitting ? "pi pi-spin pi-spinner" : ""} disabled={!isValid || isSubmitting || !dirty } style={{width: "100%", marginBottom: "1em"}} label={"Sign In"} className={""}  />

                    <hr />
                    <div style={{position: "absolute", bottom: "0", padding: "1em", textAlign: "center", width: "81%"}}>
                    
                    <span>Not a member yet? <a href={"#"} style={{color: "#2196F3", textDecoration: "none"}}>Join Now</a></span>
                    </div>
                </form>
            )}
        </Formik>
    )
}

export default Login;