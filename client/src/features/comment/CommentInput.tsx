﻿import React, {useContext} from "react";
import {observer} from "mobx-react-lite";
import rootStoreContext from "../../application/stores/rootStore";
import userPlaceholder from "../../application/layout/images/placeholder_user.png";
import {InputTextarea} from "primereact/inputtextarea";
import {Button} from "primereact/button";
import {Formik} from "formik";
import * as yup from "yup";
import {IClip, ICommentFormValue} from "../../infrastructure/models/clip";

interface IProps {
    clip: IClip
}

const CommentInput : React.FC<IProps> = ({clip}) => {
    const {user, isLoggedIn} = useContext(rootStoreContext).authStore;
    const {addComment, addingComment} = useContext(rootStoreContext).clipStore;
    const commentValidationSchema = yup.object().shape({
        text: yup.string().required("Please add some text")
    })
    return (
        <div className={"p-grid"} style={{width: "100%"}}>
            <div className={"p-col-2 p-md-1 p-sm-1 p-lg-1"}>
                <img src={user ? user.gravatarProfileImage : userPlaceholder} alt={"avatar"} style={{borderRadius: "50%", width: "45px"}}  />
            </div>
            <div className={"p-col-10 p-md-11 p-sm-11 p-lg-11"}>
            <Formik validationSchema={commentValidationSchema} initialValues={{text: ""}} onSubmit={(values: ICommentFormValue, action) => {
                addComment(clip.id, values).then(() => action.setSubmitting(false)).then(() => action.resetForm());
            }}>
                {({handleSubmit, 
                      values, 
                      errors, 
                      touched,
                      handleBlur,
                    handleChange,
                    isValid,
                    isSubmitting,
                    resetForm
                  }) => (
                    <form onSubmit={handleSubmit}>
                    <InputTextarea id={"comment-input"} value={values.text} name={"text"} onBlur={handleBlur} onChange={handleChange} disabled={!isLoggedIn || isSubmitting} rows={4}  className={`${errors.text && touched.text && "p-invalid"} p-d-block`}  tooltip={!isLoggedIn ? "Login to leave a comment" : "Leave a comment"} autoResize style={{width: "100%"}} placeholder={"Leave a comment"}/>
                    <div style={{float: "right", marginTop: "0.3em"}}>
                    <Button type={"button"} onClick={() => resetForm()} style={{fontWeight: 600, marginRight: "1em"}} label={"CANCEL"} className={"p-button-sm p-button-text p-button-plain"} />
                    <Button type={"submit"} icon={isSubmitting || addingComment ? "pi pi-spin pi-spinner": ""} label={"COMMENT"} disabled={!isValid || isSubmitting} className={"p-button-sm"} style={{fontWeight: 600}} />
                    </div>         
                    </form>
                )}
            </Formik>
            </div>
        </div>
    )
}

export default observer(CommentInput);