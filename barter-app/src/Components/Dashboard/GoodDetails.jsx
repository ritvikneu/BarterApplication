
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Details } from './Details';
import { useNavigate } from 'react-router-dom';
import TradePageOne from "../Trade/TradePageOne";
import TradeRequestMyHaves from "../Trade/TradeRequestMyHaves";
// import BlurForm from "../Trade/BlurForm";
import Navbar from "../Navbar/Navbar";
import Modal from '@mui/material/Modal';
import TradeRequestMyNeeds from '../Trade/TradeRequestMyNeeds';
const GoodDetails = () => {
  const [good, setGood] = useState(null);
  const [showForm, setShowForm] = useState(false);

  let objId = localStorage.getItem("goodId");
  let type = localStorage.getItem("type");
  const navigate = useNavigate();

  const setRequestHeader = (header) => {
    localStorage.setItem("requestHeader", header);
    console.log("requestHeader : ", header)

  }


  setRequestHeader(localStorage.getItem("haveId"));
  useEffect(() => {


    if (objId) {
      const url = `http://localhost:7777/barterGoods/${objId}`;
      axios.get(url)
        .then(response => {
          console.log('Fetched service:', response.data);
          setGood(response.data);
        })
        .catch(error => {
          console.error('Error fetching service:', error);
        });
    }
  }, [objId]);


  const handleMoreDataRequest = () => {
    // Implement your logic for handling the "Request More Data" button click here
  };

  const handleTradeButtonClick = () => {
    if (localStorage.getItem("type") === "have") {
      console.log("in have");
      navigate("TradeRequestMyHaves");
    } else if (localStorage.getItem("type") === "need") {
      //setRequestHeader(headerId);
      console.log("in neeed");
      navigate("TradeRequestMyNeeds");
    }

  };
  if (!good) {
    return <div>Loading this</div>;
  }


  const {
    image,
    title,
    description,
    category,
    brand,
    quantity,
    condition,
    username,
    address,
  } = good;


  const handleTradeClick = () => {
    setShowForm(true);
  };




  return (
    <div>
      {/*<div className={"Absolute-Center"}>*/}

      <Details good={good} title={title} anything="anything" type="GOODS" />
      {/*<button onClick={handleMoreDataRequest}>Request More Data</button>*/}
      {/*<button onClick={handleTradeButtonClick}>Trade</button>*/}

      <br />

      <hr />

      {(window.location.pathname == "/dashboard/goodDetails" || window.location.pathname == "/dashboard/serviceDetails" )&& (
        < div className={"tradeDiv-trade"}>
          <button id="animated-button" className={"trade-Button"} onClick={handleTradeClick}>Trade</button>
        </div>
      )}

      {/*<BlurForm />*/}
      {
        showForm && type === "have" && (
          <Modal
            open={showForm}
            onClose={() => setShowForm(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

          >
            <TradeRequestMyHaves></TradeRequestMyHaves>

          </Modal>

        )
      }
      {
        showForm && type === "need" && (
          <Modal
            open={showForm}
            onClose={() => setShowForm(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

          >
            <TradeRequestMyNeeds></TradeRequestMyNeeds>

          </Modal>

        )
      }
      {/*</div>*/}



    </div >

  );
};

export default GoodDetails;




