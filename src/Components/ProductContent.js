import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAppContext } from '../Context/Context';
import ProductBox from './ProductBox';
import Buffer from '../UIElements/Buffer';
import { HomeContentStyle } from '../Pages/home_style';

export default function ProductContent() {
  const { searchText } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading,setLoading]= useState(true);

  useEffect(() => {
    // Fetch data from backend API
    fetch(process.env.REACT_APP_BACKEND_URL +  '/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.product);
      })
      .catch((error) => 
      console.error('Error fetching data:', error
      )).finally(() => {
        setLoading(false);
      })
  }, []);

  const filterProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchText.toLowerCase())
  );
  if(!products){
    return (
      <box>product not found</box>
    )
  }

  if(loading){
    return (
      <div className='center'>
      <Buffer/>
      </div>
    )
  }

  return (
    <Box sx={HomeContentStyle}>
      {filterProducts.map((product) => (
        <Link
          key={product?._id}
          to={`/product/${product?._id}`}
          style={{ textDecoration: 'none' }}
        >
          <ProductBox
            productName={product?.productName}
            productImage={product?.productImage}
            productPrice={product?.productPrice}
          />
        </Link>
      ))}
    </Box>
  );
}
