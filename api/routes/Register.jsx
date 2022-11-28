import axios from "axios";
import { useContext, useRef } from "react";
import "./register.css"
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { Redirect } from 'react-router-dom';
import { authentication } from "./firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Button, notification } from 'antd';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext"

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const picture = useRef();
  const history = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('INPUT_PHONE_NUMBER');
  const [result, setResult] = useState('');
  const [user, setUser] = useState([]);
  const [fileList, setFileList] = useState([]);
  const { isFecthing, error, dispatch } = useContext(AuthContext);

  const openNotification = () => {
    notification.open({
      message: 'Verify',
      description:
        'Code SMS error',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    try {
      let src = file.url;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      }
      const image = new Image();
      image.src = src;
      const imgWindow = window.open(src);
      imgWindow?.document.write(image.outerHTML);
    }
    catch (e) {

    }
  };

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
    }, authentication);
  }

  const requestOTP = (e) => {
    e.preventDefault();
    console.log(phoneNumber);
    if (phoneNumber === "") return;
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setStep('VERIFY_OTP');
      })
      .catch((err) => {
        alert(err);
      });
  }

  const UpdateProfile = (e) => {
    e.preventDefault();
    console.log(fileList[0]);
    setStep('PROFILE');
  }

  const ValidateOtp = (e) => {
    e.preventDefault();
    if (otp === null) return;
    let confirmationResult = window.confirmationResult;
    console.log("yes", confirmationResult);
    confirmationResult.confirm(otp)
      .then((result) => {
        setUser(result.user);
        setStep('VERIFY_SUCCESS');
        alert("Register Success!");
      })
      .catch((err) => {
        alert(err);
      })
  }

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match !")
      alert("Password don't match'")
    } else {
      let formData = new FormData();
      const config = {
        header: { 'content-type': 'multipart/form-data' }
      }
      formData.append("file", fileList[0].originFileObj);
      const fileUpLoad = await axios.post("/auth/uploadfile", formData, config)
        .then(res => res);

      if (fileUpLoad.data.success) {
        const user = {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
          sdt: phoneNumber,
          profilePicture: "person/" + fileUpLoad.data.url,
        }
        try {
          const User = await axios.post("auth/register", user);
          //history.push("/unRegister");
          if (User != null) {
            await loginCall({ email: email.current.value, password: password.current.value }, dispatch);
          }
          else {
            alert("Register fail!");
            console.log("Fail");
          }
        }
        catch (err) {
          console.log(err);
        }
        alert("Register success!");
      }
      else {
        alert("Register fail!");
      }
    }
  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Hallo</h3>
          <span className="loginDesc">Connect with Hallo <br /> Connect with on the world</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <div>
              {step === 'INPUT_PHONE_NUMBER' &&
                <div style={{ marginTop: "80px" }}>
                  <PhoneInput
                    defaultCountry="VN"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber} />
                  <div id="recaptcha-container"></div>
                  <button style={{ marginBottom: "50px" }} className="btnSendCode" onClick={requestOTP}>Send OTP</button>
                  <Link to="/">
                    <button className="loginRegisterButton">Login into Account</button>
                  </Link>
                </div>
              }
              {step === 'VERIFY_OTP' &&
                <div>
                  <input className="inputVerify" type="text" placeholder={"Enter your OTP"}
                    onChange={(e) => { setOtp(e.target.value) }} />
                  <br /><br />
                  <button className="btnSendCode" onClick={ValidateOtp}>Verify</button>
                </div>
              }
              {step === 'VERIFY_SUCCESS' &&
                <div className="main">
                  <div className="avatar" style={{ marginLeft: "130px", marginTop: "60px" }}>
                    <ImgCrop onUploadFail rotate shape="round">
                      <Upload
                        listType="picture-card"
                        fileList={fileList}
                        onChange={onChange}
                        onPreview={onPreview}
                      >
                        {fileList.length < 1 && '+ Upload'}
                      </Upload>
                    </ImgCrop>
                    <h3>Choose Avatar</h3>
                  </div>
                  <button className="btnSendCode" onClick={UpdateProfile}>Next</button>
                </div>
              }
              {step === 'VERIFY_FAIL' &&
                openNotification
              }
              {step === 'PROFILE' &&
                <div>
                  <input style={{ marginBottom: "10px" }} type="Text" className="loginInput" required ref={username} placeholder="Username" />
                  <input style={{ marginBottom: "10px" }} type="Email" className="loginInput" required ref={email} placeholder="Email" />
                  <input style={{ marginBottom: "10px" }} type="Password" className="loginInput" minLength="6" required ref={password} placeholder="Password" />
                  <input style={{ marginBottom: "10px" }} type="Password" className="loginInput" minLength="6" required ref={passwordAgain} placeholder="Password Again" />
                  <button style={{ marginBottom: "10px" }} className="loginButton" type="submit">Sign Up</button>
                </div>
              }
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

// <form className="loginBox" onSubmit={handleClick}>
//             <input type="Text" className="loginInput" required ref={username} placeholder="Username" />
//             <input type="Email" className="loginInput" required ref={email} placeholder="Email" />
//             <input type="Password" className="loginInput" minLength="6" required ref={password} placeholder="Password" />
//             <input type="Password" className="loginInput" minLength="6" required ref={passwordAgain} placeholder="Password Again" />
//             <PhoneInput
//               sty
//               defaultCountry="VN"
//               placeholder="Enter phone number"
//               value={phoneNumber}
//               onChange={setPhoneNumber} />
//             {step === 'INPUT_PHONE_NUMBER' &&
//               <div>
//                 <input className="loginInput" required value={phoneNumber} type="number" onChange={(e) => { setPhoneNumber(e.target.value) }}
//                   placeholder="Phone Number" />
//                 <br /><br />
//                 <div id="recaptcha-container"></div>
//                 <button onClick={signin} className="loginInput">Send OTP</button>
//               </div>
//             }
//             {step === 'VERIFY_OTP' &&
//               <div>
//                 <input className="loginInput" type="text" placeholder={"Enter your OTP"}
//                   onChange={(e) => { setOtp(e.target.value) }} />
//                 <button onClick={ValidateOtp} className="loginButton">Sign Up</button>
//               </div>
//             }
//             {step === 'VERIFY_SUCCESS' &&
//               handleClick
//             }

//             {step === 'VERIFY_FAIL' &&
//               openNotification
//             }
//             <button className="loginButton" type="submit">Sign Up</button>
//             <Link to="/">
//               <button className="loginRegisterButton">Login into Account</button>
//             </Link>
//           </form>