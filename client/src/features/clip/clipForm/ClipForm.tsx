﻿import React, {useContext, useEffect} from "react";
import {Formik} from "formik";
import * as yup from "yup";
import { IClipFormValues} from "../../../infrastructure/models/clip";
import {InputText} from "primereact/inputtext";
import {Editor} from "primereact/editor";
import rootStoreContext from "../../../application/stores/rootStore";
import {observer} from "mobx-react-lite";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {history} from "../../../index";
import GameSearchPane from "./GameSearchPane";
import { RouteComponentProps, withRouter } from "react-router-dom";

const ClipForm : React.FC<RouteComponentProps<{gameName: string}>> = ({match})  => {
    
    let {uploadedClip, createClip, setUploadedClip, removeUploadedClip} = useContext(rootStoreContext).clipStore;
    const {clipUploadHelpVisible, removeClipUploadHelper, showClipUploadHelper, showAlert} = useContext(rootStoreContext).commonStore;

    const {selectedGame, toggleGameSearchPaneOn, showGameSearchPane, toggleGameSearchPaneOff, selectGame} = useContext(rootStoreContext).gameStore;
    
    
    useEffect(() => {
        if(selectedGame){
            toggleGameSearchPaneOff();
        }
        if(match.params.gameName){
            selectGame(match.params.gameName)
        }
    }, [selectedGame, toggleGameSearchPaneOff, match.params.gameName, selectGame])
    
    // yup validation schema 
    const qlipValidationschema = yup.object().shape({
        title: yup.string().required("Qlip title is required").min(3, "Qlip title is too short!").max(80, "Qlip title too long!"),
        description: yup.string().notRequired().max(5000, "Qlip description is too long").min(4, "Qlip description is too short"),
        gameName: yup.string().required("Game name is required")
    });
    
    //=========== Qlip upload management =============
    const checkUploadResult = (resultEvent: any) => {
        if(resultEvent.event === "success"){
           setUploadedClip(resultEvent.info.public_id, resultEvent.info.secure_url, resultEvent.info.secure_url.split(".mp4")[0] + ".jpg",resultEvent.info.created_at, resultEvent.info.duration, resultEvent.info.original_filename, resultEvent.info.frame_rate, resultEvent.info.format);
           showAlert("success", "Upload successful", "Qlip uploaded successfully");
            console.log(resultEvent.info);
        }
        if(resultEvent.event === "abort"){
            showAlert("info", "Upload aborted", "Upload has been aborted")
        }
    }
   // @ts-ignore
    let widget = window.cloudinary.createUploadWidget({
       cloudName: process.env.REACT_APP_CLOUD_NAME,
       uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
        styles:{
           palette:{
               window: "#181818",
               tabIcon: "#81C784",
               menuIcons: "#81C784",
               action: "#81C784",
               inactiveTabIcon: "rgba(129,199,132,0.53)",
               windowBorder: "#81C784",
               inProgress: "#81C784",
               complete: "#81C784",
               sourceBg: "#1E1E1E",
               textDark: "#fff",
               link: "#81C784",
           }
        },
        sources: ["local", "url"],
        multiple: false,
        showUploadMoreButton: false,
        clientAllowedFormats: ["mp4"],
        maxVideoFileSize: 100000000,
        maxFiles: 1
   }, (error: any, result: any) => {
        if(error){
            showAlert("error", "Upload failed", "Error occurred while uploading qlip");
        }   
        checkUploadResult(result)
    })

    // show the upload widget
    const showWidget = (widget: any) => {
        widget.open();
    }
    //============================
    
   
    
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
            <Formik validationSchema={qlipValidationschema} enableReinitialize={true} initialValues={{id: uploadedClip ?  uploadedClip.publicId : "", description: "", title: "", url: uploadedClip ? uploadedClip.url : "", gameName: match.params.gameName ? match.params.gameName : "", thumbnail: uploadedClip ? uploadedClip.thumbnail : "", duration: uploadedClip.duration ? uploadedClip.duration : 0  }} onSubmit={(values: IClipFormValues, action) => {
                selectedGame !== "" ? createClip(values).then(() => removeUploadedClip()).then(() => history.push(`/qlip/${values.id}`)) : action.setSubmitting(false); 
            }
            } >
                {({handleSubmit,
                      errors,
                      touched,
                      values, 
                      handleChange,
                    handleBlur,
                    setFieldValue,
                    dirty,
                    isValid,
                    isSubmitting,
                  }) => (
                    <form id="clip-form" encType={"multipart/formdata"} onSubmit={handleSubmit} className={"clip-form"}>
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
                                <InputText disabled={!!match.params.gameName} id="gameName" onBlur={handleBlur} name="gameName" value={values.gameName} onChange={(e) => {
                                    handleChange(e);
                                    toggleGameSearchPaneOn();
                                }} style={{width: "100%", height: "50px"}} className={`${errors.gameName && touched.gameName && "p-invalid"} p-d-block`}  />
                                {values.gameName!.length > 0 && showGameSearchPane && <GameSearchPane gameName={values.gameName!} setFieldValue={setFieldValue!}  />}
                                <label htmlFor="gameName" className="p-d-block">Game name (required)</label>
                           </span>
                            <small style={{color: "#777777"}}>Please only select a game from our database</small>
                            {errors.gameName && touched.gameName && (
                                <small id="username2-help" className="p-invalid p-d-block">*{errors.gameName}</small>
                            )}
                        </div>
                        
                        <div className={"p-field"}>
                            {/* clip help*/}
                            <div>
                            <Button type={"button"} label="Help" icon="pi pi-question-circle" className={"p-button-sm p-button-text p-button-help"} onClick={() => showClipUploadHelper()} />
                            <Dialog header="Uploading a Qlip" visible={clipUploadHelpVisible} style={{ width: '50vw' }} footer={renderFooter()} onHide={() => removeClipUploadHelper()}>
                                <b>Things to note</b>
                                <li>If the upload widget isint popping up when you click on the "upload a video" button please wait for some seconds, if that doesnt work try refreshing the page</li>
                                <li>Maximum file size is 100 MB</li>
                                <li>Qlips only allow videos below the 1 minute mark</li>
                                <li>Your video is automatically cut down to 1 minute in the uploading process</li>
                                <li>Please select only one video to upload</li>
                                <li>Only mp4 formats are allowed</li>
                                <b style={{marginTop: "1em"}}>How to upload a clip</b>
                                <li>Click on the "Uplaod a video" button *you cant miss it</li>
                                <li>Drag and drop your video file into the upload widget or browse for files</li>
                                <li>The upload process starts automatically</li>
                                <li>If a mistake was made click on the cancel/abort button</li>
                                <li>If the upload is completed successfully you will see a video preview popup</li>
                            </Dialog>
                            </div>
                            {/* clip help*/}
                          
                            <Button className="p-button-raised clip-upload-button" onClick={() => showWidget(widget)} disabled={uploadedClip.url !== ""}  type="button" label={uploadedClip.url === "" ? "UPLOAD A VIDEO" : "QLIP UPLOADED SUCCESSFULLY"} />
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
                        <Button onClick={() => selectedGame === "" && showAlert("error", "Game error", "Please select a game from our database")} label={"Create"} icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-video"} type={"submit"} style={{fontWeight: 600}} disabled={!isValid || !dirty || !isValid || isSubmitting || values.id === "" || values.url === "" }  />
                        <Button type={"button"} label={"Cancel"} onClick={() => history.goBack()} icon={"pi pi-times"} className={"p-button-danger p-button-text"} style={{color: "#D9381E", marginLeft: "2em", fontWeight: 600}} />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    )
}

export default withRouter(observer(ClipForm));
