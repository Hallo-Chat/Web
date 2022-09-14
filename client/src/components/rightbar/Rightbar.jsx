import "./rightbar.css"
import {Users} from "../../dummyData"
import Online from "../online/Online"

export default function Rightbar({user}){
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const HomeRightbar = () => {
        return(
            <>
            <div className="birthdayContainer">
                <img src="/assets/gift.png" className="birthdayImg" alt="" />
                <span className="birthdayText">
                    <b>Pola Forst</b> and 3 other friends have birthday today
                </span>
            </div>
            <img className="rightbarAd" src="/assets/ad.png" alt="" />
            <h4 className="rightbarTitle">
                Online Friends
            </h4>
            <ul className="rightbarFriendList">
                {Users.map(u => (
                    <Online key={u.id} user={u}/>
                ))}
            </ul>
            </>
        )
    }

    const ProfileRightbar = () => {
        return (
            <>
            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married" : "-"}</span>
                </div>
                <div className="rightbarInfoItem">
                    <span className="rightbarInfoKey">Work:</span>
                    <span className="rightbarInfoValue">{user.work}</span>
                </div>
            </div>

            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/1.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">Kim Bich</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/2.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">Kim Bich</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/3.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">Kim Bich</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/4.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">Kim Bich</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/5.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">Kim Bich</span>
                </div>
                <div className="rightbarFollowing">
                    <img className="rightbarFollowingImg" src={`${PF}person/6.jpeg`} alt=""/>
                    <span className="rightbarFollowingName">Kim Bich</span>
                </div>
            </div>
            </>
        )
    }

    return (
        <div className="rightbar">
           <div className="rightbarWrapper">
                {user ? <ProfileRightbar/> : <HomeRightbar/>}
           </div>
        </div>
    );
}