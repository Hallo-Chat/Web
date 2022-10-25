import "./online.css"
import { Checkbox } from 'antd';
import React from 'react';

export default function Online({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img className="rightbarProfileImg" src={PF + user.profilePicture} alt="" />
      </div>
      <span className="rightbarUsername">
        {user.username}
      </span>
      <div className="checkBoxFri">
        <Checkbox onChange={onChange}></Checkbox>
      </div>
    </li>
  )
}
