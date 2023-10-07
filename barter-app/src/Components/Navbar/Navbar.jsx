import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";
import React, { useState } from 'react';

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  function toggleNavbar() {
    setShowNavbar(!showNavbar);
  }
  

    return (
        <>
    <nav className="nav">
       
    <button className='MenuButton' onClick={toggleNavbar}>
        {/* <img  src="./Images/menu.png" alt="" /> */} Dashboard
    </button>
        <a href="/dashboard" className= "HomePage"> BARTER APP </a>
        <ul>
            {/* <li>
                <a href="/dashboard/PostNew"> Add </a>
                </li>
                <li>
                <a href="/dashboard/MyHavesMyNeeds"> My Haves and Needs </a>
                </li>
                <li>
                <a href="dashboard/ChatRoom"> Forum </a>
                </li>
                <li>
                <a href="/MyInbox"> Inbox </a>
                </li>
                <li>
                <a href="/dashboard/UserProfile"> My Profile  </a>
            </li> */}
            <li>
                <button onClick={handleLogout} className="Logoutbtn">
          {/* <img src="./Images/logout.png" alt="" /> */} Logout
        </button>
            </li>

        </ul>
    </nav>
    <div className={`SideNavbar ${showNavbar ? 'show' : ''}`}>
      
    <img style={{height: '120px', width: '200px'}} src="./FinalLogo.png" alt="" />
        <a href="/dashboard" className= "HomePage">
            
             Home </a>
        <ul>
            <li>
                <a href="/dashboard/PostNew"> Post New </a>
                </li>
                <li>
                <a href="/dashboard/MyHavesMyNeeds"> My Haves and Needs </a>
                </li>
                <li>
                <a href="dashboard/ChatRoom"> Forum </a>
                </li>
                <li>
                <a href="/MyInbox"> Inbox </a>
                </li>
                <li>
                <a href="/dashboard/UserProfile"> My Profile  </a>
                </li>
                <li>
                    <a href="/dashboard/Metrics"> Statistics </a>
                </li>
            {/* <li>
                <button onClick={handleLogout} className="Logoutbtn">
          <img src="./Images/logout.png" alt="" />
        </button>
            </li> */}

        </ul>
        </div>
   
    </>
    );
    }

export default Navbar;