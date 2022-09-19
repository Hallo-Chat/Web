import axios from "axios";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import "./register.css"
import {Link, useNavigate} from "react-router-dom"

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Password don't match !")
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      }
      try {
        await axios.post("auth/register", user);
        history.push("/login");
      }
      catch(err) {
        console.log(err);
      }
    }
  }

  return (
    <div className="login">
    <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">Hallo</h3>
            <span className="loginDesc">Connect with Hallo <br/> Connect with on the world</span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                  <input type="Text" className="loginInput" required ref={username} placeholder="Username"/>
                  <input type="Email" className="loginInput" required ref={email }placeholder="Email"/>
                  <input type="Password" className="loginInput" minLength="6"  required ref={password} placeholder="Password"/>
                  <input type="Password" className="loginInput" minLength="6"  required ref={passwordAgain} placeholder="Password Again"/>
                  <button className="loginButton" type="submit">Sign Up</button>
                  <Link to="/login">
                  <button className="loginRegisterButton">Log into Account</button>
                  </Link>
            </form>
        </div>
    </div>
</div>
  )
}
