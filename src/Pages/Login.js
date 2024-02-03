import React from 'react'
import { Box,Typography } from '@mui/material'
import LoginForm from '../Components/LoginForm'
import LoginImage from '../Components/LoginImage'
import { login_image, main_login,login_form } from './login_style'

export default function Login() {
  return (
    <>
    <Box sx={main_login}>
        <LoginImage login_image ={login_image}/>
        <LoginForm login_form={login_form}/>
    </Box>
    </>
  )
}
