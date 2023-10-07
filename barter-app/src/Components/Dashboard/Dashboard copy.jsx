import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import TempComponent from "./TempComponent";
import { GetAllNeeds, GetAllHaves } from "../../Services/api";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import Navbar from '../Navbar/Navbar';
import { getAllNeeds } from "../../Actions/NeedAction";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; //Imported the react-router
import { useDispatch, useSelector } from "react-redux";
import Container from 'react-bootstrap/Container';
import './Dashboard.css';
import { HaveActionType } from "../../Actions/HaveAction";
import MyHavesMyNeeds from "../MyHavesOrNeeds/MyHavesMyNeeds";
import HaveComponent from "./HaveComponent";
import NewPostPageOne from "../PostNew/NewPostPageOne";
import ChatsNotifications from "../MyInbox/ChatsNotifications";
import UserProfile from "../UserProfile/UserProfile";

import { useMatch, useResolvedPath } from "react-router-dom"


const mapStateToProps = state => ({
  haves1: {
    error: state.haveReducer.error,
    havesList: state.haveReducer.havesList,
  }
});

function Have_list() {
  const havesList = useSelector(state => state.havesList);
  const dispatch = useDispatch();
}


const Dashboard = (props) => {
  const haveState = useSelector(state => state.haveReducer);
  const userState = useSelector(state => state.userReducer);
  const { user, logout } = UserAuth();
  //const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getHaves } = props;
  const { getNeeds } = props;
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  const [haves, setHaves] = useState([]);
  const [needs, setNeeds] = useState([]);

  // const fetchHaves = async () => {

  // //useEffect(() => {
  //     console.log("qwerty")
  //     const response = getAll("barterHaves");
  //     setHavesAndNeeds(response);
  //     console.log(response); // <-- Add this line to log the fetched data
  //   // fetchHaves();
  // //}, []);
  // }
  const userLocal = localStorage.getItem("user");
    // console.log(userLocal);
    const userData = JSON.parse(userLocal);
    // console.log(userData);
    const email = userData.email;


  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
  if (userData.email) {
      const url = `http://localhost:7777/barterUser/email/${userData.email}`;
      fetch(url, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
      }).then((response) => {
          console.log("User retrieved");
          console.log(response);
          response.json().then((data) => {
              console.log(data);
              setUserProfile(data);
              // console.log(userProfile);
              localStorage.setItem("userId",userProfile._id);
              localStorage.setItem("userName",userProfile.userName);
          });
      }).catch((error) => {
          console.error(error);
      });
  }
  }, [userProfile])

  

  useEffect(() => {
    (async () => {
      try {
        getHaves('project').then((response) => {
          const data = response
          let myArray = [];
          myArray.push(data);
          setHaves(myArray)
          // console.log('heloooooooo', data.type)
        })

        getNeeds('project').then((response) => {
          const data = response
          let myArray = [];
          myArray.push(data);
          setNeeds(myArray)
          // console.log('heloooooooo', data.type)
        })
        // console.log("###### 0haveState: ",haveState);

        //console.log("###### 1haves : ",haves[0].have);

      } catch (error) {
        console.log(error)
      }
    })();
  }, [getHaves, getNeeds]);
  console.log(haveState);

  if (haveState.havesList.have) {
    haveState.havesList.have.map((haves => {
      <div className="Haves">
        <img src="" alt="" />

        <p className="HaveName" id={'Have_list'} value={Have_list}></p>
        <p className="Have_UserName"></p>

      </div>
    }));

  }

  return (
    <>

      <Navbar className="NavbarD" fixed="top" />
      <div>

        <Routes>
          <Route path="/" element={<HaveComponent />}></Route>
          <Route path="/dashboard/MyHavesMyNeeds" element={<MyHavesMyNeeds />}></Route>
          <Route path="'/dashboard/PostNew'" element={<NewPostPageOne />}></Route>
          <Route path="dashboard/groups" element={<Dashboard />}></Route>
          <Route path="/MyInbox" element={<ChatsNotifications />}></Route>
          <Route path="/MyProfile" element={<UserProfile />}></Route>
        </Routes>
      </div>

      <div className='max-w-[600px] mx-auto my-16 p-4'>
        <h1 className='text-2xl font-bold py-4'></h1>
        <p>User Email: {user && user.email}</p>
        <button onClick={handleLogout} className="border px-6 py-2 my-4">
          Logout
        </button>
      </div>
      {/* </Navbar> */}

      <div className="HaveNeedCards">


        {/* <HavesList/> */}

      </div>




    </>
  );

}
//export default Dashboard;


{/* <div>
      <h1>Projects List</h1>
      {haves.haveList.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div> */}

const mapDispatchToProps = dispatch => bindActionCreators({
  getHaves: GetAllHaves,
  getNeeds: GetAllNeeds
}, dispatch);



function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);