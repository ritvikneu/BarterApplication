import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { GetAllHaves, GetAllNeeds, login } from '../../Services/api';
import BasicCard from '../Dashboard/BookInfo';

import './MyHavesMyNeeds.css';
import Navbar from '../Navbar/Navbar';
import {useNavigate} from "react-router-dom";

function MyHavesMyNeeds() {
    const [activeTab, setActiveTab] = useState('my-haves');
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userReducer);
    const navigate = useNavigate();

    const haveState = useSelector((state) => state.haveReducer);
    const needState = useSelector((state) => state.needReducer);

    useEffect(() => {
        dispatch(GetAllHaves());
        dispatch(GetAllNeeds());
    }, [dispatch]);

    const user = localStorage.getItem("user");
    // console.log(user);
    const userData = JSON.parse(user);
    // console.log(userData);
    const email = userData.email;

    const [userProfile, setUserProfile] = useState(null);
    // useEffect(() => {
    if (email) {
        const url = `http://localhost:7777/barterUser/email/${email}`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            // console.log("User retrieved");
            // console.log(response);
            response.json().then((data) => {
                // console.log(data);
                setUserProfile(data);
                // console.log(userProfile);
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    // }, [userProfile])

    const [userHaves, setUserHaves] = useState(null);
    const [userNeeds, setUserNeeds] = useState(null);
    

    // useEffect(() => {
    if (userProfile) {
        // console.log(userProfile._id);
        const urlHaves = `http://localhost:7777/barterHaves/userId/${userProfile._id}`;
        fetch(urlHaves, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            // console.log("User retrieved");
            // console.log(response);
            response.json().then((data) => {
                // console.log("USer Haves");
                setUserHaves(data);
                // console.log('userHAVES=',userHaves);
            });
        }).catch((error) => {
            console.error(error);
        });

        const urlNeed = `http://localhost:7777/barterNeeds/userId/${userProfile._id}`;
        fetch(urlNeed, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            // console.log("User retrieved");
            // console.log(response);
            response.json().then((data) => {
                // console.log("USer Needs");
                setUserNeeds(data);
                // console.log(userNeeds);
            });
        }).catch((error) => {
            console.error(error);
        });

    }
    // }, [userHaves])


    // useEffect(() => {
    //     dispatch(login(email))
    //         .then(() => {
    //         })
    //         .catch(() => {
    //             console.log("error");
    //         });
    // }, [])

    // if (userState) {
    //     // console.log(userState.user);
    // }

    function handleTradeRequest(event) {
        // localStorage.setItem('myHMyN_Id',null);
        localStorage.setItem('myHMyN_Id',event.target.value);
        console.log(' seehere myHMyN_Id',event.target.value);
        navigate("./TradeGoodDetails");
    }
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };
    // console.log(email);

    return (
        <>
        <Navbar className="NavbarD" fixed="top" />
        <div className="container">
            <div className="tab-box">
                <div
                    className={`tab ${activeTab === 'my-haves' ? 'active' : ''}`}
                    onClick={() => handleTabClick('my-haves')}
                >
                    My Haves
                </div>
                <div
                    className={`tab ${activeTab === 'my-needs' ? 'active' : ''}`}
                    onClick={() => handleTabClick('my-needs')}
                >
                    My Needs
                </div>
                <div
                    className={`tab ${activeTab === 'my-trades' ? 'active' : ''}`}
                    onClick={() => handleTabClick('my-trades')}
                >
                    My Trades
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'my-haves' && (
                    <div className="my-haves">
                        <h2>My Haves</h2>
                        {localStorage.setItem("type","have")}
                        <Container>
                            <Grid container spacing={2}>
                                {userHaves && userHaves.map((r, index) => (
                                    <Grid item xs={4} >
                                        <BasicCard
                                            title={r.title} username={r.userID} clkId={`have${r._id}`}
                                            goodId={r.goodId} serviceId={r.serviceId} haveId={r.haveId}
                                            img={r.image} />
                                        {/* {localStorage.setItem('myHNType',"have")}
                                        {console.log('r=',r)} */}
                                        <button value={r._id} className={"TradeRequestBtn"} onClick={handleTradeRequest}>Trade Request</button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </div>
                )}
                {activeTab === 'my-needs' && (
                    <div className="my-needs">
                        <h2>My Needs</h2>
                        {localStorage.setItem("type","have")}
                       
                        <Container>
                            <Grid container spacing={2}>
                                {userNeeds && userNeeds.map((r, index) => (
                                    <Grid item xs={4} >
                                        <BasicCard
                                            title={r.title} username={r.userID} clkId={`have${r._id}`}
                                            goodId={r.goodId} serviceId={r.serviceId}
                                            img={r.image} />
                                        {/* {localStorage.setItem('myHNType',"need")} */}
                                        <button haveId={r._id} needId={r._id} className={"TradeRequestBtn"} onClick={handleTradeRequest}>Trade Request</button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </div>
                )}
                 {activeTab === 'my-trades' && (
                    <div className="my-trades">
                        <h2>My Needs</h2>
                       
                        <Container>
                            <Grid container spacing={2}>
                                {userNeeds && userNeeds.map((r, index) => (
                                    <Grid item xs={4} >
                                        <BasicCard
                                            title={r.title} username={r.userID} clkId={`have${r._id}`}
                                            goodId={r.goodId} serviceId={r.serviceId}
                                            img="https://res.cloudinary.com/dqdojffsu/image/upload/v1680973001/lo4kmsp1wcshkvhdekoq.png" />
                                        <button className={"TradeRequestBtn"} onClick={handleTradeRequest}>Trade Request</button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default MyHavesMyNeeds;
