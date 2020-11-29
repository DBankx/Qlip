import React, {Fragment, useContext} from "react";
import {IClip} from "../../../infrastructure/models/clip";
import {observer} from "mobx-react-lite";
import {SplitButton} from "primereact/splitbutton";
import rootStoreContext from "../../../application/stores/rootStore";
import Spinner from "../../../application/layout/Spinner";
import ChannelClip from "../../../features/channel/ChannelClip";
import {useMediaQuery} from "react-responsive";
import {Button} from "primereact/button";
import {history} from "../../../index";

interface IProps{
    clips: IClip[]
}

const ClipsTab : React.FC<IProps> = ({clips}) => {
    const {loadingFilter, sortChannelClipsByMostPopular, sortChannelClipsByDate} = useContext(rootStoreContext).channelStore;
    const isMobile = useMediaQuery({query: "(max-width: 400px)"});
    const sortingOptionsModel= [
        {
            label: "Most Popular",
            command: () => sortChannelClipsByMostPopular()
        },
        {
            label: "Date Added (Oldest)",
            command: () => sortChannelClipsByDate("OLDEST")
        },
        {
            label: "Date Added (Newest)",
            command: () => sortChannelClipsByDate("NEWEST")
        }
    ]
    return (
        <Fragment>
            <div className={"p-grid p-ai-center p-jc-between"}>
                <span>All Uploads</span>
                <SplitButton label={"SORT BY"} icon={"pi pi-filter"} model={sortingOptionsModel} className={"p-button-sm p-button-secondary"} />
            </div>
            <hr className={"divider p-mt-2 p-mb-2"} />
            <div>
                <div className={isMobile ? "p-grid p-ai-center p-jc-center" : "p-grid p-ai-center"}>
                    {loadingFilter ? <Spinner /> : clips.length > 0 ? (
                        <div className="p-grid">
                            {clips.map((clip: IClip) => (
                            <div key={clip.id} className={"clip-box p-col-12 p-xl-3 p-lg-4 p-md-5 p-sm-6"}>
                                <ChannelClip clip={clip} />
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="p-text-center" style={{margin: "4em auto", fontWeight: 600, color: "#777777"}}>
                            <div>
                                <p>You havent uploaded any qlip :(</p>
                                <Button label="Add a Qlip" onClick={() => history.push("/create")} className="p-button-outlined p-button-sm p-mt-3" />
                            </div>
                        </div>
                    ) }
                </div>
            </div>
        </Fragment>
    )
}

export default observer(ClipsTab);