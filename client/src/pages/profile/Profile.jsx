// import "./profile.css"
// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router";

// export default function Profile({profile}) {
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER;
//     const [user, setUser] = useState({});
//     const username = useParams().username;
//     useEffect(() => {
//         const fetchUser = async () => {
//           const res = await axios.get(`/user?username=${username}`);
//           setUser(res.data);
//         };
//         fetchUser();

//       }, [username])
//   return (
//     <>
//         <Topbar />
//         <div className="profile">
//             <Sidebar />
//             <div className="profileRight">
//                 <div className="profileRightTop">
//                     <div className="profileCover">
//                     <img className="profileCoverImg" src={user.coverPicture ? PF+"person/coverPicture.png" : PF+"person/noCover.png"} alt=""/>
//                     <img className="profileUserImg" src={user.profilePicture ? PF+"user.profilePicture" : PF+"person/noAvatar.png"} alt=""/>
//                     </div>
//                     <div className="profileInfo">
//                         <h4 className="profileInfoName">{user.username}</h4>
//                         <span className="profileInfoDesc">{user.desc}</span>
//                     </div>
//                 </div>
//                 <div className="profileRightBottom">
//                     <Feed username={username}/>
//                     <Rightbar user={user}/>
//                 </div>
//             </div>
//         </div>
//     </>
//   )
// }




// import Topbar from "../../components/topbar/Topbar";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Feed from "../../components/feed/Feed";
// import Rightbar from "../../components/rightbar/Rightbar";
import "./profile.scss"
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";

export default function AccountMenu() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = React.useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handClickLogout = () => {
        window.localStorage.clear();
        window.location.reload();
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', marginTop: '5px' }}>
                <Tooltip title="">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <div className="profileContent">
                            <div className="imageProfile">
                                {/* <img className="profileUserImg" src={user.profilePicture ? PF + "user.profilePicture" : PF + "person/noAvatar.png"} alt="" /> */}
                                <Avatar className="profileUserImg" sx={{ width: 40, height: 40 }} src={PF + user.profilePicture}></Avatar>
                                <div className="chatOnlineBadgeProfile">
                                </div>
                            </div>
                            <div className="titleProfile">
                                <h3 style={{ fontWeight: 500, fontSize: 17, color: 'black' }}>{user.username}</h3>
                                <p>Set a status</p>
                            </div>
                        </div>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 0,
                        ml: 8,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 15,
                            left: -6,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem>
                    <Avatar src={PF + user.profilePicture} /> Profile
                </MenuItem>
                <MenuItem>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    Add another account
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Link to={`/`}>
                    <MenuItem onClick={handClickLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Link>
            </Menu>
        </React.Fragment >
    );
}
