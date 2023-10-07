import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Details } from './Details';
import { DetailsServ } from './DetailsServ';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import TradeRequestMyHaves from "../Trade/TradeRequestMyHaves";
import Modal from '@mui/material/Modal';
import TradeRequestMyNeeds from '../Trade/TradeRequestMyNeeds';
//import { useRoute } from '@react-navigation/native';

const ServiceDetails = () => {
  const [service, setservice] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  let objId = localStorage.getItem("serviceId");
  let type = localStorage.getItem("type");
  const navigate = useNavigate();

  const setRequestHeader = (header) => {
    localStorage.setItem("requestHeader", header);
    console.log("requestHeader : ", header)

  }
  setRequestHeader(objId);
  useEffect(() => {
    if (objId) {
      const url = `http://localhost:7777/barterServices/${objId}`;
      axios.get(url)
        .then(response => {
          console.log('Fetched service:', response.data);
          setservice(response.data);
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
    if(localStorage.getItem("type")=== "have") {
      console.log("in have");
      navigate("TradeRequestMyHaves");
    } else if(localStorage.getItem("type")=== "need") {
      //setRequestHeader(headerId);
      console.log("in neeed");
      navigate("TradeRequestMyNeeds");
    }  };

  if (!service) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    category,
    skill_level,
    duration,
    value
  } = service;

  const handleTradeClick = () => {
    setShowForm(true);
  };

  return (
    <>
     {/* <Navbar className="NavbarD" fixed="top" /> */}
    <div>
    <DetailsServ service={service} title={title} type="SERVICE"/>
      {/*<button onClick={handleMoreDataRequest}>Request More Data</button>*/}
      <br/>

      <hr />

      {(window.location.pathname == "/dashboard/goodDetails" || window.location.pathname == "/dashboard/serviceDetails" )&& (
        < div className={"tradeDiv-trade"}>
          <button id="animated-button" className={"trade-Button"} onClick={handleTradeClick}>Trade</button>
        </div>
      )}

      {showForm &&  type ==="have" &&(
        <Modal
          open={showForm}
          onClose={() => setShowForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <TradeRequestMyHaves></TradeRequestMyHaves>

        </Modal>

      )}
          {showForm &&  type ==="need" &&(
        <Modal
          open={showForm}
          onClose={() => setShowForm(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"

        >
          <TradeRequestMyNeeds></TradeRequestMyNeeds>

        </Modal>

      )}
    </div>
    </>
  );
};

export default ServiceDetails;
