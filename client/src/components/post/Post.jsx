import "./post.css"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {useState, useEffect} from "react";
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom";

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isLiked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;


    useEffect(() => {
        const fetchUser = async () => {
          const res = await axios.get(`/user/?userId=${post.userId}`);
          setUser(res.data);
        };
        fetchUser();
    
      }, [post.userId])

    const likeHandler = () => {
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    };
  return (
    <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.username}`}>
                        <img className="postProfileImg" src={user.profilePicture || PF+"person/noAvatar.png"} alt="" />
                    </Link>
                    <span className="postUserName">{user.username}</span>
                    <span className="postDate">{format(post.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVertIcon />
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">
                {post?.desc}
                    <img className="postImg" src={PF+post.img} alt=""/>
                </span>
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={()=>setLike(like + 1)} alt=""/>
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt=""/>
                        <span className="postLikeCounter">{like} people like it</span>
                </div>
                <div className="postBottomRight">
                <span className="postCommentCounter">{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}
