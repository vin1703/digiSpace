import React, { useState ,useEffect} from 'react'
import { Box,Typography } from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CancelIcon from '@mui/icons-material/Cancel';
import { useParams } from 'react-router-dom';
export default function ProductDes() {
    const prodSec = {
        width:"42%",
        backgroundColor:"#29ab87",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around",
        alignItems:'center'
    }
    const upperSec = {
        width:"100%",
        height:"50%",
        backgroundColor:"#29ab87",
        display:"flex",
        borderLeft:"1px solid #29ab87",
        borderTop : "1px solid #30806a"
    }
    const lowerSec = {
      width:"90%",
      height:"50%",
      backgroundColor:"#29ab87",
      display:"flex",
    
    }
    const [order,setOrder]=useState({});
    const pid = useParams().prodId;
    useEffect(() => {
      // Fetch data from backend API
      fetch(process.env.REACT_APP_BACKEND_URL +  '/products')
        .then((response) => response.json())
        .then((data) => {
          const order = data.product.find(prod=>prod._id===pid);
          setOrder(order);
        })
        .catch((error) => console.error('Error fetching data:', error));
    }, [pid]); 

  return (
    <Box sx={prodSec}>
      <Box sx={upperSec}>
        <Box sx={{width:"40%",height:"100%",backgroundColor:"#fff",display:"flex",alignItems:"center"}}>
          <img style={{"width":"100%","height":"95%",objectFit:"contain"}} src={order.productImage} alt="product" />
        </Box>
        <Box sx={{boxSizing:"border-box",paddingTop:"50px",paddingLeft:"20px",width:"60%",height:"100%",backgroundColor:"#fff",display:"flex",justifyContent:"flex-start",flexDirection:"column"}}>
          <Typography variant='h6'>{order.productName}</Typography><br />
          <Typography variant='h6'>Price : ${order.productPrice}</Typography> <br />
          <Typography variant='h6'>Quantity : 1 </Typography>
        </Box>
      </Box>
      <Box sx={lowerSec}>
         <Box sx={{width:"9%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <LocalShippingIcon style={{color:"white"}}/> <br />
            <NotificationsIcon style={{color:"white"}}/> <br />
            <CancelIcon style={{color:"white"}}/>
         </Box>
         <Box sx={{width:"91%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"center"}}>
            <Typography color="white" variant='body1'>Easily Track Orders, Hassle free Returns</Typography> <br />
            <Typography color="white" variant='body1'>Get Relevant alerts and Recommandation</Typography> <br />
            <Typography color="white" variant='body1'>One Tap Cancellation</Typography>
         </Box>
      </Box>
    </Box>
  )
}
