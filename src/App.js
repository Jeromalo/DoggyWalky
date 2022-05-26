import './App.css';
import { createTheme } from '@mui/material/styles';
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/profiletestback';
import useToken from './components/useToken';
import Logout from './components/Logout';
import Chat from './components/Chat';
import UserProfil from './components/UserProfil';
// import SplashScreen from "./components/SplashScreen";
import DogWalk from "./components/DogWalk";
import Contacts from "./components/Contacts";
import ContactProfil from "./components/ContactProfil";
import AddDog from "./components/AddDog.js";
import Homepage from "./components/Homepage";
import Settings from "./components/Settings";
import PropagateLoader from "react-spinners/PropagateLoader";
import Chatdemo from './components/Chatdemo';
import EditDog from './components/EditDog';
import EditProfile from './components/EditProfile';
import Password from './components/Password';
import "./components/Splashscreen.css";



const theme = createTheme({
  palette: {
    primary: {
      main: '#26254D',
    },
    secondary: {
      main: '#A1A1DD',
    }
  }
}
)

function App() {
  const { token, removeToken, setToken } = useToken();
  const [room, setRoom] = useState(1);

  const handleRoom = (i) => {
    setRoom(i)
}

  useEffect(() => {
    console.log(room)
  }, []);


  return (
    
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<SplashScreen />} /> */}

            
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login setToken={setToken} token={token} />} />
            <Route path="/profile" element={<Profile token={token} />} />
            <Route path="/password" element={<Password />} />
            
            <Route path="/homepage" element={<Homepage token={token} room={room} handleRoom={handleRoom}/>} />

            <Route exact path="/editProfile" element={<EditProfile />} />
            <Route path="/userprofil" element={<UserProfil />} />
            
            <Route path="/contacts" element={<Contacts />} />
            <Route exact path="/contactprofil" element={<ContactProfil />} />
            
            <Route path="/settings" element={<Settings />} />

            <Route path="/chat" element={<Chat token={token} room={room}/>} />
            <Route path="/chatdemo" element={<Chatdemo />} />
            
            <Route path="/dogwalk" element={<DogWalk />} />
            
            <Route exact path="/adddog" element={<AddDog />} />
            <Route exact path="/editdog" element={<EditDog />} />

            <Route path="/logout" element={<Logout removeToken={removeToken} token={token} />} />
          </Routes>
        </BrowserRouter>
      )
}

export default App;
