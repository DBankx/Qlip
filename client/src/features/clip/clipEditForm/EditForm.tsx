import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import {Formik} from "formik";
import {IClip, IClipFormValues} from "../../../infrastructure/models/clip";
import {InputText} from "primereact/inputtext";
import {Editor} from "primereact/editor";
import ManagedClip from "./ManagedClip";
import {Button} from "primereact/button";
import {history} from "../../../index";
import * as yup from "yup";
import rootStoreContext from "../../../application/stores/rootStore"; 

interface IProps{
    clip: IClip
}

const qlipValidationschema = yup.object().shape({
    title: yup.string().required("Required").min(3, "Qlip title is too short!").max(80, "Qlip title too long!"),
    description: yup.string().notRequired().max(5000, "Qlip description is too long").min(4, "Qlip description is too short")
});

const EditForm: React.FC<IProps> = ({clip}) => {
   const {updateClip} = useContext(rootStoreContext).clipStore;
    return (
        <div>
            <Formik validationSchema={qlipValidationschema} initialValues={{title: clip.title, description: clip.description, id: clip.id}} onSubmit={(values: IClipFormValues, action) => {
                updateClip(values).then(() => action.setSubmitting(false));
            }} >
                {({handleSubmit,
                  dirty,
                    isSubmitting,
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    setFieldValue,
                    isValid
                  }) => (
                    <form onSubmit={handleSubmit} className={"clip-form"}>
                        <div className={"p-grid p-mt-3"}>
                        <div className={"p-col-12 p-lg-8"}>
                        <div className="p-field" style={{position: "relative"}}>
                            <span className={"p-float-label"}>
                            <InputText id="title" name={"title"} value={values.title} onChange={handleChange} onBlur={handleBlur}  style={{width: "100%", height: "50px"}} aria-describedby="username2-help" width={100} className={`${errors.title && touched.title && "p-invalid"} p-d-block`} />
                            <label htmlFor="title" className="p-d-block">Title (required)</label>
                            </span>
                            <div className={"title-counter"}>
                                    <span style={{fontSize: "0.8em", color: values.title.length > 80 ? "red": "#9E9E9E"}}>
                                        {`${values.title.length}/80`}
                                    </span>
                            </div>
                            {errors.title && touched.title && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.title}</small>
                            )}
                        </div>


                        <div className="p-field" style={{marginTop: "2em"}}>
                            <InputText id="title" name={"title"} value={clip.gameName} disabled={true} style={{width: "100%", height: "50px"}} aria-describedby="username2-help" width={100} className={`p-d-block`} />
                        </div>

                        <div className={"p-field"}>
                            <span style={{marginBottom: "0.5em", fontSize: "0.8em", color: "#9E9E9E"}}>Video Description</span>
                            <Editor style={{height: "200px"}} value={values.description} onTextChange={(e) => setFieldValue("description", e.htmlValue == null ? "" : e.htmlValue)} />
                            <div className={"title-counter"}>
                                    <span style={{fontSize: "0.8em", color: values.description.length > 300 ? "red": "#9E9E9E"}}>
                                        {`${values.description.length}/300`}
                                    </span>
                            </div>
                            {errors.description && touched.description && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.description}</small>
                            )}
                        </div>
                            <div style={{float: "left", marginTop: "1em"}}>
                                <Button label={"Update"} icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-check"} type={"submit"} disabled={!isValid || !dirty || isSubmitting || values.id === "" || values.url === "" }  />
                                <Button type={"button"} label={"Cancel"} onClick={() => history.push("/")} icon={"pi pi-times"} className={"p-button-danger p-button-text"} style={{color: "#D9381E", marginLeft: "1em"}} />
                            </div>
                        </div>
                        
                        <div className={"p-col-12 p-lg-4"}>
                            <ManagedClip clip={clip} values={values} />
                        </div>
                            
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default observer(EditForm);