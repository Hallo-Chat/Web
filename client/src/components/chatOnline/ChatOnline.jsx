import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css"

export default function ChatOnline({onlineUsers, currentId, setCurrentChat}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

    useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("/user/friends/" + currentId);
      setFriends(res.data);
    }
    getFriends();

  }, [currentId]);

    useEffect(() => {
      setOnlineFriends(friends.filter(friend => onlineUsers.includes(friend.id)));
    },[friends, onlineUsers]);
// console.log(onlineUsers);
  return (
    <div className="chatOnline">
      {onlineFriends.map(o => (

        <div className="chatOnlineFriend">
            <div className="chatOnlineImgContainer">
                <img src={o?.profilePicture ? PF + o.profilePicture : PF+"person/noAvatar.png"} alt="" />
                <div className="chatOnlineBadge">
                </div>
            </div>
            <span className="chatOnlineName">{o.username}</span>
        </div>
       ))}
    </div>
  )
}