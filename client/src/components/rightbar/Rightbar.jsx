import "./rightbar.css"
import { Users } from "../../dummyData"
import Online from "../online/Online"
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Rightbar({ user }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends, setFriends] = useState([]);
    const { user: currentUser, dispatch } = useContext(AuthContext)
    // const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

    useEffect(() => {
        currentUser.followings.includes(user?.id);
    })

    useEffect(() => {
        const getFriends = async () => {
            try {
                const friendList = await axios.get("/user/friends/" + user?._id);
                setFriends(friendList.data);
            } catch (err) {
                console.log(err)
            }
        };
        getFriends();
    }, [user])
    console.log(friends);

    // const handlerClick = async () => {
    //     try {
    //         if (followed) {
    //             await axios.put("/user/" + user._id + "/unfollow", { userId: currentUser._id })
    //             dispatch({ type: "UNFOLLOW", payload: user._id })
    //         }
    //         else {
    //             await axios.put("/user/" + user._id + "/follow", { userId: currentUser._id })
    //             dispatch({ type: "FOLLOW", payload: user._id })
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    //     setFollowed(!followed);
    // }

    const HomeRightbar = () => {
        return (
            <>
                {/* <div className="birthdayContainer">
                <img src={PF + "gift.png"} className="birthdayImg" alt="" />
                <span className="birthdayText">
                    <b>Pola Forst</b> and 3 other friends have birthday today
                </span>
            </div>
            <img className="rightbarAd" src={PF + "ad.png"} alt="" />
            <h4 className="rightbarTitle">
                Online Friends
            </h4> */}
                    <ul className="rightbarFriendList">
                        {friends.map(u => (
                            <Online key={u.id} user={u} />
                        ))}
                    </ul>
            </>
        )
    }

    // const ProfileRightbar = () => {
    //     return (
    //         <>
    //             {user.username !== currentUser.username && (
    //                 <button className="rightbarFollowButton" onclick={handlerClick}>
    //                     {followed ? "Unfollow" : "Follow"}
    //                     {followed ? <RemoveIcon /> : <AddIcon />}
    //                     Follow<AddIcon />
    //                 </button>
    //             )}
    //             <h4 className="rightbarTitle">User Information</h4>
    //             <div className="rightbarInfo">
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">City:</span>
    //                     <span className="rightbarInfoValue">{user.city}</span>
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">From:</span>
    //                     <span className="rightbarInfoValue">{user.from}</span>
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">Relationship:</span>
    //                     <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>
    //                 </div>
    //                 <div className="rightbarInfoItem">
    //                     <span className="rightbarInfoKey">Work:</span>
    //                     <span className="rightbarInfoValue">{user.work}</span>
    //                 </div>
    //             </div>

    //             <h4 className="rightbarTitle">User Friends</h4>
    //             <div className="rightbarFollowings">
    //                 {friends.map((friend) => (
    //                     <Link to={"profile/" + friend.username} style={{ textDecoration: "none" }}>
    //                         <div className="rightbarFollowing">
    //                             <img className="rightbarFollowingImg" src={friend.profilePicture ? PF + "friend.profilePicture" : PF + "person/noAvatar.png"} alt="" />
    //                             <span className="rightbarFollowingName">{friend.username}</span>
    //                         </div>
    //                     </Link>
    //                 ))}
    //             </div>
    //         </>
    //     )
    // }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
                {/* {user ? <ProfileRightbar /> : <HomeRightbar />} */}
                <HomeRightbar />
            </div>
        </div>
    );
}