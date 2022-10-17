import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    console.log("fr" + friendId)
    const getUser = async () => {
      try {
        const res = await axios("/user?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ? PF + user.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt=""
      />
      <div className="conversationTitle">
        <span className="conversationName">{user?.username}</span>
        <div className="conversationMess">
          <span className="userCurentChatName">You:</span>
          <span className="userCurentChatMess">123123131212</span>
        </div>
      </div>
      <span className="rightbarOnlineChat"></span>
    </div>
  );
}