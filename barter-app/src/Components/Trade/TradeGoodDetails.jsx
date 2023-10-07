
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Details } from '../Dashboard/Details';
import { useNavigate } from 'react-router-dom';
import TradePageOne from "./TradePageOne";
const TradeGoodDetails = () => {
  const [good, setGood] = useState(null);

  let objId = localStorage.getItem("goodId");

  useEffect(() => {
    if (objId) {
      const url = `http://localhost:7777/barterGoods/${objId}`;
      axios.get(url)
        .then(response => {
          console.log('Fetched goods:', response.data);
          setGood(response.data);
        })
        .catch(error => {
          console.error('Error fetching goods:', error);
        });
    }
  }, [objId]);


  if (!good) {
    return <div><h1>Loading Goods Tag</h1></div>;
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

  return (
    <div>
      <Details good={good} title={title} type="GOODS" />
      <TradePageOne></TradePageOne>
    </div>
  );
};

export default TradeGoodDetails;