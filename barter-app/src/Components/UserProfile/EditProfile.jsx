import React, { useState } from "react";
import axios from "axios";
import './UserProfile.css';
import {useNavigate} from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function EditProfile() {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [editPassword, setEditPassword] = useState("");
    const [saveClicked, setSaveClicked] = useState(false);



    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setEditPassword(event.target.value);
    };

    const handleSaveClick = () => {
        // Call REST API to save changes
        const json = localStorage.getItem("user");
        console.log(json);
        const data = JSON.parse(json);
        console.log(data);
        const email=data.email;
        console.log('EMAIL=',email);


        if (email) {
            const url = `http://localhost:7777/barterUser/email/${email}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response)=> {
                console.log("User retrieved");
                console.log(response);
                response.json().then((data) => {
                    console.log(data);
                    setUserProfile(data);
                    console.log(userProfile);
                });
            }).catch((error) => {
                console.error(error);
            });
        }

        if(userProfile){
            const id={userProfile}.userProfile._id;
            userProfile.userName = username;
            userProfile.mobile = phone;
            userProfile.password = editPassword;
            console.log('New user profile');
            console.log(userProfile);
            const url = `http://localhost:7777/barterUser/${id}`;
            console.log('url');
            console.log(url);
            fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userProfile)
            }).then((response)=> {
                console.log("User Updated");
                console.log(response);
            }).catch((error) => {
                console.error(error);
            });
        }

        toast.success('Saved successfully!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const handleEditBack = async () => {
        navigate("../dashboard/UserProfile");
    };

    return (
        <>
         <Navbar className="NavbarD" fixed="top" />
        <div className="user-profile ">
            <h1 className={"MuiTypography-root"}>Edit My Profile</h1>
            <br />
            <form>
                <h2 className={"MuiTypography-root"}>
                    Username
                    <input className={"NewPostInput MuiTypography-root"} type="text" value={username} onChange={handleUsernameChange} />
                </h2>
                <br />
                <h2 className={"MuiTypography-root"}>Phone
                    <input className={"NewPostInput MuiTypography-root"} type="text" value={phone} onChange={handlePhoneChange} />
                </h2>
                <br />
                <h2 className={"MuiTypography-root"}>Password
                    <input className={"NewPostInput MuiTypography-root"} type="password" value={editPassword} onChange={handlePasswordChange} />
                </h2>
            </form>
            <br />
            <button className={"save-btn"} onClick={handleSaveClick}>Save</button>
            <button id="animated-button" onClick={handleEditBack}>Back</button>


            <br />
            <ToastContainer />
        </div>
        </>
    );
}

export default EditProfile;
