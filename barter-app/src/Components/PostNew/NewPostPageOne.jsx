import React, { useState } from 'react';
import HaveGoodRegistrationForm from "./NewHaveGoodRegistrationForm";
import NewHaveServiceRegistrationForm from "./NewHaveServiceRegistrationForm";
import './NewPostPageOne.css';
import {getSingleHave} from "../../Services/api";
import {useNavigate} from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import img1 from '../../images/Haves.png';
import img2 from '../../images/Needs.png';
import { Box, Button, Grid, Typography } from "@mui/material";
import { styled } from '@mui/material';
// import { makeStyles } from '@mui/styles';


const AnimatedText = styled(Typography)`
  animation: fadeIn 2s ease-in-out;
  font-size: 3rem;
  text-align: center;
  font-weight: 500;
  color: black;
  
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;


function NewPostPageOne() {
    const navigate = useNavigate();
    const [haveType, setHaveType] = useState('goods');
    const [needType, setNeedType] = useState('goods');
    const [haveItems, setHaveItems] = useState([]);
    const [needItems, setNeedItems] = useState([]);



    const handleClick = () => {
        HaveGoodRegistrationForm();
    };

    const handleClick2 = () => {
        NewHaveServiceRegistrationForm();
    };

    const handleHaveTypeChange = (type) => {
        setHaveType(type);
    };

    const handleNeedTypeChange = (type) => {
        setNeedType(type);
    };

    const handleHaveAdd = (item) => {
        setHaveItems([...haveItems, item]);
    };

    const handleNeedAdd = (item) => {
        setNeedItems([...needItems, item]);
    };

    const handleNewNeedGoodForm = async () => {
        navigate("NewNeedGoodForm")
    };

    const handleNewNeedServiceForm = async () => {
        navigate("NewNeedServiceForm");
    };

    const handleNewHaveGoodForm = async () => {
        navigate("NewHaveGoodForm");
    };

    const handleNewHaveServiceForm = async () => {
        navigate("NewHaveServiceForm");
    };

    return (
        <>
        <Navbar className="NavbarD" fixed="top" />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        {/*  */}
      </Box>
      <Box sx={{ 
  display: "flex", 
  justifyContent: "center", 
  mb: 2 
}}>
  <AnimatedText variant="h1">
    ADD <span style={{ color: "#50AEB3" }}>HAVES</span> AND <span style={{ color: "#D66A58" }}>NEEDS</span>
  </AnimatedText>
</Box>
      <Grid container spacing={2} style={{justifyContent: 'center'}}>
        <Grid item xs={12} md={6}>
          <Box sx={{  p: 2 }}>
          <div style={{justifyContent: 'center', textAlign: 'center'}}>
          <img src={img1} alt="image1" height={300} width={500} style={{borderRadius: '10px'}} />
            </div>
         
            <Typography variant="h4" color=" #50AEB3" style={{justifyContent: 'center', textAlign: 'center', padding: '20px'}}>
               
              Add Haves
            </Typography>
            <Typography variant="body1" color="black" mt={1} style={{justifyContent: 'center', textAlign: 'center'}}>
              Add Goods or Service that you Have.
              
            </Typography>
            <Typography variant="body1" color="black" mt={1} style={{justifyContent: 'center', textAlign: 'center'}}>
            Once you add a Have, we'll show you all of the things you can get in return.
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNewHaveGoodForm}
                sx={{ mr: 2 }}
                style={{backgroundColor: '#50AEB3', color: '#FFFFFF'}}>
                Goods
              </Button>
              <Button variant="contained" color="primary" style={{backgroundColor: '#585E66', color: '#50AEB3'}} onClick={handleNewHaveServiceForm} >
                Services
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ bgcolor: "background.paper", p: 2 }}>
            <div style={{justifyContent: 'center', textAlign: 'center'}}>
          <img src={img2} alt="image2" height={300} width={500} style={{borderRadius: '10px'}}  />
          </div>
          <Typography variant="h4" color=" #D66A58" style={{justifyContent: 'center', textAlign: 'center', padding: '20px'}}>
               
               Add Needs
             </Typography>
             <Typography variant="body1" color="black" mt={1} style={{justifyContent: 'center', textAlign: 'center'}}>
               Add Goods or Service that you Need.
               
             </Typography>
             <Typography variant="body1" color="black" mt={1} style={{justifyContent: 'center', textAlign: 'center'}}>
             Once you add a Need, we'll show you all of the things you can exchange it for.
             </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleNewNeedGoodForm}
                sx={{ mr: 2 }}
                style={{backgroundColor: '#D66A58', color: '#FFFFFF'}}
              >
                Goods
              </Button>
              <Button variant="contained" color="secondary" onClick={handleNewNeedServiceForm} style={{backgroundColor: '#585E66', color: '#D66A58'}}>
                Services
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
    );
}

export default NewPostPageOne;
