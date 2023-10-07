import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './TradePageOne.css'
const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function Product({ title, description, username, quantity, img,onTrade, btnId, type }) {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                    
            }}
        >
            <Grid container spacing={2} className="product-grid">
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src={img} />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {title}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {quantity}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" color="success" id={type + btnId} onClick={onTrade} >
                                Trade
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            {username}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}



// function Product({ name, description, price, onTrade, btnId, type, title }) {
//     return (
//         <div style={{ border: '1px solid gray', padding: 10, margin: 10 }}>
//             <h2>Title: {title}</h2>
//             <h2>User: {name}</h2>
//             <p>{description}</p>
//             <p>Price: {price}</p>
//             <button id={type + btnId} onClick={onTrade}>Accept for Trade</button>
//         </div>
//     );
// }

function TradePageOne() {
    const haveId = localStorage.getItem("haveId");
    const goodId = localStorage.getItem("goodId");
    const serviceId = localStorage.getItem("serviceId");
    const needId = localStorage.getItem("needId");
    const type = localStorage.getItem("type");



    const haveState = useSelector((state) => state.haveReducer);
    const needState = useSelector((state) => state.needReducer);


    const [goodOrServ, setGoodorServ] = useState([]);
    const [customerProducts, setCustomerProducts] = useState([{ "_id": "643b4e4ea22cca8bf075d70a", "userId": "6439f2fcab3d24d9e0b32786", "goodId": "643b4e4ea22cca8bf075d708", "advertFlag": false, "title": "Phone", "image": "http://res.cloudinary.com/dqdojffsu/image/upload/v1681608236/svgmsvkj7dm6rcrww8es.png", "username": "zzz", "__v": 0 }, { "_id": "643b4e56a22cca8bf075d70e", "userId": "6439f2fcab3d24d9e0b32786", "goodId": "643b4e55a22cca8bf075d70c", "advertFlag": false, "title": "Phone", "image": "http://res.cloudinary.com/dqdojffsu/image/upload/v1681608269/uj71yw780w65lpcpqgor.png", "username": "zzz", "__v": 0 }]);



    const [requestTab, setRequestTab] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        if (type === "have") {
            const url = `http://localhost:7777/barterRequests/haveHeaderId/${haveId}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                response.json().then((data) => {
                    setRequestTab(data);
                    console.log(requestTab)
                    setIsLoading(false); // set isLoading to false after completing the API call

                    console.log(requestTab);
                });
            }).catch((error) => {
                console.error(error);
            });
        } else {
            const url = `http://localhost:7777/barterRequests/needHeaderId/${needId}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((response) => {
                response.json().then((data) => {
                    setRequestTab(data);
                    setIsLoading(false); // set isLoading to false after completing the API call
                    console.log(requestTab);
                });
            }).catch((error) => {
                console.error(error);
            });

        }
    }, [isLoading]);

    useEffect(() => {
        if (requestTab && type === "have") {
            const goodOrServArr = [];
            if (requestTab.item1Id) {
                const item1 = haveState && haveState.havesList.have && haveState.havesList.have.find(item => item._id === requestTab.item1Id);
                if (item1) {
                    goodOrServArr.push(item1);
                    console.log("Item 1");
                }
            }
            if (requestTab.item2Id) {
                const item2 = haveState && haveState.havesList.have && haveState.havesList.have.find(item => item._id === requestTab.item2Id);
                if (item2) {
                    goodOrServArr.push(item2);
                    console.log("Item 2");
                }
            }
            if (requestTab.item3Id) {
                const item3 = haveState && haveState.havesList.have && haveState.havesList.have.find(item => item._id === requestTab.item3Id);
                if (item3) {
                    goodOrServArr.push(item3);
                    console.log("Item 3");
                }
            }
            setGoodorServ(goodOrServArr);
            console.log(goodOrServArr);
        }
        if (requestTab && type === "need") {
            const goodOrServArr = [];
            if (requestTab.item1Id) {
                const item1 = needState && needState.needList.need && needState.needList.need.find(item => item._id === requestTab.item1Id);
                if (item1) {
                    goodOrServArr.push(item1);
                    console.log("Item 1");
                }
            }
            if (requestTab.item2Id) {
                const item2 = needState && needState.needList.need && needState.needList.need.find(item => item._id === requestTab.item2Id);
                if (item2) {
                    goodOrServArr.push(item2);
                    console.log("Item 2");
                }
            }
            if (requestTab.item3Id) {
                const item3 = needState && needState.needList.need && needState.needList.need.find(item => item._id === requestTab.item3Id);
                if (item3) {
                    goodOrServArr.push(item3);
                    console.log("Item 3");
                }
            }
            setGoodorServ(goodOrServArr);
            console.log(goodOrServArr);
        }
    }, [requestTab, type, haveState.havesList.have]);
    // }, [goodOrServ]);
    const handleTrade = (tradeAcceptedProduct) => {
        console.log(`Performing trade with ${tradeAcceptedProduct.name}`);

        const tradedId = tradeAcceptedProduct._id; //
        let requestData = { "tradedItemId": tradedId };
        // Patch the data :
        console.log(`http://localhost:7777/barterRequests/${requestTab._id}`)
        fetch(`http://localhost:7777/barterRequests/${requestTab._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
            .then(response => response.json())
            .then(data2 => {
                console.log('Updated REQUEST Table with tradedId:', data2);
                // Clear updated values
            })
            .catch(error => {
                console.error('Error updating request:', error);
            });




        if (type === "have") {
            //TP - Trade Performed; TA - Trade Accepted
            //request table has requestId and tradedId
            //haves table has haveId and tradeId
            //By passing requestId as haveId(haves table) update tradedId for field tradeId(haves table)
            //update trade performed on item in HAVES table with tradeid = tradedId
            let updTP = { "tradeId": tradedId, "advertFlag": true };
            fetch(`http://localhost:7777/barterHaves/${requestTab.requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updTP)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Updated Haves(Trade Performaed); tradeId updated with tradedId(requests table):', data);

                })
                .catch(error => {
                    console.error('Error updating request:', error);
                });

            //update trade accepted have with requestId of request table
            let updTA = { "tradeId": requestTab.requestId, "advertFlag": true };
            fetch(`http://localhost:7777/barterHaves/${tradedId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updTA)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Updated Haves(Trade Accepted); tradeId updated with requestId(requests table):', data);

                })
                .catch(error => {
                    console.error('Error updating request:', error);
                });

            // ---INNER API CALL ----
            console.log('Hitting FINAL-Email endpoint!');
            fetch('http://localhost:7777/final-email/finalEmailId/vrajreshamdalal@gmail.com', {
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
        if (type === "need") {
            //TP - Trade Performed; TA - Trade Accepted
            //request table has requestId and tradedId
            //haves table has haveId and tradeId
            //By passing requestId as haveId(haves table) update tradedId for field tradeId(haves table)
            //update trade performed on item in HAVES table with tradeid = tradedId
            let updTP = { "tradeId": tradedId, "advertFlag": true };
            fetch(`http://localhost:7777/barterNeeds/${requestTab.requestId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updTP)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Updated Needs(Trade Performaed); tradeId updated with tradedId(requests table):', data);

                })
                .catch(error => {
                    console.error('Error updating request:', error);
                });

            //update trade accepted have with requestId of request table
            let updTA = { "tradeId": requestTab.requestId, "advertFlag": true };
            fetch(`http://localhost:7777/barterNeeds/${tradedId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updTA)
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Updated Needs(Trade Accepted); tradeId updated with requestId(requests table):', data);

                })
                .catch(error => {
                    console.error('Error updating request:', error);
                });

            // ---INNER API CALL ----
            console.log('Hitting FINAL-Email endpoint!');
            fetch('http://localhost:7777/final-email/finalEmailId/vrajreshamdalal@gmail.com', {
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



    };



    return (
        <div>
            {/*<Navbar className="NavbarD" fixed="top" />*/}

            {/* title, description, username, quantity, img */}
            <div class="center">
            <h2 class="my-class">Requests</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {goodOrServ.map((product, index) => (
                    <Product
                        key={index}
                        title={product.title}
                        description={product.description}
                        username={product.username}
                        quantity={product.quantity}
                        img={product.image}
                        btnId={product._id}
                        type={type}
                        onTrade={() => handleTrade(product)}
                    />
                ))}
            </div>
           <ToastContainer/>
        </div>

    );
}

export default TradePageOne;
