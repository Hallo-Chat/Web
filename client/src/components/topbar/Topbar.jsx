import "./topbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import DuoIcon from '@mui/icons-material/Duo';
import { Avatar, Badge, Tooltip } from 'antd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { red } from "@mui/material/colors";
import axios from "axios";
import { useState } from "react";

export default function Topbar({ currentChat }) {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friendInfo, setfriendInfo] = useState(null)
    const friendId = currentChat.members.find((m) => m !== user._id);
    useEffect(() => {

        console.log("fr" + friendId)
        const getUser = async () => {
            try {
                const res = await axios("/user?userId=" + friendId);
                setfriendInfo(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getUser();
    }, [friendId]);

    if (!friendInfo) return null

    if (friendInfo)
        return (
            <div className="topbarContainer">
                <div className="topbarLeft">
                    <Link to={`/profile/${friendInfo.username}`}>
                        {
                            currentChat.avatar == '' && currentChat.isGroup ?
                                (<Avatar.Group
                                    className="conversationLstImg"
                                    maxCount={2}
                                    size="small"
                                    maxStyle={{
                                        color: '#f56a00',
                                        backgroundColor: '#fde3cf',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <div className="groupAvt1">
                                        <Avatar
                                            style={{
                                                backgroundColor: '#f56a00',
                                                marginLeft: "0.01px"
                                            }}
                                        >
                                            G
                                        </Avatar>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#FFB305',
                                                marginLeft: "0.01px"
                                            }}
                                        >
                                            R
                                        </Avatar>
                                    </div>
                                    <div className="groupAvt2">
                                        <Avatar
                                            style={{
                                                backgroundColor: '#FC62AA',
                                                marginLeft: "0.01px"
                                            }}
                                        >
                                            K
                                        </Avatar>
                                        <Avatar
                                            style={{
                                                backgroundColor: '#069BBB',
                                                marginLeft: "0.2px"
                                            }}
                                        >
                                            M
                                        </Avatar>
                                    </div>
                                </Avatar.Group>)
                                :
                                (<img
                                    className="conversationImg"
                                    src={
                                        friendInfo?.profilePicture
                                            ? PF + friendInfo.profilePicture
                                            : PF + "person/noAvatar.png"
                                    }
                                    alt=""
                                />)}
                    </Link>
                    <div className="titleName">
                        {
                            currentChat.isGroup ?
                                <h3>{currentChat.name}</h3>
                                :
                                <h3>{friendInfo.username}</h3>
                        }
                        <div className="timeTop">time</div>
                    </div>
                </div>
                {/* <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="icon-search" />
                    <input type="text" className="searchInput" placeholder="Search" />
                </div>
            </div> */}
                <div className="topbarRight">
                    <div className="topbarIcons">
                        <div className="topbarIconItem">
                            <PhoneIcon sx={{ color: "#007FFF" }} />
                            {/* <span className="topbarIconBadge">1</span> */}
                        </div>
                        <Link to={`/messenger`}>
                            <div className="topbarIconItem">
                                <DuoIcon sx={{ color: "#007FFF", marginRight: "20px" }} />
                                {/* <span className="topbarIconBadge">2</span> */}
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        )
}