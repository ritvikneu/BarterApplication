import React, { useState, useEffect } from 'react';
import Navbar from "../Navbar/Navbar";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
// import ComplexGrid from './../Requests/RequestGrid';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';


const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

function Product({ name, description, price, onTrade }) {
    return (
        <div style={{ border: '1px solid gray', padding: 10, margin: 10 }}>
            <h2>{name}</h2>
            <p>{description}</p>
            <p>Price: {price}</p>
            <button onClick={onTrade}>Perform Trade</button>
        </div>
    );
}

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


    const handleTrade = (product) => {
        console.log(`Performing trade with ${product.name}`);
        // TODO: Implement trade logic
    };

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
    }, [requestTab, type, haveState.havesList.have]);
    // }, [goodOrServ]);



    return (
        // <div>
        //     {/*<Navbar className="NavbarD" fixed="top" />*/}

        //     <ComplexGrid></ComplexGrid>
        //     <h2>Customer Products</h2>
        //     <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        //         {goodOrServ.map((product, index) => (
        //             <Product
        //                 key={index}
        //                 title={product.title}
        //                 name={product.username}
        //                 price={product._id}
        //                 onTrade={() => handleTrade(product)}
        //             />
        //         ))}
        //     </div>
        // </div>
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
            <Grid container spacing={2}>
                <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                        <Img alt="complex" src="/static/images/grid/complex.jpg" />
                    </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                Standard license
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                Full resolution 1920x1080 • JPEG
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ID: 1030114
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ cursor: 'pointer' }} variant="body2">
                                Remove
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                            $19.00
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>


    );
}

export default TradePageOne;
