import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { button_box, login_form_button, login_form_child } from './loginFormStyle';
import { useAppContext } from '../Context/Context';

const initialState = {
  email: '',
  pass: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_PASS':
      return { ...state, pass: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default function LoginForm(props) {
  const [error,setError]=useState('');
  const {login,handleUser,handleToken} = useAppContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleLogin = async(e) => {
    e.preventDefault();
    const apiUrl = process.env.REACT_APP_BACKEND_URL +  '/user/login';
    try{
    const response = await fetch(apiUrl,{
      method : 'POST',
      headers : {
        'Content-type' : 'application/json',
      },
      body:JSON.stringify({
        email : state.email,
        password : state.pass
      })
    })
    const userData = await response.json();
    const user = userData.User;
    const token = userData.token;
    if(user){
      login();
      localStorage.setItem('userData',JSON.stringify({user:user,token:token}));
      handleUser(user);
      handleToken(token);
    }
    else{
      setError("invalid Data!")
    }
    
    dispatch({ type: 'RESET' });
  } catch(error){
    alert('logging In failed,Please try again');
    console.error(error);
  }
  };

  return (
    <>
      <Box sx={props.login_form}>
        <form>
          <Box>
            <input
              value={state.email}
              onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
              style={login_form_child}
              type="email"
              placeholder="E-mail Id"
            />
          </Box>
          <Box sx={{ marginTop: '20px' }}>
            <input
              value={state.pass}
              onChange={(e) => dispatch({ type: 'SET_PASS', payload: e.target.value })}
              style={login_form_child}
              type="password"
              placeholder="Password"
            />
          </Box>
          <Box sx={button_box}>
            <Button sx={login_form_button} onClick={handleLogin} variant="contained">
              Login
            </Button>
            <Typography sx={{marginTop:"10px",color:"red"}} variant='body2'>{error}</Typography>
          </Box>
          <Box sx={{ marginTop: '20px', display: 'flex' }}>
            <Typography>Didn't have any account ? </Typography>
            <Typography sx={{ marginLeft: '5px' }}>
              <Link to="/signup">Sign Up</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}
