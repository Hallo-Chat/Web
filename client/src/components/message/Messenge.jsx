import "./messenge.css"
import { format } from "timeago.js";

export default function Messenge({ message, own }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    return (
        <div className={own ? "messenge own" : "messenge"}>
            <div className="messengeTop">
                <div className="imageChat">
                    <img className="messengeImg" src={PF + "person/3.jpeg"} alt="" />
                </div>
                <div className="nameTime">
                    <p className="messengeText">{message.text}</p>
                    <div className="messengeBottom">{format(message.createdAt)}</div>
                </div>
            </div>
        </div>
    )
}
