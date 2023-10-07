import React, { useState, useEffect } from 'react';
import './TradeRequest.css';
import { useSelector, useDispatch } from 'react-redux'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const products = [
    'Product A',
    'Product B',
    'Product C',
    'Product D'
];

let itemSelected = null;
const TradeRequestMyNeeds = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const Needstate = useSelector(state => state.needReducer);
    // let myNeeds = null;


    const [myNeeds, setMyNeeds] = useState(null);
    const [userNeeds, setUserNeeds] = useState(null);

   const userId =  localStorage.getItem("userId");

   useEffect(() => {
    if (userId) {
        console.log(userId);
        const urlNeeds = `http://localhost:7777/barterNeeds/userId/${userId}`;
        fetch(urlNeeds, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response) => {
            console.log("User retrieved");
            console.log(response);
            response.json().then((data) => {
                console.log("USer Needs");
                setMyNeeds(data);
                console.log(myNeeds);
            });
        }).catch((error) => {
            console.error(error);
        });
        
    }
}, []);


    const request = () => {
        //console.log(Needstate);
        console.log(localStorage.getItem("type"));
        let type = localStorage.getItem("type");
        console.log(localStorage.getItem("requestHeader"));
        const headerId = localStorage.getItem("needId");
        let requestHeader = headerId;
        if (type === "need") {
            fetch(`http://localhost:7777/barterRequests/needHeaderId/${headerId}`)
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        console.log('Fetched request:', data);
                        let requestData = null;
                        if (data.count == 1) {
                            console.log("--------------> 1--------2");
                            requestData = { "item2Id": itemSelected, "count": 2 };
                            const curr_needId = data._id;
                            console.log(curr_needId)
                            // Patch the data :
                            console.log(`http://localhost:7777/barterRequests/${curr_needId}`)
                            fetch(`http://localhost:7777/barterRequests/${curr_needId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(requestData)
                            })
                                .then(response => response.json())
                                .then(data2 => {
                                    console.log('Updated REQUEST:', data2);
                                    // Clear updated values
                                })
                                .catch(error => {
                                    console.error('Error updating request:', error);
                                });

                            // ---INNER API CALL ----
                            console.log('Hitting Email endpoint!');
                            fetch('http://localhost:7777/send-email/emailId/vrajreshamdalal@gmail.com', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                                .then(respons2 => respons2.json())
                                .then(data2 => {
                                    console.log("Data from EMAIL=", data2);
                                    //props.onAdd(data); // pass the new data to the parent component
                                    // here
                                    console.log('Email endpoint HIT :)');
                                })
                                .catch(error => console.error(error));
                            // ---INNER API CALL ----

                            toast.success('Submitted successfully!', {
                                position: 'top-right',
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        }

                        else if (data.count == 2) {
                            console.log("--------------> 2--------3");
                            requestData = { "item3Id": itemSelected, "count": 3 };
                            const curr_needId = data._id;
                            console.log(curr_needId)
                            // Patch the data :
                            console.log(`http://localhost:7777/barterRequests/${curr_needId}`)
                            fetch(`http://localhost:7777/barterRequests/${curr_needId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(requestData)
                            })
                                .then(response => response.json())
                                .then(data2 => {
                                    console.log('Updated REQUEST:', data2);
                                    // Clear updated values
                                })
                                .catch(error => {
                                    console.error('Error updating request:', error);
                                });

                            // ---INNER API CALL ----
                            console.log('Hitting Email endpoint!');
                            fetch('http://localhost:7777/send-email/emailId/vrajreshamdalal@gmail.com', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            })
                                .then(respons2 => respons2.json())
                                .then(data2 => {
                                    console.log("Data from EMAIL=", data2);
                                    //props.onAdd(data); // pass the new data to the parent component
                                    // here
                                    console.log('Email endpoint HIT :)');
                                })
                                .catch(error => console.error(error));
                            // ---INNER API CALL ----

                            toast.success('Submitted successfully!', {
                                position: 'top-right',
                                autoClose: 2000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });

                        }

                        else {
                            window.alert("Request pool is full");
                        }

                    }
                    else {
                        const requestData = {
                            "requestId": requestHeader,
                            "requestType": "needs",
                            "needHeaderId": requestHeader,
                            "count": 1,
                            "item1Id": itemSelected
                        };

                        console.log('Request not there for this need, careting request for this need');
                        fetch('http://localhost:7777/barterRequests/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestData)
                        })
                            .then(response => response.json())
                            .then(data1 => {
                                console.log("data from server", data1);
                                //props.onAdd(data); // pass the new data to the parent component

                                // ---INNER API CALL ----
                                console.log('Hitting Email endpoint!');
                                fetch('http://localhost:7777/send-email/emailId/vrajreshamdalal@gmail.com', {
                                    method: 'GET',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                })
                                    .then(respons2 => respons2.json())
                                    .then(data2 => {
                                        console.log("Data from EMAIL=", data2);
                                        //props.onAdd(data); // pass the new data to the parent component
                                        // here
                                        console.log('Email endpoint HIT :)');
                                    })
                                    .catch(error => console.error(error));
                                // ---INNER API CALL ----

                                toast.success('Submitted successfully!', {
                                    position: 'top-right',
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                });
                            })
                            .catch(error => console.error(error));

                    }
                })
                .catch(error => {
                    console.error('Error fetching requests:', error);
                });


        }
    }

    // const [myNeeds, setMyNeeds] = useState(null);
    // let myNeeds = null;
    let objId = null;
    const needIds = [];
    useEffect(() => {
        objId = Needstate.need.goodId;
        //console.log(objId);
        const userId = localStorage.getItem("userId")
        fetch(`http://localhost:7777/barterNeeds/userId/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                myNeeds = data;
                console.log(myNeeds);
            })
            .catch(error => {
                console.error('Error fetching requests:', error);
            });
    }, []);

    const handleProductChange = (event) => {
        console.log('eventid=',event.target.id);
        console.log('eventid value=',event.target.value);
        itemSelected = event.target.value;
        setSelectedProduct(event.target.value);
    };

    return (
        <div className={"tradeDiv user-profile-trade MuiTypography-root"}>
        <div className={"tradeDivOne MuiTypography-root"}>
            <p>Please select your Need</p>
        </div>
        <div className={"tradeDivOne MuiTypography-root"}>

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">My Haves</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="product-dropdown"
                value={selectedProduct}
                label="My Needs"
                onChange={handleProductChange}
            >
                {myNeeds && myNeeds
                 .filter((r) => r.advertFlag === false).map((product, index) => (
                    <MenuItem key={product._id} value={product._id}>{product.title}</MenuItem>
                ))}
        </Select>
            </FormControl>
        </div>
        <br />
        <p>Start Trading</p>
        <div>
            <button  id="animated-button-green" onClick={request} className="requestBtn">
                Request
            </button>
        </div>
        <ToastContainer />
    </div>
    );

};

export default TradeRequestMyNeeds;
