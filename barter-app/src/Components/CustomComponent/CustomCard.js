
import * as React from "react";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './CustomCardCss.css'
import { Container, Typography, Box, Paper, Stack, Breadcrumbs, Tooltip } from "@mui/material"
import { useState } from "react";

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




export default function CustomCard(props) {
  const navigate = useNavigate();
  const [showUsername, setShowUsername] = useState(false);



  const handleDetails = async (event) => {

    const id = props.clkId.substring(4);
    console.log("here and there  " + id);
    const type = props.clkId.substr(0, 4);
    setType(type);

    const goodIdValue = props.goodId ? props.goodId : '';
    const serviceIdValue = props.serviceId ? props.serviceId : '';
    //#fdc8ad good
    //#a5ffac service
    if (type == "have")
      localStorage.setItem("haveId", id);
    else
      localStorage.setItem("needId", id);
    setGoodId(goodIdValue);
    setServiceId(serviceIdValue);

    if (goodIdValue) {
      navigate("goodDetails");
    }
    else {
      navigate("serviceDetails");
    }
  }
  const handleDelete = (event) => {
    if (props.isType == 'Have') {
      props.deleteItem('Have', props.id);
    }
    if (props.isType == 'Need') {
      props.deleteItem('Need', props.id);
    }

  }
  return (
    <>
      <Card style={{ boxShadow: '0 0 0 0', position: 'relative', padding: '20px', height: '480px', width: '400px', border: '1px solid grey', marginTop: '10px' }}>
        <CardHeader
          className="cardHeader"
          titleTypographyProps={{ variant: 'h6' }}
          title={props.title || 'Sumanth Awesome'}
          subheader={props.createDate || 'September 14, 2016'}
          avatar={
            props.isDashboard ? (
              <Tooltip title={props.username} open={showUsername} arrow>
                <Avatar
                  style={{ width: '40px', height: '40px' }}
                  sx={{ background: props.goodId ? '#F79256' : '#9ac9f8' }}
                  aria-label="recipe"
                  onMouseEnter={() => setShowUsername(true)}
                  onMouseLeave={() => setShowUsername(false)}
                >
                  {props.username && props.username[0]}
                </Avatar>
              </Tooltip>
            ) : null
          }
        />
        {/* <CardHeader
                className="cardHeader"
                // action={
                // <IconButton aria-label="settings">
                //     <MoreVertIcon />
                // </IconButton>
                // }
                titleTypographyProps={{variant:'h6' }}

                title={props.title||"Sumanth Awesome"}
                subheader={props.createDate || "September 14, 2016"}
                
            >
              </CardHeader>
            {props.isDashboard ?
            <CardActions justifyContent="right" style={{float: 'right'}} >
                <Avatar style={{"width":"40px","height":"40px"}} sx={{ background:props.goodId ? '#F79256':'#9ac9f8' }} aria-label="recipe">
                    {props.username && props.username[0]||'S'}
                </Avatar>
                {/* <Typography marginLeft="10px">
                {props.username || 'ritvik'}
                </Typography> */}
        {/* </CardActions> : null} */}

        <CardMedia

          component="img"
          height="250px"
          width="100px"
          image={props.image || "https://res.cloudinary.com/dqdojffsu/image/upload/v1680973616/d7ucld7zz6vujowew2au.png"}
          alt="Paella dish"
          style={{ borderRadius: "30px", paddingLeft: '8px', paddingRight: '8px' }}

        />
        <CardContent>
          {/* <Typography variant="body2" color="text.secondary">
                { props.description ||  "This impressive paella is a perfect party dish and a fun meal to cook"}                
                </Typography> */}
          <Typography variant="body2" color="text.secondary">
            <strong>Type:</strong>  {props.goodId ? 'Goods' : 'Service'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Estimated Value:</strong>  {props.estimatedValue || "$10"}
          </Typography>
          <div style={{ display: "flex", marginTop: "16px", justifyContent: "space-evenly" }}>
            {props.isDashboard ? <Button style={{ background: '#50AEB3' }} onClick={handleDetails} variant="contained">View Details</Button> : null}
            {!props.isDashboard && !props.isMyTrade ? (
              <>
                <Button onClick={handleDetails} variant="contained">Trade</Button>
                <Button onClick={handleDelete} variant="contained" style={{ background: 'red', marginLeft: '2px' }}>Delete</Button>
              </>
            ) : null}
          </div>
        </CardContent>
        {/* {props.isDashboard ?
            <CardActions justifyContent="right" style={{background:props.goodId ? '#F79256':'#9ac9f8'}}>
                <Avatar style={{"width":"40px","height":"40px"}} sx={{ bgcolor: '#50AEB3' }} aria-label="recipe">
                    {props.username && props.username[0]||'S'}
                </Avatar>
                <Typography marginLeft="10px">
                {props.username || 'ritvik'}
                </Typography>
            </CardActions> : null} */}
      </Card>
    </>
  );


}