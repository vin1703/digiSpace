import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import {
  button_box,
  login_form_button,
  login_form_child,
} from "./loginFormStyle";

const initialState = {
  name: "",
  email: "",
  pass: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASS":
      return { ...state, pass: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

export default function LoginForm(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (state.name.trim() === "") {
      alert("Name should not be empty");
      return;
    }
  
    if (!state.email.includes("@")) {
      alert("Email should be a valid email address");
      return;
    }
  
    if (state.pass.trim() === "") {
      alert("Password should not be empty");
      return;
    }
  
 
  
    // Assuming your backend API endpoint is 'http://localhost:5000/api/products'
    const apiUrl = process.env.REACT_APP_BACKEND_URL +  '/user/signup';
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          password: state.pass,
        }),
      });
  
      if (!response.ok) {
        alert('Failed to create a new user');
        return;
      }
  
      dispatch({ type: "RESET" });
  
      // Optionally, you can handle success or redirect the user.
      alert('User successfully created!');
    } catch (error) {
      console.error('Error creating user:', error.message);
      alert('Failed to create a new user. Please try again later.');
    }
  };
  

  return (
    <>
      <Box sx={props.login_form}>
        <form>
          <Box>
            <input
              value={state.name}
              onChange={(e) =>
                dispatch({ type: "SET_NAME", payload: e.target.value })
              }
              style={login_form_child}
              type="text"
              placeholder="User Name"
            />
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <input
              value={state.email}
              onChange={(e) =>
                dispatch({ type: "SET_EMAIL", payload: e.target.value })
              }
              style={login_form_child}
              type="email"
              placeholder="E-mail Id"
            />
          </Box>
          <Box sx={{ marginTop: "20px" }}>
            <input
              value={state.pass}
              onChange={(e) =>
                dispatch({ type: "SET_PASS", payload: e.target.value })
              }
              style={login_form_child}
              type="password"
              placeholder="Password"
            />
          </Box>

          <Box sx={button_box}>
            <Button
              onClick={handleSignup}
              sx={login_form_button}
              variant="contained"
            >
              Sign Up
            </Button>
          </Box>
          <Box sx={{ marginTop: "20px", display: "flex" }}>
            <Typography>Already have an account ? </Typography>
            <Typography sx={{ marginLeft: "5px" }}>
              <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </>
  );
}
