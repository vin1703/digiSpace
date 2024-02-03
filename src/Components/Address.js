import React, { useState,useReducer} from "react";
import { Box,Button,Typography } from "@mui/material";
import { useAppContext } from "../Context/Context";
import { useParams } from "react-router-dom";

const initialState = {
  name : '',
  mobile : '',
  street : '',
  city : '',
  dist : '',
  country : ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_NAME':
      return {...state,name: action.payload};
    case 'SET_MOBILE':
      return {...state, mobile: action.payload };
    case 'SET_STREET':
      return {...state, street: action.payload };
    case 'SET_CITY':
      return {...state, city: action.payload };
    case 'SET_COUNTRY':
      return {...state, country: action.payload };
    case 'SET_DIST':
      return {...state, dist : action.payload};
    case 'INITIAL_STATE':
      return initialState;
    default:
      return state;
  }
};

export default function Address() {
  const {user} = useAppContext();
  const [inputFocused, setInputFocused] = useState(false);
  const pid = useParams().prodId;

  const handleFocus = () => {
    setInputFocused(true);
  };

  const handleBlur = () => {
    setInputFocused(false);
  };

  const inputStyle = {
    width: "350px",
    height: "25px",
    border: "none",
    outline: inputFocused ? "none" : "initial", // Set outline to 'none' when focused
  };

  const [state, dispatch] = useReducer(reducer,initialState);

  const handleOrder = async(e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_BACKEND_URL +  '/orders';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: pid,
          name: state.name,
          number: state.mobile,
          street: state.street,
          city: state.city,
          district : state.dist,
          country :state.country,
          userId : user._id
        }),
      });
  
      if (!response.ok) {
        alert('Order Failed');
        return;
      }
  
      // Optionally, you can handle success or redirect the user.
      alert('your product has been ordered');
    } catch (error) {
      console.error('order failed:', error.message);
      alert('failed');
    }


    

  };

  return (
    <Box sx={{display:'flex',flexDirection:"column",width:"57%",height:"100%",backgroundColor:"#29ab87"}}>
    <Box
      sx={{
        width: "100%",
        height:"85%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <form
        style={{
          boxSizing:"border-box",
          paddingLeft:"25px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          lineHeight: "25px",
          justifyContent:"flex-start"
        }}
      >
        <Box sx={{ height:"30px",width:"365px",display:"flex",justifyContent:"flex-start",marginBottom:"20px"}}>
        <Typography variant="h6" color='white'>Your Address Details :</Typography>
        </Box>
        
        <Box>
          <label style={{ color: "#fff" }} htmlFor="name">
            Full Name
          </label>{" "}
          <br />
          <input
            value = {state.name}
            onChange={(e)=>dispatch({ type: 'SET_NAME', payload: e.target.value })}
            style={inputStyle}
            type="text"
            id="name"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <label style={{ color: "#fff" }} htmlFor="number">
            Mobile Number
          </label>{" "}
          <br />
          <input
            value = {state.mobile}
            onChange={(e)=>dispatch({ type: 'SET_MOBILE', payload: e.target.value })}
            style={inputStyle}
            type="tel"
            id="number"
            pattern="[0-9]{10}"
            required
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>

        <Box>
          <label style={{ color: "#fff" }} htmlFor="street">
            Street, Flat No.
          </label>{" "}
          <br />
          <input
            value = {state.street}
            onChange={(e)=>dispatch({ type: 'SET_STREET', payload: e.target.value })}
            style={inputStyle}
            type="text"
            id="street"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <label style={{ color: "#fff" }} htmlFor="city">
            City
          </label>{" "}
          <br />
          <input
            value = {state.city}
            onChange={(e)=>dispatch({ type: 'SET_CITY', payload: e.target.value })}
            style={inputStyle}
            type="text"
            id="city"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <label style={{ color: "#fff" }} htmlFor="city">
            District
          </label>{" "}
          <br />
          <input
            value = {state.dist}
            onChange={(e)=>dispatch({ type: 'SET_DIST', payload: e.target.value })}
            style={inputStyle}
            type="text"
            id="city"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <label style={{ color: "#fff" }} htmlFor="country">
            Country
          </label>{" "}
          <br />
          <input
            value = {state.country}
            onChange={(e)=>dispatch({ type: 'SET_COUNTRY', payload: e.target.value })}
            style={inputStyle}
            type="text"
            id="country"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </Box>
      </form>
    </Box>
    <Box sx={{width:"100%",height:"15%",backgroundColor:"#29ab87",display:'flex',justifyContent:'flex-end',alignItems:"center"}}>
      <Box sx={{boxSizing:"border-box", width:"37%",height:"100%",backgroundColor:"#fff",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
      <Button onClick={handleOrder} sx={{height:"80%",width:"200px",backgroundColor:"#29ab87"}} variant='contained' color='primary'><Typography variant="h6">Order Now</Typography></Button>
      </Box>
    
  </Box>
  </Box>
  );
}
