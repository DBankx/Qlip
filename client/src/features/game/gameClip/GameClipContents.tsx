﻿import React from "react";
import {observer} from "mobx-react-lite";
import {IGame} from "../../../infrastructure/models/game";
import {IClip} from "../../../infrastructure/models/clip";
import Clip from "../../clip/clipHome/Clip";

interface IProps{
    game: IGame
}

const GameClipContents : React.FC<IProps> = ({game}) => {
    return (
        <div className={"p-mt-4"}>
            {game.clips!.length > 0 ? (
                <div >
                    <div className={"p-mt-2"}>
                        <div className={"p-grid home-clip"}>
                            {game.clips?.map((clip: IClip) => (
                                <div key={clip.id} className="clip-box p-col-12 p-xl-3 p-lg-4 p-md-5 p-sm-6">
                                    <Clip clipData={clip} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ) : <span style={{marginTop: "1em"}}>No qlips posted yet for {game.name}</span>} 
        </div>
    )
}

export default observer(GameClipContents);