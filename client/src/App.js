import Login from "./pages/profile/login/Login";
import Register from "./pages/register/Register";
import Profile from "./pages/profile/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={user ? <Messenger /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Register />} />
        {/* <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />} /> */}
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path="/unRegister" element={!user ? <Register /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App;
