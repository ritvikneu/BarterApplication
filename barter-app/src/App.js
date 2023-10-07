import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; //Imported the react-router
import { Login } from './Components/Login/Login';
import { Register } from './Components/Registration/Register';
import { AuthContextProvider } from './Components/context/AuthContext';
// import { toast } from 'react-toastify';
import Dashboard from './Components/Dashboard/Dashboard';
import ProtectedRoute from './Components/firebase/ProtectedRoute.js';
// import 'react-toastify/dist/ReactToastify.css';
//Imported Toastify for notifications 

import user from './images/user.png'
import ChatsNotifications from "./Components/MyInbox/ChatsNotifications";
import NewPostPageOne from "./Components/PostNew/NewPostPageOne";
import NewHaveServiceRegistrationForm from "./Components/PostNew/NewHaveServiceRegistrationForm";
import MyHavesMyNeeds from "./Components/MyHavesOrNeeds/MyHavesMyNeeds";
import CanvasPage from "./Components/Dashboard/CanvasPage";
import NewHaveGoodRegistrationForm from "./Components/PostNew/NewHaveGoodRegistrationForm";
import NewNeedServiceRegistrationForm from "./Components/PostNew/NewNeedServiceRegistrationForm";
import NewNeedGoodRegistrationForm from "./Components/PostNew/NewNeedGoodRegistrationForm";
import GoodDetails from "./Components/Dashboard/GoodDetails";
import HaveComponent from './Components/Dashboard/HaveComponent';
import ServiceDetails from "./Components/Dashboard/ServiceDetails"
import TradeRequestMyHaves from "./Components/Trade/TradeRequestMyHaves";
import TradeRequestMyNeeds from "./Components/Trade/TradeRequestMyNeeds"
import UserProfile from "./Components/UserProfile/UserProfile";
import EditProfile from "./Components/UserProfile/EditProfile";
import Chatroom from "./Components/Chat/Chatroom";
import TradePageOne from "./Components/Trade/TradePageOne";
import TradeGoodDetails from "./Components/Trade/TradeGoodDetails";
import Metrics from './Components/Dashboard/Metrics';

// import { AuthProvider } from './Components/firebase/auth';
// import PrivateRoute from './Components/Login/Privateroute';


// function App() {
//   const [currentForm, setCurrentForm] = useState('login');   /* Creating a new state which will hold the value of the form being displayed , by default the value is set to login  */

//   const toggleForm = (formName) => {
//     setCurrentForm(formName);     /* To toggle between the two forms */
//   }

function App() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const handleFormSwitch = () => {
    setIsLoginFormVisible(prevValue => !prevValue);
  };


  return (
    <AuthContextProvider>
      <div >

        <BrowserRouter>     { /* A BrowserRouter stores the current location in the browser's address bar using clean URLs and navigates using the browser's built-in history stack. */}


          <Routes>
            {/* <Route path='/LandingPage' element = {<LandingPage/>}></Route> */}
            {/* <Route path='/dashboard/goodDetails/TradeRequestMyHaves' element={<ProtectedRoute>< TradeRequestMyHaves /> </ProtectedRoute>}></Route> */}
            <Route path='/' element={<Login />} ></Route>   Adding routes and components in the routes
            <Route path='/register' element={<Register />} ></Route>
            <Route path='/MyInbox' element={<ChatsNotifications />}></Route>
            <Route path='/dashboard/PostNew' element={<ProtectedRoute> <NewPostPageOne />  </ProtectedRoute>}></Route>
            <Route path='/dashboard/PostNew/NewHaveServiceForm' element={<ProtectedRoute> <NewHaveServiceRegistrationForm />  </ProtectedRoute>}></Route>
            <Route path='/dashboard/MyHavesMyNeeds' element={<MyHavesMyNeeds />}></Route>
            <Route path='/CanvasPage' element={<CanvasPage />}></Route>
            <Route path='/dashboard/serviceDetails' element={<ServiceDetails />}></Route>
            <Route path='/dashboard/PostNew/NewHaveGoodForm' element={<ProtectedRoute> <NewHaveGoodRegistrationForm />  </ProtectedRoute>}></Route>
            <Route path='/dashboard/PostNew/NewNeedServiceForm' element={<ProtectedRoute> <NewNeedServiceRegistrationForm />  </ProtectedRoute>}></Route>
            <Route path='/dashboard/PostNew/NewNeedGoodForm' element={<ProtectedRoute> <NewNeedGoodRegistrationForm />  </ProtectedRoute>}></Route>
            <Route path='/dashboard/goodDetails' element={<GoodDetails />}></Route>
            <Route path='/dashboard/MyHavesMyNeeds/goodDetails' element={<ProtectedRoute><GoodDetails /><TradePageOne></TradePageOne></ProtectedRoute> }></Route>
            <Route path='/dashboard/MyHavesMyNeeds/serviceDetails' element={<ProtectedRoute><ServiceDetails /><TradePageOne></TradePageOne></ProtectedRoute> }></Route>
            <Route path='/dashboard/goodDetails/TradeRequestMyHaves' element={<ProtectedRoute>< TradeRequestMyHaves /> </ProtectedRoute>}></Route>
            <Route path='/dashboard/serviceDetails/TradeRequestMyHaves' element={<ProtectedRoute>< TradeRequestMyHaves /> </ProtectedRoute>}></Route>
            <Route path='/dashboard/serviceDetails/TradeRequestMyNeeds' element={<ProtectedRoute>< TradeRequestMyNeeds /> </ProtectedRoute>}></Route>
            <Route path='/dashboard/goodDetails/TradeRequestMyNeeds' element={<ProtectedRoute>< TradeRequestMyNeeds /> </ProtectedRoute>}></Route>
            <Route path='/dashboard/UserProfile' element={<ProtectedRoute>< UserProfile /></ProtectedRoute>}></Route>
            <Route path='/dashboard/UserProfile/EditProfile' element={<EditProfile />}></Route>
            <Route path='/dashboard/Chatroom' element={<Chatroom />}></Route>
            <Route path='/MyHavesMyNeeds/TradeGoodDetails' element={<ProtectedRoute><TradeGoodDetails /></ProtectedRoute>}></Route>
            <Route path='/dashboard/Metrics' element={<ProtectedRoute><Metrics /></ProtectedRoute>}></Route>

            <Route path='/dashboard'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>

          </Routes>

        </BrowserRouter>

      </div>
    </AuthContextProvider>
  );
}

export default App;
