import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../Context/Context'
import { Box } from '@mui/material'
import ProductBox from '../Components/ProductBox'
import {HomeContentStyle } from './home_style'

export default function ProductCatagory(props) {
  const { searchText } = useAppContext();
  const [products,setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from backend API
    fetch(process.env.REACT_APP_BACKEND_URL +  '/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.product);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); 

  const filterProducts =products.filter((product) =>
    product.productName.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <>
    <Box sx={HomeContentStyle}>
         {filterProducts.map(product=>{
            return (product.productType===props.category &&<Link style={{"text-decoration":"none"}} key={product._id} to={`/product/${product._id}`}> <ProductBox productName={product.productName} productImage={product.productImage} productPrice={product.productPrice} /></Link>)
         })}
    </Box>
    </>
  )
}
