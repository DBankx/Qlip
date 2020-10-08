import React, {useContext} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import {IClipFormValues} from "../../../infrastructure/models/clip";
import {InputText} from "primereact/inputtext";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import rootStoreContext from "../../../application/stores/rootStore";
import {observer} from "mobx-react-lite";

const ClipForm = ( ) => {
    const {uploadingClip, uploadedClip, uploadClip, progress, selectClip} = useContext(rootStoreContext).clipStore;
    // yup validation schema 
    const qlipValidationschema = yup.object().shape({
        title: yup.string().required("Required").min(3, "Qlip title is too short!").max(100, "Qlip title too long!"),
        description: yup.string().notRequired().max(5000, "Qlip description is too long").min(4, "Qlip description is too short"),
        gameName: yup.string().required("Required")
    });
    
    // clip handler to preview the chosen clip
    const clipHandler = (e: any) => {
        
    }


    return(
        <div>
            <Formik validationSchema={qlipValidationschema} initialValues={{id: "", description: "", title: "", file: null, gameName: ""  }} onSubmit={(values: IClipFormValues) => console.log(values)} >
                {({handleSubmit,
                      errors,
                      touched,
                      values,
                      handleChange,
                    handleBlur,
                    setFieldValue
                  }) => (
                    <form onSubmit={handleSubmit} className={"clip-form"}>
                        
                        <div className="p-field" style={{position: "relative"}}>
                            <span className={"p-float-label"}>
                            <InputText id="title" name={"title"} value={values.title} onChange={handleChange} onBlur={handleBlur}  style={{width: "100%", height: "50px"}} aria-describedby="username2-help" width={100} className={`${errors.title && touched.title && "p-invalid"} p-d-block`} />
                            <label htmlFor="title" className="p-d-block">Title (required)</label>
                            </span>
                            <div className={"title-counter"}>
                                    <span style={{fontSize: "0.8em", color: "#"}}>
                                        {`${values.title.length}/100`}
                                    </span>
                            </div>
                            {errors.title && touched.title && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.title}</small>
                            )}
                        </div>
                        
                        {progress}
                        <div className={"p-field"}>
                            <FileUpload name="file" url="./upload" customUpload={true} uploadHandler={(e) => uploadClip(e.files[0])
                            }   accept="video/*" maxFileSize={840000000} chooseLabel={"Select"} onSelect={(e) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if(reader.readyState === 2){
                                        selectClip(reader.result);
                                    }
                                }

                                reader.readAsDataURL(e.files[0])
                            }} />
                        </div>
                        
                        <div className={"p-field"}>
                            <span style={{marginBottom: "0.5em", fontSize: "0.8em", color: "#9E9E9E"}}>Video Description</span>
                                <Editor style={{height: "200px"}} value={values.description} placeholder={"Tell watchers about your qlip"} onTextChange={(e) => setFieldValue("description", e.htmlValue !== undefined ? e.htmlValue : "")} />
                            <div className={"title-counter"}>
                                    <span style={{fontSize: "0.8em", color: "#"}}>
                                        {`${values.description.length}/5000`}
                                    </span>
                            </div>
                            {errors.description && touched.description && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.description}</small>
                            )}
                            </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default observer(ClipForm);
