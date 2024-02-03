import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import { Box,Typography } from '@mui/material'
import { infoStyle,imageBox, buttonBox, desBox } from './productInfoStyle'
import InfoImgComp from '../Components/InfoImgComp'
import Buffer from '../UIElements/Buffer'
export default function ProductInfo() {
    const productId = useParams().id;
    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from backend API
    fetch(process.env.REACT_APP_BACKEND_URL +  '/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.product);
        
      })
      .catch((error) => console.error('Error fetching data:', error)
      ).finally(()=>{
        setLoading(false);
      })
  }, []); 

    const product =products.find(prod=>prod._id===productId);
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    
      
  return (
    loading ? <Buffer/> : <Box sx={infoStyle}>
      <InfoImgComp productId={product._id} imageBox={imageBox} productName={product.productName} buttonBox={buttonBox} imageURL={product.productImage} productPrice={product.productPrice} />
      <Box sx={desBox}>
        <Box sx={{boxSizing:"border-box",paddingLeft:"30px"}}>
          <Typography color='white' variant='h3'>{product.productName}</Typography>
        </Box>
        <Box sx={{boxSizing:"border-box",paddingLeft:"30px"}}>
          <Typography color='white' variant='h3'>${product.productPrice}</Typography>
        </Box>
        <Box sx={{boxSizing:"border-box"}}>
          {product.productHigh.map((text)=>{
            return (
              <Typography color='white'>
            <ul>
              <li>{text}</li>
            </ul>
          </Typography>
            )
          })}
        </Box>
        <Box sx={{boxSizing:"border-box",paddingLeft:"30px"}}>
          <Typography color = 'white' variant='h6' sx={{paddingBottom:'10px'}}>Description </Typography> 
          <Typography color='white' variant='body1'>{product.description}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
