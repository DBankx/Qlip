import React, {useContext} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import { IClipFormValues} from "../../../infrastructure/models/clip";
import {InputText} from "primereact/inputtext";
import {Editor} from "primereact/editor";
import {FileUpload} from "primereact/fileupload";
import rootStoreContext from "../../../application/stores/rootStore";
import {observer} from "mobx-react-lite";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import gameNameOptions from "../../../application/common/gameNameOptions";
import {history} from "../../../index";

const ClipForm = ( ) => {
    const {uploadingClip, uploadedClip, uploadClip, selectClip, selectClipBlob, deleteUploadedClip, removeSelectedClip, createClip, clip} = useContext(rootStoreContext).clipStore;
    const {clipUploadHelpVisible, removeClipUploadHelper, showClipUploadHelper, showAlert} = useContext(rootStoreContext).commonStore;
    
    // yup validation schema 
    const qlipValidationschema = yup.object().shape({
        title: yup.string().required("Required").min(3, "Qlip title is too short!").max(80, "Qlip title too long!"),
        description: yup.string().notRequired().max(5000, "Qlip description is too long").min(4, "Qlip description is too short")
    });
    
    //clip help footer 
    function renderFooter(){
        return (
            <div>
                <Button label="understood" icon="pi pi-check" type={"button"} onClick={() => removeClipUploadHelper()} autoFocus />
            </div>
        )
    }
    
    return(
        <div>
            <Formik validationSchema={qlipValidationschema} enableReinitialize={true} initialValues={{id: uploadedClip ?  uploadedClip.publicId : "", description: "", title: "", url: uploadedClip ? uploadedClip.url : "", gameName: ""  }} onSubmit={(values: IClipFormValues) => createClip(values).then(() => history.push(`/qlip/${values.id}`))} >
                {({handleSubmit,
                      errors,
                      touched,
                      values,
                      handleChange,
                    handleBlur,
                    setFieldValue,
                    dirty,
                    isValid,
                    setSubmitting,
                    isSubmitting,
                    handleReset
                  }) => (
                    <form encType={"multipart/formdata"} onSubmit={handleSubmit} className={"clip-form"}>
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
                        
                        <div className={"p-field"} style={{marginTop: "3em"}}>
                            <span className={"p-float-label"}>
                            <Dropdown optionValue={"name"} className={errors.gameName && touched.gameName ? "p-invalid": "a"} name={"gameName"} style={{width: "100%", height: "50px"}} value={values.gameName} options={gameNameOptions} onChange={handleChange} optionLabel="name" filter showClear filterBy="name" placeholder="Select a Game" onBlur={handleBlur("gameName")} />
                            </span>
                            {errors.gameName && touched.gameName && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.title}</small>
                            )}
                        </div>
                        
                        <div className={"p-field"}>
                            
                            {/* clip help*/}
                            <div >
                            <Button type={"button"} label="Help" icon="pi pi-question-circle" className={"p-button-sm p-button-text p-button-help"} onClick={() => showClipUploadHelper()} />
                            <Dialog header="Uploading a Qlip" visible={clipUploadHelpVisible} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => removeClipUploadHelper()}>
                                <b>Things to note</b>
                                <li>Maximum file size is 100 MB</li>
                                    <li>Qlips only allow videos below the 1 minute mark</li>
                                    <li>Your video is automatically cut down to 1 minute in the uploading process</li>
                                    <li>Please select only one video to upload</li>
                                <li>Only mp4 formats are allowed</li>
                                <b style={{marginTop: "1em"}}>How to upload a clip</b>
                                <li>choose a file from your device by clicking "select"</li>
                                <li>view the preview card to make sure the video is in order</li>
                                <li>click on upload to upload the video</li>
                                <li>if a mistake was made click on the cancel button</li>
                            </Dialog>
                            </div>
                            {/* clip help*/}
                            
                            {uploadingClip && (
                                <h3 style={{color: "#81C784", fontWeight: "normal"}}>Uploading Qlip -- PLEASE WAIT</h3>
                            )}
                            <FileUpload name="file" customUpload={true} disabled={uploadingClip} 
                                        emptyTemplate={() => <div style={{textAlign: "center"}} className={"p-m-0"}>
                                <i className={"far fa-file-video fa-6x"}/>
                                <p className={"p-mt-2"}>Drag and drop files here to upload!</p>
                            </div>} 
                                        uploadHandler={(e) => {
                                if(uploadedClip){
                                    showAlert("error", "Upload", "Qlip has already been uploaded");
                                } else {
                                uploadClip(e.files[0]);
                                    showAlert("info", "Uploading", "Please wait");
                                }
                            }
                            }   accept="video/mp4" maxFileSize={200000000} chooseLabel={"Select"} onError={(e) => showAlert("error", "Error occurred", "Error selecting files")} onSelect={(e) => {
                                const reader = new FileReader();
                                reader.onload = () => {
                                    if(reader.readyState === 2){
                                        selectClip(reader.result);
                                    }   
                                }

                                reader.readAsDataURL(e.files[0]);
                                selectClipBlob(e.files[0]);
                            }} onClear={() => {
                                if(uploadedClip){
                                    deleteUploadedClip().then(() => (showAlert("info", "Deleting", "Deleting uploaded qlip")));
                                }
                                removeSelectedClip();
                            }} onRemove={(e) => {
                                removeSelectedClip();
                                if(e.file){
                                    showAlert("info", "", "Removed file")
                                }
                                if(uploadedClip){
                                    deleteUploadedClip().then(() => showAlert("info", "Deleting", "Deleting uploaded qlip"));
                                }
                            }} />
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
                        <Button label={"Create"} icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-video"} type={"submit"} disabled={!isValid || !dirty || isSubmitting || values.id === "" || values.url === "" }  />
                        <Button type={"button"} label={"Cancel"} onClick={() => history.push("/")} icon={"pi pi-times"} className={"p-button-danger p-button-text"} style={{backgroundColor: "#D9381E", color: "#fff", borderColor: "#D9381E", marginLeft: "2em"}} />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default observer(ClipForm);
