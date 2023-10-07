import { Container, Typography, Box, Paper, Stack, Breadcrumbs } from "@mui/material"

import HomeIcon from "@mui/icons-material/Home";
import BookIcon from "@mui/icons-material/Book";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";


export const Details = (props) => {
  const { type,
    good,
    service} = props;

  const data = {}
  return (
    <>
    <Navbar fixed="top" sx={{ width: "100vw" }} />
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "1rem 0"}}>
        <Link href="/">
          <Typography sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {type}
          </Typography>
        </Link>
        <Typography sx={{ display: "flex", alignItems: "center" }} color="text.primary">
          <BookIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          {good.title}
        </Typography>
      </Breadcrumbs>
      <Box sx={{ display: "flex", gap: "220px", alignItems: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)", padding: "2rem", border: "1px solid #ccc", width: "50%", height: "450px" }}>
        <Paper elevation={0} sx={{ width: "200px", height: "300px", border: "1px solid #ccc" }}>
          <img
            src={good.photo ? good.photo : `https://picsum.photos/seed/${data.id}/200/300`}
            alt={`book image`}
            width={400}
            height={300}
            sx={{ border: "1px solid #ccc", borderRadius: "12px" }}
          />
        </Paper>
        <Stack spacing={3} className="Stack">
          <Typography variant="h5">
            {type} Details
          </Typography>
          <Typography>
            {`Title: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.title}
            </Typography>
          </Typography>
          <Typography>
            {`Category: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.category}
            </Typography>
          </Typography>
          <Typography>
            {`Description: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.description}
            </Typography>
          </Typography>
          <Typography>
            {`Value: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.goodValue}
            </Typography>
          </Typography>
          <Typography>
            {`Brand: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.brand}
            </Typography>
          </Typography>
          <Typography>
            {`Condition: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.condition}
            </Typography>
          </Typography>
          <Typography>
            {`Quantity: `}
            <Typography sx={{ fontSize: 14 }} color="text.secondary" component="span">
              {good.quantity}
            </Typography>
          </Typography>
        </Stack>
      </Box>
    </div>
    </>
  );


};