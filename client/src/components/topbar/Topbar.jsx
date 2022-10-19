import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import PhoneIcon from '@mui/icons-material/Phone';
import DuoIcon from '@mui/icons-material/Duo';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { red } from "@mui/material/colors";

export default function Topbar({ currentChat }) {
    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    //const friendId = currentChat.members.find((m) => m !== user._id);
    console.log("okok:" + currentChat);
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
                <div className="titleName">
                    <h2>{user.username}</h2>
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
                            <DuoIcon sx={{ color: "#007FFF" }} />
                            {/* <span className="topbarIconBadge">2</span> */}
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}