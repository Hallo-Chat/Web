import "./share.css"
import PermMediaIcon from '@mui/icons-material/PermMedia';
import LabelIcon from '@mui/icons-material/Label';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Link } from "@mui/material";

export default function Share(){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div>
            <div className="share">
                <div className="shareWrapper">
                    <div className="shareTop">
                        <Link to="/profile" style={{textDecoration: "none"}}>
                        <img src={`${PF}person/1.jpeg`} className="shareProfileImg" alt="" />
                        </Link>
                        <input type="text" className="shareInput" placeholder="What's in your mind?"/>
                    </div>
                    <hr className="shareHr"/>
                    <div className="shareBottom ">
                        <div className="shareOptions">
                            <div className="shareOption">
                                <PermMediaIcon htmlColor="tomato" className="shareIcon"/>
                                <span className="shareOptionText">Photo or Video</span>
                            </div>
                            <div className="shareOption">
                                <LabelIcon htmlColor="blue" className="shareIcon"/>
                                <span className="shareOptionText">Tag</span>
                            </div>
                            <div className="shareOption">
                                <LocationOnIcon htmlColor="green" className="shareIcon"/>
                                <span className="shareOptionText">Location</span>
                            </div>
                            <div className="shareOption">
                                <EmojiEmotionsIcon htmlColor="goldenrod" className="shareIcon"/>
                                <span className="shareOptionText">Feelings</span>
                            </div>
                        </div>
                        <button className="shareButton">Share</button>
                    </div>
                </div>
            </div>
        </div>
    )
}