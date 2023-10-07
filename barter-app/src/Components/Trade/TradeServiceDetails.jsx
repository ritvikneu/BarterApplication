import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Details } from './Details';
import { DetailsServ } from './DetailsServ';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import TradePageOne from './TradePageOne';
//import { useRoute } from '@react-navigation/native';

const ServiceDetails = () => {
  
  let objId = localStorage.getItem("serviceId");

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


  if (!service) {
    return <div><h1>Loading Services Tag</h1></div>;
  }

  const {
    title,
    description,
    category,
    skill_level,
    duration,
    value
  } = service;

  return (
    <>
     {/* <Navbar className="NavbarD" fixed="top" /> */}
    <div>
    <DetailsServ service={service} title={title} type="SERVICE"/>
      <TradePageOne></TradePageOne>
    </div>
    </>
  );
};

export default ServiceDetails;
