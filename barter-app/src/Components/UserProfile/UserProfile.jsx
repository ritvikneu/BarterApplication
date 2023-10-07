import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from '../Navbar/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserProfile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);
    const [totalHaves, setTotalHaves] = useState(0);
    const [totalNeeds, setTotalNeeds] = useState(0);
    const [showEmoji, setShowEmoji] = useState(false);

    const resetTimer = () => {
        setShowEmoji(false);
        toast.dismiss();
    }

    function detectInactivity() {
        let timeout = setTimeout(() => {
            setShowEmoji(true);
            toast('Stop  😴  Start Trading️ 🙂', { autoClose: false });
        }, 5000);
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keydown', resetTimer);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keydown', resetTimer);
        };
    }

    function tipsAnimation() {
        const timer = setTimeout(() => {
            toast.info('Ensure to add details and a photo for better trading');
        }, 5000);
        return () => {
            clearTimeout(timer);
        };
    }

    const json = localStorage.getItem("user");
    console.log(json);
    const data = JSON.parse(json);
    console.log(data);
    const email = data.email;

    if (email) {
        const url = `http://localhost:7777/barterUser/email/${email}`;
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
                console.log(userProfile);
            });
        }).catch((error) => {
            console.error(error);
        });
    }

    // useEffect(() => {
    //     const url = `http://localhost:7777/barterUser/${uid}`;
    //     const fetchUserProfile = async () => {
    //         const response = await fetch(url);
    //         const data2 = await response.json();
    //         console.log('Fetched service2:',data2);
    //         setUserProfile(data2);
    //     };
    //     fetchUserProfile();
    // }, []);

    useEffect(() => {
        const fetchHavesAndNeeds = async () => {
            const username = localStorage.getItem("userId").toString(); 



            const urlHaves = `http://localhost:7777/barterHaves/userId/${username}`;
            fetch(urlHaves, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
            response.json().then((data) => {
                console.log("###################",data);
                setTotalHaves(data.length);
            });
            }).catch((error) => {
                console.error(error);
            });
            
            const urlNeeds = `http://localhost:7777/barterNeeds/userId/${username}`;
            fetch(urlNeeds, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
            response.json().then((data) => {
                console.log("###################",data);
                setTotalNeeds(data.length);
            });
            }).catch((error) => {
                console.error(error);
            });
            

        };
        fetchHavesAndNeeds();
        // tipsAnimation();
        detectInactivity();



    }, [1]);

    const handleEditProfile = () => {
        navigate("EditProfile");
    };
    const handleBack = async () => {
        navigate("../dashboard");
    };

    if (!userProfile) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <>
            <Navbar className="NavbarD" fixed="top" />
            <div className="user-profile">
                <div className="user-info-space">
                    <h1 className={"MyFontFamily"}>My Profile</h1>
                    <button className="profile-edit-btn" onClick={handleEditProfile}>Edit Profile</button>
                </div>


                <div className="user-info">
                    <img src="../blank-profile-picture-973460__340.png" alt="Profile" className="profile-icon" />
                    <h2 className="h1Padding ">{userProfile.userName}</h2>
                </div>
                <div className="user-info"> <p className={"MuiTypography-root"}><strong>Email:</strong> {userProfile.email}</p></div>
                <div className="user-info"> <p className={"MuiTypography-root"}><strong>Phone:</strong> {userProfile.mobile}</p></div>
                <br />

                <div className="user-stats">
                    <div className="user-stat">
                        <span className="stat-number MuiTypography-root MyFontFamilty">{totalHaves}</span>
                        <span className="stat-label MuiTypography-root MyFontFamilty">Total Haves</span>
                    </div>
                    <div className="user-stat">
                        <span className="stat-number MuiTypography-root MyFontFamilty">{totalNeeds}</span>
                        <span className="stat-label MuiTypography-root MyFontFamilty">Total Needs</span>
                    </div>
                </div>
                <br />
                <button id="animated-button" className="back-btn" onClick={handleBack}>Back</button>
                <ToastContainer />
            </div>
        </>
    );
};

export default UserProfile;