import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AiOutlineFileImage } from "react-icons/ai";
import { BsChatText } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";
import { BsImage } from "react-icons/bs";
import { RiContactsBook2Line } from "react-icons/ri";
import { HiOutlineUserGroup } from "react-icons/hi";
import GifIcon from '@mui/icons-material/Gif';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import { Col, Carousel, Card, Button, Menu } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";
import { io } from "socket.io-client";
import Conversation from "../../components/conversations/Conversation";
import Messenge from "../../components/message/Messenge";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/AuthContext";
import "./messenger.scss";
import 'antd/dist/antd.css';
import { GiphyFetch } from "@giphy/js-fetch-api";
import { Grid } from "@giphy/react-components";
import Profile from "../profile/Profile"
import Dropzone from 'react-dropzone'


export default function Messenger() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [showGif, setShowGif] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();

  //MenuRight
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem('Add group chat', '1', <HiOutlineUserGroup />),
    // getItem('Option 2', '2', <DesktopOutlined />),
    // getItem('Option 3', '3', <ContainerOutlined />),
    getItem('Media', 'sub1', <BsImage />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
    getItem('Video', 'sub2', <IoVideocam />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    ]),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // End menu right

  const statusChatOnline = conversations._id;

  const onDrop = async (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0])
    const fileUpLoad = await axios.post("/messages/uploadfile", formData, config)
      .then(res => res);

    if (fileUpLoad.data.success) {
      var sub = fileUpLoad.data.url;
      let subRe = sub.substring(14, sub.length);
      let subMain = subRe.replace(/\\/g, "/");
      const messLoadFile = {
        sender: user._id,
        text: subMain,
        conversationsId: currentChat._id,
        type: 'VideoOrImageOrGif',
      };

      const receiverId = currentChat.members.find(
        (member) => member !== user._id,
      );

      socket.current.emit("sendMessage", {
        senderId: user._id,
        receiverId,
        text: subMain,
      });

      try {
        const res = await axios.post("/messages", messLoadFile);
        setMessages([...messages, res.data]);
      } catch (err) {
        console.log(err);
      }
    }
  }
  // GIF handle
  const [keyword, setkeyword] = useState('')
  const giphyFetch = new GiphyFetch('sXpGFDGZs0Dv1mmNFvYaGUvYwKX0PWIh')
  const fetchGifs = () => {
    giphyFetch.trending({ limit: 10 })
    if (keyword === '') {
      return giphyFetch.trending({ limit: 20 })
    }
    return giphyFetch.search(keyword, { limit: 20 })
  }

  const onSearch = (value) => setkeyword(value)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickGif = () => {
    setShowGif(val => !val);
  };

  //send Gif
  const handleClose = async (e) => {
    let strGif = e.images.preview_gif.url;
    let gifMain = strGif.replace(/\\/g, "/");
    const messageGif = {
      sender: user._id,
      text: gifMain,
      conversationsId: currentChat._id,
      type: 'VideoOrImage',
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: gifMain,
    });

    try {
      const res = await axios.post("/messages", messageGif);
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
    setShowGif(false);
  };

  useEffect(() => {
    socket.current = io("http://localhost:8900");
    socket.current.on("getMessage", (data) => {
      console.log("get messsage:", data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    socket.current.on('getTyping', (data) => {
      console.log(data)
    })
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

  // const handleClickGif = event => {
  //   setShowGif(val => !val);
  // };

  const inputHander = (e) => {
    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );
    setNewMessage(e);
    socket.current.emit('typingMessenger', {
      senderId: user.id,
      receiverId,
      text: newMessage,
    })
  }

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationsId: currentChat._id,
      type: 'Text',
    };
    if (message.text === "") {
      return;
    }
    const receiverId = currentChat.members.find(
      (member) => member !== user._id,
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    console.log("Da gui!!!");
    try {
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]);
      console.log("send:", res.data);
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
      <div id="messenger">
        <div className="chatMenu">
          <div className="chatMenuProfile">
            <div className="profile">
              <div className="iconMenuBottom_setting">
                <Profile />
              </div>
            </div>
          </div>
          <div className="chatMenuWrapper">
            <div className="search-top">
              <div className="searchbars">
                <SearchIcon className="icon-search" />
                <input type="text" className="searchInputs" placeholder="People, groups, messages" />
              </div>
            </div>
            <div className="containerMenu">
              <div className="containerChat">
                <BsChatText className="iconChat" style={{ fontSize: "22px" }} />
                <p style={{ fontSize: "11px", marginLeft: "-1px" }}>Chats</p>
              </div>
              <div className="containerCall">
                <IoCallOutline className="iconCall" style={{ fontSize: "22px" }} />
                <p style={{ fontSize: "11px" }}>Calls</p>
              </div>
              <div className="containerContact">
                <RiContactsBook2Line className="iconContact" style={{ fontSize: "22px" }} />
                <p style={{ fontSize: "11px", marginLeft: "-9px" }}>Contacts</p>
              </div>
            </div>
            {conversations.map(c => (
              <div onClick={() => { setCurrentChat(c) }}>
                {
                  <Conversation conversation={c} currentUser={user} />
                }
              </div>
            ))}
          </div>
          {/* <div className="menuBottom">
            <div className="iconMenuBottom">
              <div className="iconMenuBottom_contact">
                <PermContactCalendarIcon style={{ fontSize: 30 }} />
              </div>
              <div className="iconMenuBottom_addMessChat">
                <PersonAddAltRoundedIcon style={{ fontSize: 30 }} />
              </div>
              <div className="iconMenuBottom_addGroup">
                <GroupAddIcon style={{ fontSize: 30 }} />
              </div>
            </div>
          </div> */}
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {
              currentChat ? (
                <>
                  <div className="chatContainer">
                    <Topbar currentChat={currentChat} />
                  </div>
                  <div className="chatBoxTop">
                    {messages.map(m => (
                      <div ref={scrollRef}>
                        <Messenge message={m} own={m.sender === user._id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                    {/* <input className="chatMessageInput" placeholder={"Write something send to " + user.username} onChange={(e) => setNewMessage(e.target.value)} value={newMessage}></input> */}
                    <InputEmoji
                      value={newMessage}
                      onChange={inputHander}
                      cleanOnEnter
                      onEnter={handleSubmit}
                      placeholder="Type a message"
                    />
                    <div className="navigationChats">
                      <div className="iconMenuBottom_insertImage">
                        {/* <AiOutlineFileImage style={{ fontSize: 24 }} />
                         */}
                        <Dropzone onDrop={onDrop}>
                          {({ getRootProps, getInputProps }) => (
                            <section>
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <AiOutlineFileImage style={{ fontSize: 24 }} />
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                    <div className="gif">
                      {showGif && (
                        <div className="gifStyle">
                          <img src={PF + "logo.gif"} width="150" />
                          <input
                            style={{
                              marginBottom: 9, width: 120, marginLeft:
                                15
                            }}
                            value={keyword}
                            type="text"
                            onChange={e => setkeyword(e.target.value)}
                          />
                          <Grid
                            width={350}
                            columns={2}
                            gutter={6}
                            height={350}
                            fetchGifs={fetchGifs}
                            onGifClick={handleClose}
                            key={keyword}
                            noLink
                          />
                        </div>
                      )}
                    </div>
                    <GifIcon style={{ fontSize: 36 }} onClick={handleClickGif} />
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      <SendIcon style={{ fontSize: 30 }} />
                    </button>
                  </div>
                </>
              ) : (

                <Col
                  span={48}
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
                    <div className="slideTop">
                      <Carousel autoplay>
                        <Card>
                          <img src={PF + "slise/slise1.png"} />
                        </Card>
                        <Card>
                          <img src={PF + "slise/slise2.png"} />
                        </Card>
                        <Card>
                          <img src={PF + "slise/slise3.jpg"} />
                        </Card>
                        <Card>
                          <img src={PF + "slise/slide4.jpg"} />
                        </Card>
                        <Card>
                          <img src={PF + "slise/slise5.png"} />
                        </Card>
                        <Card>
                          <img src={PF + "slise/slise6.jpg"} />
                        </Card>
                        <Card>
                          <img src={PF + "slise/slide4.jpg"} />
                        </Card>
                      </Carousel>
                    </div>
                    {/* <div className="carousel-slider">
                      <img width="65%" src={PF + "slise/slise1.png"} />
                    </div> */}
                  </div>
                </Col>
              )}
          </div>
        </div>
        {
          currentChat ? (
            <>
              <div className="chatOnline">
                <div className="chatRightWrapper">
                  {/* <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} /> */}
                  <div className="chatRightTop">
                    <div className="menuRight">
                      <div
                        style={{
                          width: "auto",
                        }}
                      >
                        <Button
                          type="primary"
                          onClick={toggleCollapsed}
                          style={{
                            marginBottom: 16,
                            marginTop: 12,
                          }}
                        >
                          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        </Button>
                        <Menu
                          defaultSelectedKeys={['1']}
                          defaultOpenKeys={['sub1']}
                          mode="inline"
                          theme="white"
                          inlineCollapsed={collapsed}
                          items={items}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="chatRightBottom"></div>
                </div>
              </div>
            </>
          ) : (
            <div />
          )}
      </div>
    </>
  )
}
