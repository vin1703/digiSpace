import React,{useEffect,useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppContext } from '../Context/Context';

export default function InfoImgComp(props) {
  const [cart,setCart] = useState([]);
  const {handleCount,user,isLoggedIn} = useAppContext();


  useEffect(() => {
    // Fetch data from backend API
    fetch(process.env.REACT_APP_BACKEND_URL +  '/cart')
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cartItems);
      })
      .catch((error) => console.error('Error fetching data:', error));

      handleCount(()=>{
        const userItems = cart.filter(items=>items.userId===user._id);
        return userItems.length;
      });
  }, [cart,handleCount,user._id]); 


  const handleCart = async(e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_BACKEND_URL +  '/cart';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: props.productId,
          productImage: props.imageURL,
          productName: props.productName,
          productPrice: props.productPrice,
          userId: user._id,
        }),
      });
  
      if (!response.ok) {
        alert('Failed to add');
        return;
      }
  
      // Optionally, you can handle success or redirect the user.
      alert('Added to Cart');
    } catch (error) {
      console.error('Error adding to cart:', error.message);
      alert('failed');
    }


    

  };
  

  return (
    <Box sx={props.imageBox}>
      <img
        src={props.imageURL}
        alt="img"
        style={{ width: '100%', height: '93%', objectFit: 'contain', border: '1px solid #29ab87' }}
      />
      <Box sx={props.buttonBox}>
        <Button
          onClick={handleCart}
          sx={{
            padding: '20px',
            width: '200px',
            backgroundColor: '#30806a',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#30806a',
            },
          }}
        >
          <Typography variant="body1">ADD TO CART</Typography>
        </Button>
        <Link to={`/product/order/${props.productId}`}><Button
          sx={{
            padding: '20px',
            width: '200px',
            backgroundColor: '#29ab87',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#29ab87',
            },
          }}
        >
          <Typography variant="body1">BUY NOW</Typography>
        </Button></Link>
      </Box>
    </Box>
  );
}
