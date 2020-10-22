import React, {FormEvent, Fragment, useRef, useState} from "react";
import {Toolbar} from "primereact/toolbar"
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {SplitButton} from "primereact/splitbutton";
import {Menu} from "primereact/menu";
import {history} from "../../../index";
import { RouteComponentProps, withRouter } from "react-router-dom";
import {observer} from "mobx-react-lite";

const Toolbars: React.FC<RouteComponentProps> = ({location}) => {

    // placeholder form state managment
    const [form, setForm] = useState("");
    
    // placeholder button values
    const buttonItems = [
        {
            label: 'Create Qlip',
            icon: 'fas fa-film',
            command: () => history.push("/create")
        },
        {
            label: 'Delete',
            icon: 'pi pi-times'
        }
    ]
    
    // placeholder for more menu items
    const moreMenuItems =  [
        {
            label: 'Options',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-refresh'
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-times'
                }
            ]
        }
    ];
    
    const ref = useRef<any>(null);

    const leftContent = (
        <Fragment>
            <form style={{width: "100%"}} className={"p-d-flex"} onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                console.log(form);
            } }>
                <SplitButton label={"Create"} appendTo={document.body}  model={buttonItems} className={"p-d-none p-d-md-inline-flex p-mr-4"} icon={"pi pi-plus"} />
                {location.pathname === "/games" ? (
                    <div className="p-inputgroup">
                    <InputText value={form} name={"find"} onChange={(e) => setForm(e.currentTarget.value)} placeholder={"Search for games"} />
                    <Button label="Search" icon={"pi pi-search"} className={"p-button-text"}/>
                </div>
                ) : (
                    <div className="p-inputgroup">
                    <InputText value={form} name={"find"} onChange={(e) => setForm(e.currentTarget.value)} placeholder={"Search for qlips"} />
                    <Button label="Search" icon={"pi pi-search"} className={"p-button-text"}/>
                </div>
                )}
                
            </form>

            <div>   
                <Menu model={moreMenuItems} popup ref={ref} id="popup_menu" appendTo={document.body} />
            <Button label="More" icon="pi pi-ellipsis-v" className="p-button-text p-button-plain p-d-none p-d-md-inline-flex" onClick={(event) => ref.current!.toggle(event)} aria-controls="popup_menu" aria-haspopup />
            </div>
        </Fragment>
    )

    

    return (<Fragment>
        <Toolbar className={"toolbar"} left={() => leftContent} />
    </Fragment>)
}

export default withRouter(observer(Toolbars));