import Conversation from "../../components/conversations/Conversation"
import Messenge from "../../components/message/Messenge"
import ChatOnline from "../../components/chatOnline/ChatOnline"
import Topbar from "../../components/topbar/Topbar"
import SearchIcon from '@mui/icons-material/Search';
import "./messenger.scss"
import { Col } from 'antd';
import { UserAddOutlined, UsergroupAddOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"
import { useRef } from "react"
import { io } from "socket.io-client"
import NavigationChat from "../../features/Chat/components/NavigationChat/NavigationChat";

export default function Messenger() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();


  useEffect(() => {
    socket.current = io("http://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("get messsage:", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      console.log("ok:" + data);
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => user.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationsId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div id="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {/* <input placeholder="Search for friends" className="chatMenuInput" /> */}
            <div className="search-top">
              <div className="searchbars">
                <SearchIcon className="icon-search" />
                <input type="text" className="searchInputs" placeholder="Search Friend" />
              </div>
              <div className="search-top_add-friend">
                <UserAddOutlined />
              </div>

              <div className="search-top_create-group">
                <UsergroupAddOutlined />
              </div>
            </div>
            <hr />
            {conversations.map(c => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatContainer">

          </div>
          <div className="chatBoxWrapper">
            {
              currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map(m => (
                      <div ref={scrollRef}>
                        <Messenge message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="navigationChats">
                    {/* <NavigationChat /> */}
                  </div>
                  <div className="chatBoxBottom">
                    <input className="chatMessageInput" placeholder="Write something..." onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input>
                    <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                  </div>
                </>
              ) : (

                <Col
                  span={18}
                  xl={{ span: 18 }}
                  lg={{ span: 18 }}
                  md={{ span: 17 }}
                  sm={{ span: 0 }}
                  xs={{ span: 0 }}
                >
                  <div className="landing-app">
                    <div className="title-welcome">
                      <div className="title-welcome-heading">
                        <span>
                          Chào mừng đến với <b>Hallo</b>
                        </span>
                      </div>

                      <div className="title-welcome-detail">
                        <span>
                          Khám phá những tiện ích hỗ trợ làm
                          việc và trò chuyện cùng người thân,
                          bạn bè được tối ưu hoá cho máy tính
                          của bạn.
                        </span>
                      </div>
                    </div>

                    <div className="carousel-slider">
                      <img width="65%" src={PF + "slise/slise1.png"} />
                    </div>
                  </div>
                </Col>
              )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} />
          </div>
        </div>
      </div>
    </>
  )
}
