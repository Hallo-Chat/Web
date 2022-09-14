import "./feed.css"
import Share from "../shares/Share"
import Post from "../post/Post"
import {Posts} from "../../dummyData"
import { useEffect, useState } from "react"
import axios from "axios"

export default function Feed({username}) {
  const [posts, setPosts] = useState([]);
  //const [text, setText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get("posts/timeline/6316b585d5f745505cc55e02");
      setPosts(res.data);
    };
    fetchPosts();

  }, [username]);

  // useEffect(() =>{
  //   console.log("feed rendered")
  // }, [text]);
  return (
    <div className="feed">
      {/* <input type="text" onChange={e => setText(e.target.value)}/> */}
        <div className="feedWrapper">
            <Share />
            {posts.map((post) =>(
              <Post key={post._id} post={post}/>
            ))}
        </div>
    </div>
  )
}
