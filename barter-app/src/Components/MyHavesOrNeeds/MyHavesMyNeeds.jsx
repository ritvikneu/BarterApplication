import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { GetAllHaves, GetAllNeeds, login } from '../../Services/api';
import BasicCard from '../Dashboard/BookInfo';
import CustomCard from '../CustomComponent/CustomCard'


import './MyHavesMyNeeds.css';
import Navbar from '../Navbar/Navbar';
import { useNavigate } from "react-router-dom";

function MyHavesMyNeeds() {
    const [activeTab, setActiveTab] = useState('my-haves');
    const dispatch = useDispatch();
    const userState = useSelector(state => state.userReducer);
    const navigate = useNavigate();
    const [isObjChanged,setIsObjChanged] = useState(false);
    const haveState = useSelector((state) => state.haveReducer);
    const needState = useSelector((state) => state.needReducer);

    useEffect(() => {
        dispatch(GetAllHaves());
        dispatch(GetAllNeeds());
    }, [dispatch,isObjChanged]);

    // const user = localStorage.getItem("user");
    // // console.log(user);
    // const userData = JSON.parse(user);
    // // console.log(userData);
    // const email = userData.email;


    const userId = localStorage.getItem("userId");

    const [userHaves, setUserHaves] = useState([]);
    // const userHavefromState ="";
    useEffect(() => {
        if (haveState && haveState.havesList && haveState.havesList.have) {
            const userHavefromState = haveState && haveState.havesList.have.filter(item => item.userId === userId);
            if (userHavefromState)
                console.log(userHavefromState);
            setUserHaves(userHavefromState)

        }
    }, [haveState.havesList.have,isObjChanged])

    const [userNeeds, setUserNeeds] = useState([]);
    // const userneedfromState ="";
    useEffect(() => {
        if (needState && needState.needList && needState.needList.need) {
            const userNeedfromState = needState && needState.needList.need.filter(item => item.userId === userId);
            if (userNeedfromState)
                console.log(userNeedfromState);
            setUserNeeds(userNeedfromState)

        }
    }, [needState.needList.need,isObjChanged])

    const [requestTab, setRequestTab] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const url = `http://localhost:7777/barterRequests/`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            response.json().then((data) => {
                setRequestTab(data);
                // console.log(requestTab)
                setIsLoading(false); // set isLoading to false after completing the API call

                console.log(requestTab);
            });
        }).catch((error) => {
            console.error(error);
        });
    }, [isLoading]);


    // const [requestTradeHaves, setRequestTradeHaves] = useState({});

    // useEffect(() => {
    //     if (userHaves && requestTab) {
    //         const filteredData = requestTab.request.filter(item => (
    //                 item.tradedItemId !== null &&
    //                 // ( 
    //                     userHaves.some(have => have._id === item.requestId)
    //             //    || userNeeds.some(need => need._id === item.requestId) )
    //             ))
    //             ;
    //             console.log("filteredData");
    //             console.log(filteredData);
    //             setRequestTradeHaves(filteredData);
    //     }
    // }, []);

    // if (requestTradeHaves) {
    //     console.log("requestTradeHaves");
    //     console.log(requestTradeHaves);
    // }


    function handleTradeRequest(event) {
        // localStorage.setItem('myHMyN_Id',null);
        // localStorage.setItem('myHMyN_Id', event.target.value);
        // console.log(' seehere myHMyN_Id', event.target.value);
        navigate("./TradeGoodDetails");
    }

    function handleDeleteHave(id) {
        // localStorage.setItem('myHMyN_Id',null);
      //  const id = event.target.value;
     //   console.log('Card to be deleted : ', event.target.value);
        // Delete Request
        fetch(`http://localhost:7777/barterRequests/haveHeaderId/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log('Fetched request:', data._id);
                    fetch(`http://localhost:7777/barterRequests/${data._id}`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Deleted request:', data);
                            setIsObjChanged(!isObjChanged);

                            //setReminders(reminders.filter(reminder => reminder._id !== id));
                        })
                        .catch(error => {
                            console.error('Error deleting request:', error);
                            // setError('Error deleting request. Please try again later.');
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching request:', error);
                //setError('Error fetching request. Please try again later.');
            });
        // Delete Haves
        fetch(`http://localhost:7777/barterHaves/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted request:', data);
                setIsObjChanged(!isObjChanged);

            })
            .catch(error => {
                console.error('Error deleting request:', error);
                //setError('Error deleting request. Please try again later.');
            });
    }
    function deleteItem(type,event){
        if(type=='Need'){
            handleDeleteNeed(event);
        }
        if(type=='Have'){
            handleDeleteHave(event);
        }
        
    }
    function handleDeleteNeed(id) {
        // localStorage.setItem('myHMyN_Id',null);
        //console.log(event);
       // const id = event.target.value;
       // console.log('Card to be deleted : ', event.target.value);
        // Delete Request
        fetch(`http://localhost:7777/barterRequests/needHeaderId/${id}`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log('Fetched request:', data._id);
                    fetch(`http://localhost:7777/barterRequests/${data._id}`, {
                        method: 'DELETE'
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log('Deleted request:', data);
                            setIsObjChanged(!isObjChanged);

                            //setReminders(reminders.filter(reminder => reminder._id !== id));
                        })
                        .catch(error => {
                            console.error('Error deleting request:', error);
                            // setError('Error deleting request. Please try again later.');
                        });
                }
            })
            .catch(error => {
                console.error('Error fetching request:', error);
                //setError('Error fetching request. Please try again later.');
            });
        // Delete Haves
        fetch(`http://localhost:7777/barterNeeds/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted request:', data);
                setIsObjChanged(!isObjChanged);

            })
            .catch(error => {
                console.error('Error deleting request:', error);
                //setError('Error deleting request. Please try again later.');
            });
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
                           
                            {localStorage.setItem("type", "have")}
                            <Grid item xs={12}>
                                
                                <Grid container columnSpacing={28}> 

                                {userHaves && userHaves
                                        .filter((r) => r.advertFlag !== true)
                                        .map((r, index) => (
                                            
                                            <Grid item xs={4} >
                                                {/* <BasicCard
                                                    title={r.title} username={r.userID} clkId={`have${r._id}`}
                                                    goodId={r.goodId} serviceId={r.serviceId} haveId={r.haveId}
                                                    img={r.image} /> */}
                                                  <CustomCard
                                                    title={r.title}
                                                    clkId={`have${r._id}`}
                                                    goodId={r.goodId}
                                                    serviceId={r.serviceId}
                                                    createDate="September 14, 2016"
                                                    image={r.image}
                                                    estimatedValue={r.estimatedValue}
                                                    description={r.description}
                                                    username={r.userID}
                                                    isDashboard={false}
                                                    deleteItem= {deleteItem}
                                                    isType= 'Have'
                                                    id = {r._id}
                                                />
                                                
                                                
                                                {/* {localStorage.setItem('myHNType',"have")}
                                        {console.log('r=',r)} */}
                                                {/* <button value={r._id} className={"TradeRequestBtn"} onClick={handleTradeRequest}>Trade Request</button>
                                                <button value={r._id} className={"TradeRequestBtn"} onClick={handleDeleteHave}>Delete</button> */}
                                            </Grid>
                                        ))}
                                    
                                </Grid>
                            </Grid>




                        </div>
                    )}
                    {activeTab === 'my-needs' && (
                        <div className="my-needs">
                           
                            {localStorage.setItem("type", "need")}
                            <Grid item xs={12}>
                                <Grid container columnSpacing={28}>
                                    {userNeeds && userNeeds
                                            .filter((r) => r.advertFlag !== true)
                                            .map((r, index) => (
                                                <Grid item xs={4} >
                                                    {/* <BasicCard
                                                        title={r.title} username={r.userID} clkId={`need${r._id}`}
                                                        goodId={r.goodId} serviceId={r.serviceId}
                                                        img={r.image} /> */}
                                                    <CustomCard
                                                        title={r.title}
                                                        clkId={`need${r._id}`}
                                                        goodId={r.goodId}
                                                        serviceId={r.serviceId}
                                                        createDate="September 14, 2016"
                                                        image={r.image}
                                                        estimatedValue={r.estimatedValue}
                                                        description={r.description}
                                                        username={r.userID}
                                                        isDashboard={false}
                                                        deleteItem= {deleteItem}
                                                        isType= 'Need'
                                                        id = {r._id}
                                                        isMyTrade = {false}
                                                    />
                                                    
                                                </Grid>
                                            ))}
                                </Grid>
                            </Grid>

                        </div>
                    )}
                    {activeTab === 'my-trades' && (
  <div className="my-trades">
    
    <Grid item xs={12}>
      <Grid container spacing={4} style={{ justifyContent: 'space-around'}}>
        {userHaves && userNeeds && userHaves
          .concat(userNeeds)
          .filter((r) => r.advertFlag === true)
          .map((r, index) => (
            <Grid item xs={4} >
              <CustomCard
                title={r.title}
                clkId={`need${r._id}`}
                goodId={r.goodId}
                serviceId={r.serviceId}
                createDate="September 14, 2016"
                image={r.image}
                estimatedValue="$10"
                description="This impressive paella is a perfect party dish and a fun meal to cook"
                username={r.userID}
                isDashboard={false}
                deleteItem={deleteItem}
                isMyTrade={true}
                isHave={r.hasOwnProperty("goodId")}
              />
            </Grid>
          ))}
      </Grid>
    </Grid>
  </div>
)}

                    
                </div>
            </div>
        </>
    );
}

export default MyHavesMyNeeds;


// {activeTab === 'my-trades' && (
//     <div className="my-trades">
//         <h2>My Trades</h2>
//         <Grid item xs={12}>
//             <Grid container columnSpacing={1} >
//             {userHaves && userHaves
//                     .filter((r) => r.advertFlag === true).map((r, index) => (
//                         <Grid item xs={4} >
//                             {/* <BasicCard
//                                 title={r.title} username={r.userID} clkId={`need${r._id}`}
//                                 goodId={r.goodId} serviceId={r.serviceId}
//                                 img={r.image} /> */}
                            
//                             <CustomCard
//                                 title={r.title}
//                                 clkId={`need${r._id}`}
//                                 goodId={r.goodId}
//                                 serviceId={r.serviceId}
//                                 createDate="September 14, 2016"
//                                 image={r.image}
//                                 estimatedValue="$10"
//                                 description="This impressive paella is a perfect party dish and a fun meal to cook"
//                                 username={r.userID}
//                                 isDashboard={false}
//                                 deleteItem= {deleteItem}
//                                 isMyTrade = {true}
//                             />
                        
//                         </Grid>
//                     ))}
//                 {userNeeds && userNeeds
//                     .filter((r) => r.advertFlag === true).map((r, index) => (
//                         <Grid container item xs={4} >
//                             {/* <BasicCard
//                                 title={r.title} username={r.userID} clkId={`need${r._id}`}
//                                 goodId={r.goodId} serviceId={r.serviceId}
//                                 img={r.image} /> */}
//                             <CustomCard
//                                 title={r.title}
//                                 clkId={`need${r._id}`}
//                                 goodId={r.goodId}
//                                 serviceId={r.serviceId}
//                                 createDate="September 14, 2016"
//                                 image={r.image}
//                                 estimatedValue="$10"
//                                 description="This impressive paella is a perfect party dish and a fun meal to cook"
//                                 username={r.userID}
//                                 isDashboard={false}
//                                 isMyTrade = {true}
                                
//                             />       

//                             {/* <button className={"TradeRequestBtn"} onClick={handleTradeRequest}>Trade Request</button> */}
//                         </Grid>
//                     ))} 
//             </Grid>
//         </Grid>


//     </div>
// )}