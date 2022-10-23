import "./messenge.scss"
import { format } from "timeago.js";
import { CiFaceSmile } from "react-icons/ci";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { AiOutlineDownload } from "react-icons/ai";
import { AiFillFileWord } from "react-icons/ai";
import { Image } from 'antd';
import { Link } from "react-router-dom";

export default function Messenge({ message, own }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "messenge own" : "messenge"}>
            <div className="messengeTop">
                <div className="emojiStatusTemp">
                    <BiDotsHorizontalRounded className="iConEmojiTemp" style={{ fontSize: "20px", marginTop: "10px", marginRight: "3px" }} />
                </div>
                <div className="imageChat">
                    <img className="messengeImg" src={PF + "person/3.jpeg"} alt="" />
                </div>
                <div className="nameTime">
                    <div className="name_emoji">
                        {
                            message.text.substring(0, 8) === "uploads/" ?
                                message.text.substring(message.text.length - 3, message.text.length) === 'mp4' ?
                                    <div className="videoMess">
                                        <video
                                            style={{ maxWidth: '300px' }}
                                            src={PF + message.text} alt="video" type="video/mp4" controls />
                                    </div>
                                    : message.text.substring(message.text.length - 4, message.text.length) === 'docx' ?
                                        <div className="fileUpload">
                                            <div className="imgDoc">
                                                <AiFillFileWord style={{ fontSize: "50px", color: "368DCD" }} />
                                            </div>
                                            <div className="titleFile">
                                                <h3 style={{ fontSize: "14px", textAlign: "left" }}>{message.text}</h3>
                                            </div>
                                            <Link to={PF + message.text} target="_blank" download>
                                                <div className="downloadIcon">
                                                    <AiOutlineDownload className="iconDowLoad" style={{ fontSize: "20px", color: "black", background: "white", borderRadius: "6px" }} />
                                                </div>
                                            </Link>
                                        </div>
                                        :
                                        <img
                                            className="imageMess"
                                            width={300}
                                            src={PF + message.text} alt="img" />
                                :
                                message.text.substring(0, 13) === "https://media" ?
                                    <img width={300}
                                        className="imageGif"
                                        src={message.text} alt="img" />
                                    :
                                    <p className="messengeText">{message.text}</p>
                        }
                    </div>
                    <div className="messengeBottom">{format(message.createdAt)}</div>
                </div>
                <div className="emojiStatus">
                    <CiFaceSmile className="iConEmoji" style={{ marginTop: "10px", marginLeft: "4px", marginRight: "3px", fontSize: "20px" }} />
                    <BiDotsHorizontalRounded style={{ fontSize: "20px" }} />
                </div>
            </div>
        </div>
    )
}
