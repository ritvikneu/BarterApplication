import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNeeds, GetAllHaves } from "../../Services/api";
import { Link } from "react-router-dom";
// import "./HaveComponent.scss"
import BasicCard from "./BookInfo";
import Grid from "@mui/material/Grid";
import { Container, Typography, Box, Paper, Stack, Breadcrumbs } from "@mui/material"
import { BookInfoSection } from "./Details";
import { useNavigate } from 'react-router-dom';
import { getAllUsers, login, getSingleHave, getSingleNeed } from "../../Services/api";
import Carousel from 'react-bootstrap/Carousel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CustomCard from '../CustomComponent/CustomCard'
import VideoIntro from "../CustomComponent/video/videoIntro";
import NavbarMUI from "../MUI/NavBar";
import Button from 'react-bootstrap/Button';
import '../Dashboard/HaveComponent.css';


const HaveComponent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const haveState = useSelector((state) => state.haveReducer);
  const needState = useSelector((state) => state.needReducer);
  const [haveExpanded, setHaveExpanded] = useState(true);
  const userId = localStorage.getItem("userId");
  const [hnroute,setHNRoute] = useState('HaveType');

  const handleHaveExpanded = () => {
    setHaveExpanded(!haveExpanded);
  }
   
  useEffect(() => {
    dispatch(GetAllHaves());
    dispatch(GetAllNeeds());
  }, [dispatch]);
  const [carIndex, setCarIndex] = useState(0);

  const handleCarSelect = (selectedIndex) => {
    setCarIndex(selectedIndex);
  };
  const handleHNRoute = (type)=>{
    setHNRoute(type);
  }
  return (
    <>
      <VideoIntro />


      <Container maxWidth="false" style={{ "margin-top": "15px", padding: '20px', paddingBottom: '30px' }}>
      <div style={{marginBottom:'10px',textAlign:'center'}}>
          <Button variant="success" style={{background:'#50aeb3',width:'150px',fontSize:'20px', marginBottom: '20px' }} onClick={()=>handleHNRoute('HaveType')}>Haves</Button>{' '}
          <Button variant="warning" style={{color:'white',background:'#d66a58',width:'150px',fontSize:'20px', marginBottom: '20px'}} onClick={()=>handleHNRoute('NeedType')}>Needs</Button>{' '}
      </div>



        <Grid container xs={12}>

          {hnroute=='HaveType'?
          (
            <Grid item xs={12}>
                <Grid container spacing={2} >
                  {haveState.havesList.have &&
                    haveState.havesList.have
                      .filter((r) => r.userId !== userId && r.advertFlag !== true)
                      .map((r, index) => (
                        <Grid item xs={4} md={4} key={`have${r._id}`} >
                          <CustomCard
                            title={r.title}
                            clkId={`have${r._id}`}
                            goodId={r.goodId}
                            serviceId={r.serviceId}
                            createDate="September 14, 2016"
                            image={r.image}
                            estimatedValue={r.estimateValue}
                            description= {r.description}
                            username={r.username}
                            isDashboard='true'
                           
                          />
                        </Grid>
                      ))}
                </Grid>

              </Grid>
          )
          :
          (
            <Grid item xs={12}>
            <Grid container spacing={2}>
              {needState.needList.need && needState.needList.need
                .filter((s) => s.userId !== userId  && s.advertFlag !== true)
                .map((s, index) => (
                  <Grid item xs={4} md={4} key={`need${s._id}`} padding={2} style={{ "box-shadow": "3px 3px 5px 5px g" }}>
                    <CustomCard
                      title={s.title}
                      clkId={`need${s._id}`}
                      goodId={s.goodId}
                      serviceId={s.serviceId}
                      createDate="September 14, 2016"
                      image={s.image}
                      estimatedValue={s.estimateValue}
                      description={s.description}
                      username={s.username}
                      isDashboard='true'
                    />
                  </Grid>
                ))}
            </Grid>

          </Grid>
          )
          }    
        </Grid>

      </Container>
    </>

  );

};

export default HaveComponent;