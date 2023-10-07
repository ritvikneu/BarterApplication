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


const HaveComponent = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const haveState = useSelector((state) => state.haveReducer);
    const needState = useSelector((state) => state.needReducer);

    useEffect(() => {
        dispatch(GetAllHaves());
        dispatch(GetAllNeeds());
    }, [dispatch]);

    const haves = haveState.havesList.have;
    // if (haves) {
    //     console.log(haves);
    //     if (haveState.havesList.have) {
    //         haveState.havesList.have.map((haves) => console.log(haves.userId));
    //     }
    // }
    const needs = needState.needList.need;
    // if (needs) {
    //     console.log(needs);
    //     if (needState.needList.need) {
    //         needState.needList.need.map((needs) => console.log(needs.userId));
    //     }
    // }

   


    return (
        
        <Container maxWidth="lg">
  <Grid container spacing={3} marginTop={2}>
    <Grid item xs={6}>
      <h2 className="section-title">Haves:</h2>
      <Grid container spacing={2}>
        {haveState.havesList.have && haveState.havesList.have.map((r, index) => (
          <Grid item xs={12} md={6} key={`have${r._id}`} >
            <BasicCard title={r.title} username={r.userID} clkId={`have${r._id}`} goodId={r.goodId} serviceId={r.serviceId}
              img="https://res.cloudinary.com/dqdojffsu/image/upload/v1680973001/lo4kmsp1wcshkvhdekoq.png" />
          </Grid>
        ))}
      </Grid>
    </Grid>
    <Grid item xs={6}>
      <h2 className="section-title">Needs:</h2>
      <Grid container spacing={2}>
        {needState.needList.need && needState.needList.need.map((s, index) => (
          <Grid item xs={12} md={6} key={`need${s._id}`} >
            <BasicCard title="NeedTitle" username={s.userID} clkId={`need${s._id}`} goodId={s.goodId} serviceId={s.serviceId}
              img="https://res.cloudinary.com/dqdojffsu/image/upload/v1680973616/d7ucld7zz6vujowew2au.png" />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Grid>
</Container>

      

     
    );

};

export default HaveComponent;