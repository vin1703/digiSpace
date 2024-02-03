import React from 'react'
import { Box } from '@mui/material'
import SignupForm from '../Components/SignupForm'
import LoginImage from '../Components/LoginImage'
import { login_image, main_login,login_form } from './login_style'


export default function Login() {
  return (
    <>
    <Box sx={main_login}>
        <LoginImage login_image ={login_image}/>
        <SignupForm login_form={login_form}/>
    </Box>
    </>
  )
}
