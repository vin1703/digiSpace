import { Card,CardMedia,CardContent,Typography } from "@mui/material";
import React from 'react'

export default function ProductBox(props) {
  
  return (
    <>
      <Card sx={{ width: "250px",height:"300px",marginTop:"3vh",marginLeft:"2vw",cursor:"pointer",borderRadius:"0",boxShadow:"none",border:"1px solid  #29ab87"}}>
      <CardMedia
        component="img"
        height="200"
        image={props.productImage} // Sample image URL
        alt="Sample Image"
        sx={{objectFit:"contain"}}
      />
      <CardContent sx={{borderBottom:"1px solid black"}}>
        <Typography gutterBottom variant="h6" component="div">
          {props.productName.slice(0,19)}
        </Typography>
        <Typography variant="h5" color="text.secondary">
          ${props.productPrice}
        </Typography>
      </CardContent>
    </Card>
    </>
  )
}
