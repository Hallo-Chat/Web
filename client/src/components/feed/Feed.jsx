import "./feed.css"
import Share from "../shares/Share"
import Post from "../post/Post"
import {Posts} from "../../dummyData"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  const {user} = useContext(AuthContext);
  //const [text, setText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("posts/timeline/" + user._id);
      setPosts(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPosts();

  }, [username, user._id]);

  // useEffect(() =>{
  //   console.log("feed rendered")
  // }, [text]);
  return (
    <div className="feed">
      {/* <input type="text" onChange={e => setText(e.target.value)}/> */}
        <div className="feedWrapper">
            {(!username || username === user.username) && <Share/>}
            {posts.map((post) =>(
              <Post key={post._id} post={post}/>
            ))}
        </div>
    </div>
  )
}
