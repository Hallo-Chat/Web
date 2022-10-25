import axios from "axios";
import { UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import "./conversation.scss";
import { format } from "timeago.js";
import { Avatar, Badge, Tooltip } from 'antd';

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [lstImg, setLstImg] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  // useEffect(() => {
  //   conversation.members.map(async (m) => {
  //     const res = await axios("/user?userId=" + m);
  //     setLstImg(res.data.profilePicture);
  //   });

  //   console.log("adsadasd", lstImg);
  // }, [conversation]);


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios("/user?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="container">
      {
        conversation.isGroup ?
          (
            < div className="conversation" >
              {/* <img
                className="conversationImg"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              /> */}
              {/* <Avatar.Group maxCount={3}
                maxPopoverPlacement={false} className="conversationImg">
                Group
              </Avatar.Group> */}
              {
                conversation.avatar == '' ?
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
                      conversation.avatar
                    }
                    alt=""
                  />)
              }


              <div className="conversationTitle">
                <div className="conversationNameTime">
                  <span className="conversationName">{conversation?.name}</span>
                </div>
                <div className="conversationMess">
                  <span className="userCurentChatMess">Are you OK?</span>
                </div>
                <span className="conversationTime">{format(user?.createdAt)}</span>
              </div>
            </div >
          ) :
          (
            < div className="conversation" >
              <img
                className="conversationImg"
                src={
                  user?.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
              <div className="conversationTitle">
                <div className="conversationNameTime">
                  <span className="conversationName">{user?.username}</span>
                </div>
                <div className="conversationMess">
                  <span className="userCurentChatMess">Are you OK?</span>
                </div>
                <span className="conversationTime">{format(user?.createdAt)}</span>
              </div>
            </div >
          )
      }
    </div>
  )
}