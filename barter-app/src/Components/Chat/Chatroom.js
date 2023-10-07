import React, { useState, useEffect, useRef } from "react"
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { UserAuth } from '../context/AuthContext'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; 
import 'firebase/compat/firestore';
import './Chatroom.scss';
import userImg from '../../images/user.png';
import Navbar from '../Navbar/Navbar';
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'; //Imported the react-router
import { getAllUsers, login, getSingleHave, getSingleNeed } from "../../Services/api";
import SendIcon from '@mui/icons-material/Send';

const COLOR_MAP = {
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine",
  0: "zero"
}


firebase.initializeApp({
    apiKey: "AIzaSyCzp55aHFh3kIY14q7nTtqMZJSfIVWBp_o",
    authDomain: "barterapp-2793e.firebaseapp.com",
    projectId: "barterapp-2793e",
    storageBucket: "barterapp-2793e.appspot.com",
    messagingSenderId: "47896281177",
    appId: "1:47896281177:web:ab04f0594600f4ffcd3148",
    measurementId: "G-DF6PQZ1TV7"
  })
const auth = firebase.auth();
console.log("AUTHHHHHHH ------", auth)
// const firestore = firebase.firestore().settings({
//     experimentalForceLongPolling: true, // this line
//     useFetchStreams: false, // and this line
//   });
const firestore = firebase.firestore();

  console.log(firestore)
// const firestore = initializeFirestore(firebaseApp, {
//     experimentalForceLongPolling: true, // this line
//     useFetchStreams: false, // and this line
//   })

function ChatRoom() {
    const { user, logout } = UserAuth();
    const dummy = useRef();
    const messagesRef = firestore.collection('messages');
    // console.log(messagesRef)
    const query = messagesRef.orderBy('createdAt').limit(250);
  
    const [messages] = useCollectionData(query, { idField: 'id' });
  
    const [formValue, setFormValue] = useState('');
  
  
    const sendMessage = async (e) => {
      e.preventDefault();
      const userEmail  = user.email;
      console.log("FORM VALUE", formValue);
      console.log('Whats the user email', userEmail);
      await messagesRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userEmail
      });
      const new_data = messagesRef.orderBy('createdAt').limit(25);
      console.log("NEW DATA", new_data.limit(25));
  
      setFormValue('');
    }
  
    const scrollToBottom = () => {
      dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
  
    useEffect(() => {
      scrollToBottom()
    }, [messages]);
  
    return (<>
      <Navbar className="NavbarD" fixed="top" />
      <div className="FullChatSection">
      <div className="ChatWindow">
  
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
  
        <span key="span" ref={dummy}></span>
  
      </div>
  
      <div className="ChatFormDiv">
        <form className="ChatForm" onSubmit={sendMessage}>
  
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Type here ...." />
  
            <button type="submit" disabled={!formValue}>
              <SendIcon />
        </button>
  
      </form>
      </div>
        </div>
    </>)
  }
  
  
  function ChatMessage(props) {
    const { user, logout } = UserAuth();
    const { text, userEmail } = props.message;
    // console.log("GIVE ME USERNAMEEEEEEEEE", user);
    const messageClass = userEmail === user.email ? 'sent' : 'received';

  
    return (<>
      <div className={`message ${messageClass} `}>
        <div className={`align ${messageClass}`}>
          {/* <div className="Block"> */}
          <img src={userImg} alt="User" title={userEmail} className={COLOR_MAP[(userEmail.length)%10]}/>
          
            {/* <small className="username">{COLOR_MAP[(userEmail.length)%10]}</small> */}
          {/* </div> */}
        <p className="MsgText">{text}</p>
        </div>
        
      </div>
    </>)
  }

  export default ChatRoom;
  