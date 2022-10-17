import "./topbar.css"
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import { red } from "@mui/material/colors";

export default function Topbar() {

    const { user } = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to="/" style={{ textDecoration: "none" }}>
                    <span className="logo">
                        <img height="45px" width="150px" src={PF + "logo.png"} alt="" />
                    </span>
                </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <SearchIcon className="icon-search" />
                    <input type="text" className="searchInput" placeholder="Search" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <PersonIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                    <Link to={`/messenger`}>
                        <div className="topbarIconItem">
                            <ChatIcon />
                            <span className="topbarIconBadge">2</span>
                        </div>
                    </Link>
                    <div className="topbarIconItem">
                        <NotificationsIcon />
                        <span className="topbarIconBadge">1</span>
                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PF + user.profilePicture : PF + "person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>
            </div>
        </div>
    )
}