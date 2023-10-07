import React, { useState, useEffect } from 'react';
import './TradeRequest.css';
import { useSelector, useDispatch } from 'react-redux'

const products = [
    'Product A',
    'Product B',
    'Product C',
    'Product D'
];

const TradeRequestUserHaves = () => {
    const [selectedProduct, setSelectedProduct] = useState(products[0]);
    const needState = useSelector(state => state.needReducer);

    const request = () => {
        //console.log(needState);
        console.log(localStorage.getItem("type"));
        let type = localStorage.getItem("type");
        console.log(localStorage.getItem("requestHeader"));
        let requestHeader = localStorage.getItem("requestHeader")
        if(type === "need")
        {
            fetch(`http://localhost:7777/barterRequests/needHeaderId/${requestHeader}`)
            .then(response => response.json())
            .then(data => {
            if (data) {
                console.log('Fetched request:', data);
                let requestData = null;
                if(data.count == 1){
                    console.log("--------------> 1--------2");
                    requestData = {"item2Id" : requestHeader, "count":2 };
                    const curr_haveId = data._id;
                    console.log(curr_haveId)
                    // Patch the data :
                     console.log(`http://localhost:7777/barterRequests/${curr_haveId}`)
                    fetch(`http://localhost:7777/barterRequests/${curr_haveId}`, {
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
                    
                }

                else if(data.count == 2){
                    console.log("--------------> 2--------3");
                    requestData = {"item3Id" : requestHeader, "count":3 };
                    const curr_haveId = data._id;
                    console.log(curr_haveId)
                    // Patch the data :
                     console.log(`http://localhost:7777/barterRequests/${curr_haveId}`)
                    fetch(`http://localhost:7777/barterRequests/${curr_haveId}`, {
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
                    
                }

                else {
                    window.alert("Request pool is full");
                }
                
            } 
              else {
                const requestData = {
                    "requestId": requestHeader,
                    "requestType": "needs", 
                    "needHeaderId" : requestHeader,
                    "count" : 1,
                    "item1Id" : requestHeader
                  };

                console.log('Request not there for this have, careting request for this have');
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
                })
                .catch(error => console.error(error));

            }
            })
            .catch(error => {
              console.error('Error fetching requests:', error);
            });  

            
        }
    }
    let objId = null;
    useEffect(() => {
    objId = needState.need.goodId;
    console.log(objId);
    


    }, [objId]);
    


    const handleProductChange = (event) => {
        setSelectedProduct(event.target.value);
    };

    return (
        <div className={"tradeDiv"}>
            <div className={"tradeDivOne"}>
                <h1><strong>Product Title</strong></h1>
            </div>
            <div className={"tradeDivOne"}>
                <h1> Users Haves </h1>
            </div>
            <div className={"tradeDivOne"}>
                <select id="product-dropdown" value={selectedProduct} onChange={handleProductChange}>
                    {products.map((product) => (
                        <option key={product} value={product}>{product}</option>
                    ))}
                </select>
            </div>
            <div>
                <button onClick={request} className="requestBtn">
                    Request
                </button>
            </div>
        </div>
    );
};

export default TradeRequestUserHaves;
