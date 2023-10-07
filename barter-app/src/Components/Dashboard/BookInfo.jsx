import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { getAllUsers, login, getSingleHave, getSingleNeed, resetHaveNeed } from "../../Services/api";
import ServiceDetails from "./ServiceDetails";
import { Details } from "./Details";
import GoodDetails from "./GoodDetails";

const setType = (type) => {
  console.log("setType : ", type)
  localStorage.setItem("type", type);
}
const setGoodId = (goodId) => {
  localStorage.removeItem("goodId")
  localStorage.removeItem("serviceId")
  console.log("setGoodId : ", goodId)
  localStorage.setItem("goodId", goodId);
}
const setServiceId = (serviceId) => {
  localStorage.removeItem("goodID")
  localStorage.removeItem("serviceId")
  console.log("setServiceId : ", serviceId)
  localStorage.setItem("serviceId", serviceId);
}

const setHaveId = (haveId) => {
  localStorage.removeItem("haveId")
  localStorage.removeItem("needId")
  console.log("setHaveId : ", haveId)
  localStorage.setItem("haveId", haveId);
}
const setNeedId = (needId) => {
  localStorage.removeItem("haveId")
  localStorage.removeItem("needId")
  console.log("setNeedId : ", needId)
  localStorage.setItem("needId", needId);
}

export default function BasicCard(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const haveState = useSelector((state) => state.haveReducer);
  const needState = useSelector((state) => state.needReducer);


  const handleDetails = async (event) => {

    const id = event.target.id.substring(4);
    console.log("here and there  " + id);
    const type = event.target.id.substr(0, 4);
    setType(type);
    if (type === "have") {
      setHaveId(id);
    } else if (type === "need") {
      setNeedId(id);
    }

    const goodIdEl = document.getElementById(goodId);
    const servicedEl = document.getElementById(serviceId);

    const goodIdValue = goodIdEl ? goodIdEl.textContent : '';
    const serviceIdValue = servicedEl ? servicedEl.textContent : '';

    setGoodId(goodIdValue);
    setServiceId(serviceIdValue);

    if (goodIdValue) {
      navigate("goodDetails");
    }
    else {
      navigate("serviceDetails");
    }
  }

  const { title, username, img, clkId, goodId, serviceId } = props;

  return (
    <>

      <Card
        sx={{
          width: 256,
          boxShadow:
            "0 0.5em 1em -0.125em hsl(0deg 0% 4% / 10%), 0 0 0 1px hsl(0deg 0% 4% / 2%)",
          border: "1px solid #e9eaee",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <CardMedia>
            <img
              src={props.img}
              image={img}
              alt={title}
              width={294}
              height={140}
            />
          </CardMedia>
          <CardContent>
            {(
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {title}
              </Typography>
            )}
            <Link href={`/dashboard`}>
              <Typography variant="h5" component="div" sx={{ cursor: "pointer" }}>
                {username}
              </Typography>
            </Link>

            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            </Typography>

          </CardContent>
        </Box>
        <button onClick={handleDetails} className='border px-6 py-2 my-4' id={clkId}>
          show more details
        </button>
        <p id={goodId} style={{ display: 'none' }}>{goodId}</p><br />
        <p id={serviceId} style={{ display: 'none' }}>{serviceId}</p>
      </Card>
    </>
  );
}
