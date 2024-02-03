import React ,{useState,useEffect} from 'react'
import { Box } from '@mui/material'
import { HomeContentStyle } from './home_style'
import ProductBox from '../Components/ProductBox'
import { useParams } from 'react-router-dom'
import Buffer from '../UIElements/Buffer'
export default function Cart() {
  const [cart,setCart] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend API
    fetch(process.env.REACT_APP_BACKEND_URL +  '/cart')
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cartItems);
        
      })
      .catch((error) => console.error('Error fetching data:', error)
      ).finally(
        ()=>{
          setLoading(false);
        }
      )
  }, []); 
const uid = useParams().userid;
  if(loading){
    return (
      <Buffer/>
    )
  }
  return (
    <Box sx={HomeContentStyle}>
        {cart.map(items=>{
            return (items.userId===uid && <ProductBox key={items.productId}  productName={items.productName} productImage={items.productImage} productPrice={items.productPrice}/>)
        })}
    </Box>
  )
}
